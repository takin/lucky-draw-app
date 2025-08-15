import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Play, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface WinnerRecord {
  number: number;
  timestamp: Date;
}

interface SpinWheelProps {
  onWinnerChange?: (winners: WinnerRecord[]) => void;
}

export default function SpinWheel({ onWinnerChange }: SpinWheelProps) {
  const [participantCount, setParticipantCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winners, setWinners] = useState<WinnerRecord[]>([]);
  const [currentWinners, setCurrentWinners] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number>(1);
  const [isParticipantSet, setIsParticipantSet] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  // Audio refs
  const spinningAudioRef = useRef<(() => () => void) | null>(null);
  const winnerAudioRef = useRef<(() => AudioContext) | null>(null);

  // Initialize audio elements
  useEffect(() => {
    // Create spinning sound (tick sound) using Web Audio API
    const createSpinningSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create a ticking sound that plays every 50ms during spinning
      const playTick = () => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Vary the frequency slightly for more interesting sound
        const baseFreq = 600;
        const variation = Math.random() * 100 - 50; // ±50 Hz variation
        oscillator.frequency.setValueAtTime(baseFreq + variation, audioContext.currentTime);
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
      };

      // Play tick sound immediately
      playTick();

      // Set up interval to play tick sound every 50ms
      const tickInterval = setInterval(playTick, 50);

      // Return cleanup function
      return () => {
        clearInterval(tickInterval);
        audioContext.close();
      };
    };

    // Create winner sound (confetti celebration sound) using Web Audio API
    const createWinnerSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Create multiple oscillators for a rich confetti-like sound
      const createConfettiSound = () => {
        // Create multiple overlapping sounds for confetti effect
        for (let i = 0; i < 8; i++) {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();

          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);

          // Random frequency for confetti-like effect
          const baseFreq = 200 + Math.random() * 800;
          const delay = Math.random() * 0.5; // Random delay up to 0.5s
          const duration = 0.3 + Math.random() * 0.4; // Random duration

          oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime + delay);
          oscillator.type = 'sawtooth'; // Rich harmonic content

          // Filter for more natural sound
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2000 + Math.random() * 1000, audioContext.currentTime + delay);
          filter.Q.setValueAtTime(0.5, audioContext.currentTime + delay);

          // Envelope for confetti-like attack and decay
          gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
          gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + delay + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + duration);

          oscillator.start(audioContext.currentTime + delay);
          oscillator.stop(audioContext.currentTime + delay + duration);
        }

        // Add some high-pitched sparkle sounds
        for (let i = 0; i < 5; i++) {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          const sparkleFreq = 1500 + Math.random() * 1000;
          const delay = Math.random() * 0.8;
          const duration = 0.1 + Math.random() * 0.2;

          oscillator.frequency.setValueAtTime(sparkleFreq, audioContext.currentTime + delay);
          oscillator.type = 'sine';

          gainNode.gain.setValueAtTime(0, audioContext.currentTime + delay);
          gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + delay + 0.005);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + delay + duration);

          oscillator.start(audioContext.currentTime + delay);
          oscillator.stop(audioContext.currentTime + delay + duration);
        }
      };

      // Play the confetti sound
      createConfettiSound();

      return audioContext;
    };

    // Store the audio creation functions
    spinningAudioRef.current = createSpinningSound;
    winnerAudioRef.current = createWinnerSound;

    // Cleanup function
    return () => {
      spinningAudioRef.current = null;
      winnerAudioRef.current = null;
    };
  }, []);

  const updateParticipants = () => {
    if (participantCount >= 2 && participantCount <= 1000) {
      setCurrentWinners([]);
      setCurrentNumber(1);
      setIsParticipantSet(true);
    }
  };

  const spinNumbers = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setCurrentWinners([]);
    setCurrentNumber(1);
    setShowWinnerModal(false);

    // Start spinning sound
    if (spinningAudioRef.current && isSoundEnabled) {
      const stopSpinningSound = spinningAudioRef.current();

      // Stop the spinning sound after 4 seconds
      setTimeout(() => {
        stopSpinningSound();
      }, 3000);
    }

    // Animate numbers rapidly changing
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      const randomNum = Math.floor(Math.random() * participantCount) + 1;
      setCurrentNumber(randomNum);
    }, 50); // Faster animation - every 50ms

    // Generate final winners after 3 seconds
    setTimeout(() => {
      clearInterval(interval);

      // Generate 10 unique winners
      const newWinners: number[] = [];
      const availableNumbers = Array.from({ length: participantCount }, (_, i) => i + 1);

      // Shuffle the available numbers
      for (let i = availableNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [availableNumbers[i], availableNumbers[j]] = [availableNumbers[j], availableNumbers[i]];
      }

      // Take the first 10 (or all if less than 10 participants)
      const winnerCount = Math.min(10, participantCount);
      for (let i = 0; i < winnerCount; i++) {
        newWinners.push(availableNumbers[i]);
      }

      // Sort winners for better display
      newWinners.sort((a, b) => a - b);

      setCurrentWinners(newWinners);
      setCurrentNumber(newWinners[0]); // Show first winner in the display

      // Play winner sound
      if (winnerAudioRef.current && isSoundEnabled) {
        winnerAudioRef.current();
      }

      // Add all winners to the history
      const timestamp = new Date();
      const newWinnerRecords = newWinners.map((number) => ({ number, timestamp }));
      const updatedWinners = [...winners, ...newWinnerRecords];
      setWinners(updatedWinners);
      onWinnerChange?.(updatedWinners);

      setIsSpinning(false);
      setShowWinnerModal(true);
    }, 3000);
  };

  const resetNumbers = () => {
    if (isSpinning) return;

    setCurrentWinners([]);
    setCurrentNumber(1);
    setShowWinnerModal(false);
    setIsParticipantSet(false);
  };

  const clearWinners = () => {
    setWinners([]);
  };

  const closeWinnerModal = () => {
    setShowWinnerModal(false);
  };

  return (
    <Card className='bg-white rounded-2xl shadow-xl h-full'>
      <CardContent className='p-3 lg:p-4 h-full flex items-center justify-items-center gap-4'>
        <div className='grid grid-flow-col grid-cols-2 gap-6 items-center justify-center w-full'>
          {/* Control Buttons */}
          {isParticipantSet && (
            <div className='flex flex-col justify-center gap-4'>
              <div className='flex flex-col items-center justify-center mt-4'>
                <h2 className='text-6xl font-bold text-yellow-600'>{participantCount}</h2>
                <h3 className='text-yellow-800 mb-4'>Total Peserta</h3>
              </div>

              <Button
                onClick={spinNumbers}
                disabled={isSpinning}
                data-testid='button-spin'
                className='bg-gradient-to-r h-full from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl text-lg font-bold shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              >
                <Play className='w-5 h-5 mr-2' />
                {isSpinning ? 'BERPUTAR...' : 'PUTAR NOMOR'}
              </Button>

              <div className='flex flex-row gap-4'>
                <Button
                  onClick={resetNumbers}
                  disabled={isSpinning}
                  data-testid='button-reset'
                  variant='outline'
                  size='sm'
                  className='w-fit mx-auto'
                >
                  <RotateCcw className='w-4 h-4 mr-2' />
                  Reset
                </Button>

                {/* Sound Toggle Button */}
                <Button
                  onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                  variant='outline'
                  size='sm'
                  className='w-fit mx-auto'
                >
                  {isSoundEnabled ? (
                    <>
                      <Volume2 className='w-4 h-4 mr-2' />
                      Sound On
                    </>
                  ) : (
                    <>
                      <VolumeX className='w-4 h-4 mr-2' />
                      Sound Off
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
          {!isParticipantSet && (
            <div className='p-4 gap-4 flex flex-col items-center justify-center'>
              <label htmlFor='participants' className='text-gray-700 font-semibold'>
                Jumlah Peserta:
              </label>
              <Input
                id='participants'
                data-testid='input-participants'
                type='number'
                min={0}
                max={1000}
                value={participantCount}
                onChange={(e) => setParticipantCount(parseInt(e.target.value))}
                className='w-32 text-center font-semibold'
              />
              <Button
                onClick={updateParticipants}
                data-testid='button-update'
                className='bg-blue-500 hover:bg-blue-600'
              >
                <RotateCcw className='w-4 h-4 mr-2' />
                Update
              </Button>
            </div>
          )}
          {/* </div> */}

          {/* Spinning Number Display */}
          {/* <div className='flex flex-row gap-4 w-full'> */}
          {/* <div className='relative flex justify-center items-center flex-1'> */}
          <div className='relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-4 shadow-2xl'>
            <div className='bg-black/20 rounded-2xl p-4 backdrop-blur-sm'>
              <div className='text-center'>
                <div className='text-white/70 text-sm font-semibold mb-2'>NOMOR PESERTA</div>
                <div className='relative overflow-hidden h-24 flex items-center justify-center'>
                  <motion.div
                    className='text-6xl font-bold text-white font-mono tracking-wider'
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
                    data-testid='number-display'
                  >
                    {isSpinning
                      ? currentNumber.toString().padStart(5, '0')
                      : currentWinners.length > 0
                      ? currentWinners[0].toString().padStart(5, '0')
                      : '00000'}
                  </motion.div>
                </div>
                <div className='text-white/50 text-xs mt-2'>1 - {participantCount}</div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className='absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse'></div>
            <div className='absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full animate-pulse delay-300'></div>
            <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-pulse delay-700'></div>
            <div className='absolute -bottom-2 -right-2 w-6 h-6 bg-purple-400 rounded-full animate-pulse delay-500'></div>
          </div>
        </div>
        {/* </div> */}

        {/* Winner Popup Modal */}
        <AnimatePresence>
          {showWinnerModal && currentWinners.length > 0 && !isSpinning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
              data-testid='winner-modal'
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
                className='bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-8 rounded-3xl shadow-2xl text-white text-center w-[80%] max-w-4xl h-[80%] mx-4 relative overflow-y-auto'
                onClick={(e) => e.stopPropagation()}
                data-testid='result-display'
              >
                {/* Confetti Effect */}
                <div className='absolute inset-0 overflow-hidden rounded-3xl'>
                  <div className='absolute -top-2 -left-2 w-4 h-4 bg-white rounded-full animate-bounce'></div>
                  <div className='absolute -top-1 right-4 w-3 h-3 bg-yellow-200 rounded-full animate-bounce delay-200'></div>
                  <div className='absolute top-3 -right-2 w-5 h-5 bg-orange-200 rounded-full animate-bounce delay-500'></div>
                  <div className='absolute -bottom-2 left-4 w-4 h-4 bg-red-200 rounded-full animate-bounce delay-300'></div>
                  <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full animate-bounce delay-700'></div>
                </div>

                <div className='relative z-10 h-full flex flex-col items-center justify-center'>
                  <h3 className='text-4xl font-bold mb-6 drop-shadow-lg'>
                    <Trophy className='inline-block w-10 h-10 mr-3' />
                    PEMENANG!
                  </h3>
                  <p className='text-xl mb-6 drop-shadow-md'>🎉 Selamat kepada {currentWinners.length} pemenang! 🎉</p>

                  {/* Winners Grid */}
                  <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 w-full max-w-4xl'>
                    {currentWinners.map((winner, index) => (
                      <motion.div
                        key={winner}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className='bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30'
                      >
                        <div className='text-3xl font-bold mb-2 drop-shadow-xl'>
                          {winner.toString().padStart(5, '0')}
                        </div>
                        <div className='text-sm opacity-80'>Pemenang #{index + 1}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className='flex flex-row gap-4 mt-6'>
                    <button
                      onClick={closeWinnerModal}
                      className='bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 border border-white/30'
                      data-testid='button-close-modal'
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
  );
}
