import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Play, RotateCcw, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SpinWheel() {
  const [participantCount, setParticipantCount] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [currentNumber, setCurrentNumber] = useState<number>(1);

  const updateParticipants = () => {
    if (participantCount >= 2 && participantCount <= 1000) {
      setWinner(null);
      setCurrentNumber(1);
    }
  };

  const spinNumbers = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    setCurrentNumber(1);
    
    // Animate numbers rapidly changing
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      const randomNum = Math.floor(Math.random() * participantCount) + 1;
      setCurrentNumber(randomNum);
    }, 50); // Faster animation - every 50ms
    
    // Generate final winner after 4 seconds
    setTimeout(() => {
      clearInterval(interval);
      const randomWinner = Math.floor(Math.random() * participantCount) + 1;
      setWinner(randomWinner);
      setCurrentNumber(randomWinner);
      setIsSpinning(false);
    }, 4000);
  };

  const resetNumbers = () => {
    if (isSpinning) return;
    setWinner(null);
    setCurrentNumber(1);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-xl">
      <CardContent className="p-4 lg:p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            <Users className="inline-block w-6 h-6 text-blue-500 mr-2" />
            Pengaturan Peserta
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <label htmlFor="participants" className="text-gray-700 font-semibold">
              Jumlah Peserta:
            </label>
            <Input
              id="participants"
              data-testid="input-participants"
              type="number"
              min={2}
              max={1000}
              value={participantCount}
              onChange={(e) => setParticipantCount(parseInt(e.target.value) || 10)}
              className="w-32 text-center font-semibold"
            />
            <Button
              onClick={updateParticipants}
              data-testid="button-update"
              className="bg-blue-500 hover:bg-blue-600"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Update
            </Button>
          </div>
        </div>

        {/* Spinning Number Display */}
        <div className="relative flex justify-center items-center">
          <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-2xl">
            <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-white/70 text-sm font-semibold mb-2">NOMOR PESERTA</div>
                <motion.div
                  className="text-8xl font-bold text-white font-mono tracking-wider"
                  animate={isSpinning ? { 
                    scale: [1, 1.1, 1],
                    rotateY: [0, 360, 720, 1080] 
                  } : {}}
                  transition={{ 
                    duration: isSpinning ? 4 : 0,
                    ease: isSpinning ? [0.23, 1, 0.320, 1] : "linear",
                    repeat: isSpinning ? 0 : 0
                  }}
                  data-testid="number-display"
                >
                  {isSpinning ? currentNumber.toString().padStart(3, '0') : (winner ? winner.toString().padStart(3, '0') : "000")}
                </motion.div>
                <div className="text-white/50 text-xs mt-2">1 - {participantCount}</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-pulse delay-300"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-pulse delay-700"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={spinNumbers}
            disabled={isSpinning}
            data-testid="button-spin"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Play className="w-5 h-5 mr-2" />
            {isSpinning ? "BERPUTAR..." : "PUTAR NOMOR"}
          </Button>
          
          <Button
            onClick={resetNumbers}
            disabled={isSpinning}
            data-testid="button-reset"
            variant="outline"
            className="px-4 py-3 rounded-xl font-semibold"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Result Display */}
        <AnimatePresence>
          {winner && !isSpinning && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="mt-6"
              data-testid="result-display"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-2">
                  <Trophy className="inline-block w-6 h-6 mr-2" />
                  PEMENANG!
                </h3>
                <div className="text-4xl font-bold" data-testid="winner-number">
                  {winner}
                </div>
                <p className="text-sm mt-2 opacity-90">
                  Selamat kepada peserta nomor {winner}!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
