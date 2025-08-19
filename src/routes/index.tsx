import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import type { WinnerRecord } from '@/components/SpinWheel'
import SpinWheel from '@/components/SpinWheel'
import WinnerHistory from '@/components/WinnerHistory'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center bg-gray-200">
      <div className="flex flex-row items-center justify-center gap-4 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SpinWheel />
          <WinnerHistory />
        </div>
      </div>
    </div>
  )
}
