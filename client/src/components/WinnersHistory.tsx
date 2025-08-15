import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WinnerRecord } from './SpinWheel';

interface WinnersHistoryProps {
  winners: WinnerRecord[];
  onClearHistory: () => void;
}

export default function WinnersHistory({ winners, onClearHistory }: WinnersHistoryProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const winnersPerPage = 10;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const totalPages = Math.ceil(winners.length / winnersPerPage);
  const startIndex = currentPage * winnersPerPage;
  const endIndex = startIndex + winnersPerPage;
  const currentWinners = winners.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleClearHistory = () => {
    setCurrentPage(0);
    onClearHistory();
  };

  return (
    <Card className='bg-white rounded-2xl shadow-xl h-full'>
      <CardContent className='p-3 lg:p-4 h-full flex flex-col'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className='text-lg font-bold text-gray-800'>
            <Trophy className='inline-block w-4 h-4 text-yellow-500 mr-2' />
            Riwayat Pemenang
          </h2>
          {winners.length > 0 && (
            <Button
              onClick={handleClearHistory}
              variant='outline'
              size='sm'
              className='text-red-600 hover:text-red-700 hover:bg-red-50'
              data-testid='button-clear-history'
            >
              <Trash2 className='w-4 h-4 mr-2' />
              Hapus Riwayat
            </Button>
          )}
        </div>

        <div className='flex-1 flex items-start justify-center'>
          {winners.length === 0 ? (
            <div className='flex items-center justify-center h-full'>
              <div className='text-center text-gray-500'>
                <Trophy className='w-6 h-6 mx-auto mb-1 text-gray-300' />
                <p className='text-xs'>Belum ada pemenang</p>
              </div>
            </div>
          ) : (
            <div className='w-full pt-2'>
              {/* Navigation Controls */}
              {totalPages > 1 && (
                <div className='flex items-center justify-between mb-4'>
                  <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 0}
                    variant='outline'
                    size='sm'
                    className='text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    data-testid='button-prev-page'
                  >
                    <ChevronLeft className='w-4 h-4 mr-1' />
                    Sebelumnya
                  </Button>

                  <div className='text-sm text-gray-600 font-medium'>
                    Halaman {currentPage + 1} dari {totalPages}
                  </div>

                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages - 1}
                    variant='outline'
                    size='sm'
                    className='text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
                    data-testid='button-next-page'
                  >
                    Selanjutnya
                    <ChevronRight className='w-4 h-4 ml-1' />
                  </Button>
                </div>
              )}

              {/* Winners Grid */}
              <div className='grid grid-cols-1 gap-3' data-testid='winners-list'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full'
                  >
                    {currentWinners.map((winner, index) => (
                      <motion.div
                        key={`${winner.number}-${winner.timestamp.getTime()}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className='bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group min-h-[80px] flex flex-col justify-center'
                        data-testid={`winner-record-${startIndex + index}`}
                        title={`Peserta #${winner.number.toString().padStart(5, '0')} - ${formatTime(
                          winner.timestamp
                        )}`}
                      >
                        <div className='text-white font-bold text-lg group-hover:scale-110 transition-transform mb-1'>
                          {winner.number.toString().padStart(5, '0')}
                        </div>
                        <div className='text-white/80 text-xs font-medium'>
                          {formatTime(winner.timestamp).slice(0, 5)}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {winners.length > 0 && (
          <div className='mt-auto pt-2 text-center text-xs text-gray-500'>
            Total: {winners.length} pemenang
            {totalPages > 1 &&
              ` • Menampilkan ${startIndex + 1}-${Math.min(endIndex, winners.length)} dari ${winners.length}`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
