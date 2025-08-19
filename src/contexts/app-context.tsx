import { createContext, useContext, useEffect, useState } from 'react'

export interface Settings {
  title: string
  subtitle: string
  winnerPerSpin: number
  maxWinners: number
  startNumber: number
  numOfParticipants: number
  paddedNumber: number
  isSoundEnabled: boolean
}

const defaultSettings: Settings = {
  title: 'SPIN WHEEL',
  subtitle: 'DEVELOPED BY AFAN & ARFAN',
  winnerPerSpin: 1,
  maxWinners: 1,
  startNumber: 1,
  numOfParticipants: 1,
  paddedNumber: 1,
  isSoundEnabled: false,
}

export const AppContext = createContext<{
  settings: Settings
  setSettings: (settings: Settings) => void
}>({
  settings: defaultSettings,
  setSettings: () => {},
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  return context
}

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const localSettings = localStorage.getItem('settings')
  const [settings, setSettings] = useState<Settings>(
    localSettings ? JSON.parse(localSettings) : defaultSettings,
  )

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings))
  }, [settings])

  return (
    <AppContext.Provider value={{ settings, setSettings }}>
      {children}
    </AppContext.Provider>
  )
}
