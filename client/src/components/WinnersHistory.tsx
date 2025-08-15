import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WinnerRecord } from './SpinWheel';

interface WinnersHistoryProps {
  winners: WinnerRecord[];
  onClearHistory: () => void;
}

export default function WinnersHistory({ winners, onClearHistory }: WinnersHistoryProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
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
              onClick={onClearHistory}
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
              <div
                className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2'
                data-testid='winners-list'
              >
                <AnimatePresence>
                  {winners.map((winner, index) => (
                    <motion.div
                      key={`${winner.number}-${winner.timestamp.getTime()}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className='bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer group'
                      data-testid={`winner-record-${index}`}
                      title={`Peserta #${winner.number.toString().padStart(3, '0')} - ${formatTime(winner.timestamp)}`}
                    >
                      <div className='text-white font-bold text-sm group-hover:scale-110 transition-transform'>
                        {winner.number.toString().padStart(3, '0')}
                      </div>
                      <div className='text-white/70 text-[10px]'>{formatTime(winner.timestamp).slice(0, 5)}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>

        {winners.length > 0 && (
          <div className='mt-auto pt-2 text-center text-xs text-gray-500'>Total: {winners.length} pemenang</div>
        )}
      </CardContent>
    </Card>
  );
}
