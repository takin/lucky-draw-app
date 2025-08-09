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
    <Card className="bg-white rounded-2xl shadow-xl mb-6">
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            <Trophy className="inline-block w-5 h-5 text-yellow-500 mr-2" />
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
          <div className="text-center py-8 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>Belum ada pemenang</p>
            <p className="text-sm">Mulai putaran untuk melihat riwayat pemenang</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-32 overflow-y-auto" data-testid="winners-list">
            <AnimatePresence>
              {winners.map((winner, index) => (
                <motion.div
                  key={`${winner.number}-${winner.timestamp.getTime()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-xl border border-yellow-200"
                  data-testid={`winner-record-${index}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {winner.number}
                    </div>
                    <span className="font-semibold text-gray-800">
                      Peserta #{winner.number.toString().padStart(3, '0')}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(winner.timestamp)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {winners.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Total pemenang: {winners.length}
          </div>
        )}
      </CardContent>
    </Card>
  );
}