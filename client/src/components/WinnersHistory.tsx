import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WinnerRecord } from "./SpinWheel";

interface WinnersHistoryProps {
  winners: WinnerRecord[];
  onClearHistory: () => void;
}

export default function WinnersHistory({ winners, onClearHistory }: WinnersHistoryProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="bg-white rounded-2xl shadow-xl mb-4">
      <CardContent className="p-3 lg:p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-gray-800">
            <Trophy className="inline-block w-4 h-4 text-yellow-500 mr-2" />
            Riwayat Pemenang
          </h2>
          {winners.length > 0 && (
            <Button
              onClick={onClearHistory}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              data-testid="button-clear-history"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Riwayat
            </Button>
          )}
        </div>

        {winners.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">Belum ada pemenang</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 max-h-24 overflow-y-auto" data-testid="winners-list">
            <AnimatePresence>
              {winners.map((winner, index) => (
                <motion.div
                  key={`${winner.number}-${winner.timestamp.getTime()}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-2 text-center shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  data-testid={`winner-record-${index}`}
                  title={`Peserta #${winner.number.toString().padStart(3, '0')} - ${formatTime(winner.timestamp)}`}
                >
                  <div className="text-white font-bold text-lg group-hover:scale-110 transition-transform">
                    {winner.number.toString().padStart(3, '0')}
                  </div>
                  <div className="text-white/70 text-xs">
                    {formatTime(winner.timestamp).slice(0, 5)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {winners.length > 0 && (
          <div className="mt-2 text-center text-xs text-gray-500">
            Total: {winners.length} pemenang
          </div>
        )}
      </CardContent>
    </Card>
  );
}