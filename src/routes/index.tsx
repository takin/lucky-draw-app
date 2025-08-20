import { createFileRoute } from '@tanstack/react-router'
import SpinWheel from '@/components/SpinWheel'
import WinnerHistory from '@/components/WinnerHistory'
import { SpinWheelContextProvider } from '@/contexts/spin-wheel-context'
import { WinnerHistoryContextProvider } from '@/contexts/winner-history-context'
import Sponsors from '@/components/Sponsors'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center min-h-[calc(100vh-90px)] flex flex-col items-center justify-center bg-gray-200">
      <div className="flex flex-col gap-4">
        <div className="flex flex-1 flex-row items-center gap-4 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SpinWheelContextProvider>
              <WinnerHistoryContextProvider>
                <SpinWheel />
                <WinnerHistory />
              </WinnerHistoryContextProvider>
            </SpinWheelContextProvider>
          </div>
        </div>
        <div className="flex flex-1 h-[200px]">
          <Sponsors />
        </div>
      </div>
    </div>
  )
}
