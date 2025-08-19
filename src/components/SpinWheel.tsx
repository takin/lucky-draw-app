import { Play, RotateCcw, Trophy } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAppContext } from '@/contexts/app-context'
import { useSpinWheelContext } from '@/contexts/spin-wheel-context'

export default function SpinWheel() {
  const { settings } = useAppContext()
  const {
    isSpinning,
    showWinnerModal,
    isNonWinnerParticipantExist,
    winners,
    currentNumber,
    currentWinners,
    resetSpinWheel,
    spinNumbers,
    closeWinnerModal,
  } = useSpinWheelContext()

  return (
    <Card className="bg-white rounded-2xl shadow-xl h-full">
      <CardContent className="p-3 lg:p-4 h-full flex items-center justify-items-center gap-4">
        <div className="grid grid-flow-col grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center w-full">
          {/* Control Buttons */}
          <div className="flex flex-col justify-center gap-4">
            <div className="flex flex-col items-center justify-center mt-4">
              <h2 className="text-6xl font-bold text-yellow-600">
                {settings.numOfParticipants}
              </h2>
              <h3 className="text-yellow-800 mb-4">Total Peserta</h3>
            </div>

            <Button
              onClick={() =>
                spinNumbers(settings.startNumber, settings.numOfParticipants)
              }
              disabled={
                isSpinning || winners.length === settings.numOfParticipants
              }
              data-testid="button-spin"
              className="bg-gradient-to-r h-full from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Play className="w-5 h-5 mr-2" />
              {isSpinning ? 'BERPUTAR...' : 'PUTAR NOMOR'}
            </Button>

            <div className="flex flex-row gap-4">
              <Button
                onClick={resetSpinWheel}
                disabled={isSpinning}
                data-testid="button-reset"
                variant="outline"
                size="sm"
                className="w-full mx-auto"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Spinning Number Display */}
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-4 shadow-2xl">
            <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-white/70 text-sm font-semibold mb-2">
                  NOMOR PESERTA
                </div>
                <div className="relative overflow-hidden h-24 flex items-center justify-center">
                  <motion.div
                    className="text-6xl font-bold text-white font-mono tracking-wider"
                    animate={
                      isSpinning
                        ? {
                            y: [-50, 50],
                            scale: [0.8, 1.2, 0.8],
                          }
                        : {}
                    }
                    transition={{
                      duration: isSpinning ? 0.05 : 0,
                      ease: 'easeInOut',
                      repeat: isSpinning ? Infinity : 0,
                      repeatType: 'reverse',
                    }}
                    key={currentNumber} // Force re-render when number changes
                    data-testid="number-display"
                  >
                    {isSpinning
                      ? currentNumber
                          .toString()
                          .padStart(settings.paddedNumber || 1, '0')
                      : currentWinners.length > 0
                        ? currentWinners[0]
                            .toString()
                            .padStart(settings.paddedNumber || 1, '0')
                        : '0'.repeat(settings.paddedNumber || 1)}
                  </motion.div>
                </div>
                <div className="text-white/50 text-xs mt-2">
                  {settings.numOfParticipants}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-pulse delay-700"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Winner Popup Modal */}
        <AnimatePresence>
          {showWinnerModal && currentWinners.length > 0 && !isSpinning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              data-testid="winner-modal"
              onClick={closeWinnerModal}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  type: 'spring',
                  duration: 0.8,
                  bounce: 0.4,
                }}
                className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-3xl shadow-2xl text-white text-center w-[80%] max-w-4xl h-[80%] mx-4 relative overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                data-testid="result-display"
              >
                {/* Confetti Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full animate-bounce"></div>
                  <div className="absolute -top-1 right-4 w-3 h-3 bg-yellow-200 rounded-full animate-bounce delay-200"></div>
                  <div className="absolute top-3 -right-2 w-5 h-5 bg-orange-200 rounded-full animate-bounce delay-500"></div>
                  <div className="absolute -bottom-2 left-4 w-4 h-4 bg-red-200 rounded-full animate-bounce delay-300"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full animate-bounce delay-700"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center">
                  <h3 className="text-4xl font-bold mb-6 drop-shadow-lg">
                    <Trophy className="inline-block w-10 h-10 mr-3" />
                    PEMENANG!
                  </h3>
                  <p className="text-xl mb-6 drop-shadow-md">
                    🎉 Selamat kepada {currentWinners.length} pemenang! 🎉
                  </p>

                  {/* Winners Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 w-full max-w-4xl">
                    {/* Of there is no winner, then display a message */}
                    {currentWinners.length === 0 && (
                      <div className="text-xl mb-6 drop-shadow-md">
                        <p>
                          {isNonWinnerParticipantExist
                            ? 'Jumlah partisipan sudah habis'
                            : 'Belum ada pemenang yang ditentukan'}
                        </p>
                      </div>
                    )}

                    {/* If there is a winner, then display the winners */}
                    {currentWinners.length > 0 &&
                      currentWinners.map((winner, index) => (
                        <motion.div
                          key={winner}
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                        >
                          <div className="text-3xl font-bold mb-2 drop-shadow-xl">
                            {winner.toString().padStart(5, '0')}
                          </div>
                          <div className="text-sm opacity-80">
                            Pemenang #{index + 1}
                          </div>
                        </motion.div>
                      ))}
                  </div>

                  <div className="flex flex-row gap-4 mt-6">
                    <button
                      onClick={closeWinnerModal}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/30"
                      data-testid="button-close-modal"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
