import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createSpinningSound, createWinnerSound } from '@/lib/audio'
import { useAppContext } from '@/contexts/app-context'

type SpinWheelContextType = {
  isSpinning: boolean
  showWinnerModal: boolean
  winners: Array<WinnerRecord>
  currentNumber: number
  currentWinners: Array<number>
  resetSpinWheel: () => void
  closeWinnerModal: () => void
  spinNumbers: (
    startNumber: number,
    numOfParticipants: number,
    maxWinners: number,
    winnerPerSpin: number,
  ) => void
}

type WinnerRecord = {
  number: number
  timestamp: Date
}

export const SpinWheelContext = createContext<SpinWheelContextType>({
  isSpinning: false,
  showWinnerModal: false,
  winners: [],
  currentNumber: 0,
  currentWinners: [],
  resetSpinWheel: () => {},
  closeWinnerModal: () => {},
  spinNumbers: () => {},
})

export const useSpinWheelContext = () => {
  const context = useContext(SpinWheelContext)
  return context
}

export const SpinWheelContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [winners, setWinners] = useState<Array<WinnerRecord>>([])
  const [currentNumber, setCurrentNumber] = useState(0)
  const [currentWinners, setCurrentWinners] = useState<Array<number>>([])
  const spinningAudioRef = useRef<(() => () => void) | null>(null)
  const winnerAudioRef = useRef<(() => AudioContext) | null>(null)
  const { settings } = useAppContext()

  const resetSpinWheel = () => {
    if (isSpinning) return

    setCurrentWinners([])
    setCurrentNumber(0)
    setShowWinnerModal(false)
    clearWinners()
  }

  const closeWinnerModal = () => {
    console.log('closeWinnerModal')
    setShowWinnerModal(false)
  }

  const saveWinners = (newWinners: Array<WinnerRecord>) => {
    const existingWinners = localStorage.getItem('winners')
    if (existingWinners) {
      const parsedWinners = JSON.parse(existingWinners) as Array<WinnerRecord>
      localStorage.setItem(
        'winners',
        JSON.stringify([...parsedWinners, ...newWinners]),
      )
    } else {
      localStorage.setItem('winners', JSON.stringify(newWinners))
    }

    setWinners([...winners, ...newWinners])
  }

  const clearWinners = () => {
    localStorage.removeItem('winners')
    // remove the winners from the state
    setWinners([])
  }

  const spinNumbers = (
    startNumber: number,
    numOfParticipants: number,
    maxWinners: number,
    winnerPerSpin: number,
  ) => {
    if (isSpinning) return

    setIsSpinning(true)
    setCurrentWinners([])
    setCurrentNumber(1)
    setShowWinnerModal(false)

    // Start spinning sound
    if (spinningAudioRef.current && settings.isSoundEnabled) {
      const stopSpinningSound = spinningAudioRef.current()

      // Stop the spinning sound after 4 seconds
      setTimeout(() => {
        stopSpinningSound()
      }, 3000)
    }

    // Animate numbers rapidly changing
    let counter = 0
    const interval = setInterval(() => {
      counter++
      const randomNum =
        Math.floor(Math.random() * (numOfParticipants - startNumber)) +
        startNumber
      setCurrentNumber(randomNum)
    }, 50) // Faster animation - every 50ms

    // Generate final winners after 3 seconds
    setTimeout(() => {
      clearInterval(interval)

      // Generate unique winners based on the numOfWinners and winnerPerSpin
      const newWinners: Array<number> = []
      let availableNumbers = Array.from(
        { length: numOfParticipants },
        (_, i) => startNumber + i,
      )

      // remove the winners from the available numbers
      availableNumbers = availableNumbers.filter(
        (number) => !winners.some((winner) => winner.number === number),
      )

      // Shuffle the available numbers
      for (let i = availableNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[availableNumbers[i], availableNumbers[j]] = [
          availableNumbers[j],
          availableNumbers[i],
        ]
      }

      // Take the first numOfWinners (or all if less than numOfWinners participants)
      const winnerCount = Math.min(
        availableNumbers.length,
        maxWinners,
        winnerPerSpin,
      )
      for (let i = 0; i < winnerCount; i++) {
        newWinners.push(availableNumbers[i])
      }

      // Sort winners for better display
      newWinners.sort((a, b) => a - b)

      setCurrentWinners(newWinners)
      setCurrentNumber(newWinners[0]) // Show first winner in the display

      // Play winner sound
      if (winnerAudioRef.current && settings.isSoundEnabled) {
        winnerAudioRef.current()
      }

      // Add all winners to the history
      const timestamp = new Date()
      const newWinnerRecords = newWinners.map((number) => ({
        number,
        timestamp,
      }))
      saveWinners(newWinnerRecords)

      setIsSpinning(false)
      setShowWinnerModal(true)
    }, 3000)
  }

  useEffect(() => {
    spinningAudioRef.current = createSpinningSound
    winnerAudioRef.current = createWinnerSound

    const existingWinners = localStorage.getItem('winners')
    if (existingWinners) {
      const parsedWinners = JSON.parse(existingWinners) as Array<WinnerRecord>
      setWinners(parsedWinners)
    }

    // Cleanup function
    return () => {
      spinningAudioRef.current = null
      winnerAudioRef.current = null
    }
  }, [])

  return (
    <SpinWheelContext.Provider
      value={{
        isSpinning,
        showWinnerModal,
        winners,
        currentNumber,
        currentWinners,
        resetSpinWheel,
        closeWinnerModal,
        spinNumbers,
      }}
    >
      {children}
    </SpinWheelContext.Provider>
  )
}
