import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Play, RotateCcw, Trophy, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WheelSegment {
  id: number;
  color: string;
  number: number;
}

export default function SpinWheel() {
  const [participantCount, setParticipantCount] = useState(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [segments, setSegments] = useState<WheelSegment[]>([]);

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  useEffect(() => {
    generateSegments();
  }, [participantCount]);

  const generateSegments = () => {
    const newSegments: WheelSegment[] = [];
    for (let i = 0; i < participantCount; i++) {
      newSegments.push({
        id: i,
        color: colors[i % colors.length],
        number: i + 1
      });
    }
    setSegments(newSegments);
  };

  const updateParticipants = () => {
    if (participantCount >= 2 && participantCount <= 100) {
      generateSegments();
      setWinner(null);
      setRotation(0);
    }
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner(null);
    
    // Generate random winner
    const randomWinner = Math.floor(Math.random() * participantCount) + 1;
    
    // Calculate rotation for the winner
    const segmentAngle = 360 / participantCount;
    const winnerAngle = (randomWinner - 1) * segmentAngle + (segmentAngle / 2);
    const finalRotation = 1800 + (360 - winnerAngle); // 5 full rotations + position
    
    setRotation(finalRotation);
    
    // Show winner after spin completes
    setTimeout(() => {
      setWinner(randomWinner);
      setIsSpinning(false);
    }, 4000);
  };

  const resetWheel = () => {
    if (isSpinning) return;
    setRotation(0);
    setWinner(null);
  };

  const WheelSegmentComponent = ({ segment, index }: { segment: WheelSegment; index: number }) => {
    const segmentAngle = 360 / participantCount;
    const rotation = index * segmentAngle;
    
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotate(${rotation}deg)`,
          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((segmentAngle * Math.PI) / 180)}% ${50 - 50 * Math.cos((segmentAngle * Math.PI) / 180)}%)`
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: segment.color }}
        >
          <div
            className="text-white font-bold text-sm"
            style={{
              transform: `rotate(${segmentAngle/2}deg) translateY(-60px)`
            }}
          >
            {segment.number}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-white rounded-2xl shadow-xl">
      <CardContent className="p-6 lg:p-8">
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
              max={100}
              value={participantCount}
              onChange={(e) => setParticipantCount(parseInt(e.target.value) || 10)}
              className="w-24 text-center font-semibold"
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

        {/* Spinning Wheel Container */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-80 h-80 mx-auto">
            {/* Wheel Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
              <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-600"></div>
            </div>
            
            {/* Wheel */}
            <motion.div
              className="w-full h-full rounded-full border-8 border-gray-300 shadow-2xl bg-gradient-to-br from-white to-gray-100 relative overflow-hidden"
              animate={{ rotate: rotation }}
              transition={{ 
                duration: isSpinning ? 4 : 0,
                ease: isSpinning ? [0.23, 1, 0.320, 1] : "linear"
              }}
              data-testid="wheel-container"
            >
              {segments.length > 0 ? (
                segments.map((segment, index) => (
                  <WheelSegmentComponent
                    key={segment.id}
                    segment={segment}
                    index={index}
                  />
                ))
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl font-bold text-gray-400">
                    <RotateCcw className="w-16 h-16 animate-spin" />
                  </div>
                </div>
              )}
            </motion.div>
            
            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center">
              <Star className="text-white w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={spinWheel}
            disabled={isSpinning}
            data-testid="button-spin"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Play className="w-6 h-6 mr-3" />
            {isSpinning ? "BERPUTAR..." : "PUTAR RODA"}
          </Button>
          
          <Button
            onClick={resetWheel}
            disabled={isSpinning}
            data-testid="button-reset"
            variant="outline"
            className="px-6 py-4 rounded-xl font-semibold"
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
