import { createContext, useContext } from 'react'

export interface Settings {
  title: string
  subtitle: string
  winnerPerSpin: number
  maxWinners: number
  startNumber: number
  numOfParticipants: number
  paddedNumber: number
}

export interface WinnerRecord {
  number: number
  timestamp: Date
}

export const AppContext = createContext<{
  settings: Settings
  setSettings: (settings: Settings) => void
  winners: Array<WinnerRecord>
  setWinners: (winners: Array<WinnerRecord>) => void
  clearWinners: () => void
  isSpinning: boolean
  setIsSpinning: (isSpinning: boolean) => void
  currentNumber: number
  setCurrentNumber: (currentNumber: number) => void
  currentWinners: Array<number>
  setCurrentWinners: (currentWinners: Array<number>) => void
  isParticipantSet: boolean
  setIsParticipantSet: (isParticipantSet: boolean) => void
  isSoundEnabled: boolean
  setIsSoundEnabled: (isSoundEnabled: boolean) => void
  showWinnerModal: boolean
  setShowWinnerModal: (showWinnerModal: boolean) => void
  isNonWinnerParticipantExist: boolean
  setIsNonWinnerParticipantExist: (isNonWinnerParticipantExist: boolean) => void
  audioRefs: {
    spinSound: HTMLAudioElement | null
    winnerSound: HTMLAudioElement | null
    nonWinnerSound: HTMLAudioElement | null
  }
}>({
  settings: {
    title: 'FUNWALK',
    subtitle: 'CLUSTER MONTERREY CITRALAND CIBUBUR',
    winnerPerSpin: 10,
    maxWinners: 10,
    startNumber: 0,
    numOfParticipants: 1,
    paddedNumber: 10,
  },
  setSettings: () => {},
  winners: [],
  setWinners: () => {},
  clearWinners: () => {},
  isSpinning: false,
  setIsSpinning: () => {},
  currentNumber: 0,
  setCurrentNumber: () => {},
  currentWinners: [],
  setCurrentWinners: () => {},
  isParticipantSet: false,
  setIsParticipantSet: () => {},
  isSoundEnabled: true,
  setIsSoundEnabled: () => {},
  showWinnerModal: false,
  setShowWinnerModal: () => {},
  isNonWinnerParticipantExist: false,
  setIsNonWinnerParticipantExist: () => {},
  audioRefs: {
    spinSound: null,
    winnerSound: null,
    nonWinnerSound: null,
  },
})

export const useAppContext = () => {
  return useContext(AppContext)
}
