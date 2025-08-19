import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createSpinningSound, createWinnerSound } from '@/lib/audio'

type SpinWheelContextType = {
  isSpinning: boolean
  showWinnerModal: boolean
  isParticipantSet: boolean
  isNonWinnerParticipantExist: boolean
  winners: Array<WinnerRecord>
  currentNumber: number
  currentWinners: Array<number>
  resetSpinWheel: () => void
  setIsSpinning: (isSpinning: boolean) => void
  setShowWinnerModal: (showWinnerModal: boolean) => void
  setIsParticipantSet: (isParticipantSet: boolean) => void
  setIsNonWinnerParticipantExist: (isNonWinnerParticipantExist: boolean) => void
  setWinners: (winners: Array<WinnerRecord>) => void
  setCurrentNumber: (currentNumber: number) => void
  setCurrentWinners: (currentWinners: Array<number>) => void
  closeWinnerModal: () => void
  spinNumbers: (startNumber: number, numOfParticipants: number) => void
  setIsSoundEnabled: (isSoundEnabled: boolean) => void
  isSoundEnabled: boolean
}

type WinnerRecord = {
  number: number
  timestamp: Date
}

export const SpinWheelContext = createContext<SpinWheelContextType>({
  isSpinning: false,
  showWinnerModal: false,
  isParticipantSet: false,
  isNonWinnerParticipantExist: false,
  winners: [],
  currentNumber: 0,
  currentWinners: [],
  resetSpinWheel: () => {},
  setIsSpinning: () => {},
  setShowWinnerModal: () => {},
  setIsParticipantSet: () => {},
  setIsNonWinnerParticipantExist: () => {},
  setWinners: () => {},
  setCurrentNumber: () => {},
  setCurrentWinners: () => {},
  closeWinnerModal: () => {},
  spinNumbers: () => {},
  setIsSoundEnabled: () => {},
  isSoundEnabled: false,
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
  const [isParticipantSet, setIsParticipantSet] = useState(false)
  const [isNonWinnerParticipantExist, setIsNonWinnerParticipantExist] =
    useState(false)
  const [winners, setWinners] = useState<Array<WinnerRecord>>([])
  const [currentNumber, setCurrentNumber] = useState(0)
  const [currentWinners, setCurrentWinners] = useState<Array<number>>([])
  const spinningAudioRef = useRef<(() => () => void) | null>(null)
  const winnerAudioRef = useRef<(() => AudioContext) | null>(null)
  const [isSoundEnabled, setIsSoundEnabled] = useState(false)

  const resetSpinWheel = () => {
    if (isSpinning) return

    setCurrentWinners([])
    setCurrentNumber(0)
    setShowWinnerModal(false)
    setIsParticipantSet(false)
    setIsNonWinnerParticipantExist(false)
    setWinners([])
  }

  const closeWinnerModal = () => {
    setShowWinnerModal(false)
  }

  const spinNumbers = (startNumber: number, numOfParticipants: number) => {
    if (isSpinning) return

    setIsSpinning(true)
    setCurrentWinners([])
    setCurrentNumber(1)
    setShowWinnerModal(false)

    // Start spinning sound
    if (spinningAudioRef.current && isSoundEnabled) {
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

      // Generate 10 unique winners
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

      // Take the first 10 (or all if less than 10 participants)
      const winnerCount = Math.min(availableNumbers.length, 10)
      for (let i = 0; i < winnerCount; i++) {
        newWinners.push(availableNumbers[i])
      }

      // Sort winners for better display
      newWinners.sort((a, b) => a - b)

      setCurrentWinners(newWinners)
      setCurrentNumber(newWinners[0]) // Show first winner in the display

      // Play winner sound
      if (winnerAudioRef.current && isSoundEnabled) {
        winnerAudioRef.current()
      }

      // Add all winners to the history
      const timestamp = new Date()
      const newWinnerRecords = newWinners.map((number) => ({
        number,
        timestamp,
      }))
      setWinners([...winners, ...newWinnerRecords])

      setIsSpinning(false)
      setShowWinnerModal(true)
    }, 3000)
  }

  useEffect(() => {
    spinningAudioRef.current = createSpinningSound
    winnerAudioRef.current = createWinnerSound

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
        isParticipantSet,
        isNonWinnerParticipantExist,
        winners,
        currentNumber,
        currentWinners,
        resetSpinWheel,
        setIsSpinning,
        setShowWinnerModal,
        setIsParticipantSet,
        setIsNonWinnerParticipantExist,
        setWinners,
        setCurrentNumber,
        setCurrentWinners,
        closeWinnerModal,
        spinNumbers,
        setIsSoundEnabled,
        isSoundEnabled,
      }}
    >
      {children}
    </SpinWheelContext.Provider>
  )
}
