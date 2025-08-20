import { createFileRoute } from '@tanstack/react-router'
import SpinWheel from '@/components/SpinWheel'
import WinnerHistory from '@/components/WinnerHistory'
import { SpinWheelContextProvider } from '@/contexts/spin-wheel-context'
import { WinnerHistoryContextProvider } from '@/contexts/winner-history-context'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="flex flex-row items-center justify-center gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SpinWheelContextProvider>
            <WinnerHistoryContextProvider>
              <SpinWheel />
              <WinnerHistory />
            </WinnerHistoryContextProvider>
          </SpinWheelContextProvider>
        </div>
      </div>
    </div>
  )
}
