import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Trash2, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { formatTime } from '@/lib/utils'
import { useWinnerHistoryContext } from '@/contexts/winner-history-context'

export default function WinnersHistory() {
  const {
    searchWinner,
    clearSearch,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    totalData,
    nextPage,
    previousPage,
    isSearching,
    paging,
  } = useWinnerHistoryContext()

  return (
    <Card className="bg-white rounded-2xl shadow-xl h-full">
      <CardContent className="px-4 lg:p-4 h-full flex flex-col">
        <div className="flex items-center justify-between pb-3 h-10">
          <h2 className="text-lg font-bold text-gray-800">
            <Trophy className="inline-block w-4 h-4 text-yellow-500 mr-2" />
            Riwayat Pemenang
          </h2>
          {paging.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={clearSearch}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                data-testid="button-clear-history"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Hapus Riwayat
              </Button>
            </motion.div>
          )}
        </div>

        <div className="w-full pt-2">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-4">
            {(isSearching || paging.length > 0) && (
              <Button
                onClick={previousPage}
                disabled={currentPage === 0}
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-prev-page"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Prev
              </Button>
            )}

            <div className="w-full px-4">
              <Input
                className="w-full text-center font-semibold"
                placeholder="Cari nomor pemenang"
                onChange={searchWinner}
              />
            </div>
            {(isSearching || paging.length > 0) && (
              <Button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-next-page"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>

          {/* Winners Grid */}
          <div className="grid grid-cols-1 gap-3" data-testid="winners-list">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full"
              >
                {paging.length > 0 &&
                  paging[currentPage].map((winner, index) => (
                    <motion.div
                      key={`${winner.number}-${new Date(winner.timestamp).getTime()}`}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group min-h-[80px] flex flex-col justify-center"
                      data-testid={`winner-record-${startIndex + index}`}
                      title={`Peserta #${winner.numberPadded} - ${formatTime(new Date(winner.timestamp)).slice(0, 5)}`}
                    >
                      <div className="text-white font-bold text-lg group-hover:scale-110 transition-transform mb-1">
                        {winner.numberPadded}
                      </div>
                      <div className="text-white/80 text-xs font-medium">
                        {formatTime(new Date(winner.timestamp)).slice(0, 5)}
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex-1 flex items-start justify-center">
          {paging.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Trophy className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                <p className="text-xs">Belum ada pemenang</p>
              </div>
            </div>
          )}
        </div>

        {paging.length > 0 && (
          <div className="mt-4 pt-2 text-center text-xs text-gray-500">
            Total: {totalData} pemenang
            {totalPages > 1 &&
              ` • Menampilkan ${startIndex + 1}-${Math.min(
                endIndex,
                totalData,
              )} dari ${totalData}`}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
