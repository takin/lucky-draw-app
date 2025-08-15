import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface Sponsor {
  id: number;
  name: string;
  logo?: string;
  video?: string;
}

interface SponsorPopup {
  sponsor: Sponsor;
  index: number;
}

export default function SponsorGrid() {
  const [sponsorPopup, setSponsorPopup] = useState<SponsorPopup | null>(null);
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const sponsors: Sponsor[] = [
    { id: 1, name: 'PROPERTEK', logo: '/sponsors/1-propertek.png', video: '/sponsors/1-propertek.mp4' },
    { id: 2, name: 'PTPN', logo: '/sponsors/2-ptpn.png', video: '/sponsors/2-ptpn.mp4' },
    { id: 3, name: 'PLN Mobile', logo: '/sponsors/3-pln-mobile.png', video: '/sponsors/3-pln-mobile.mp4' },
    { id: 4, name: 'Breeze', logo: '/sponsors/4-breeze.png' },
    { id: 5, name: 'KAO', logo: '/sponsors/5-kao.png' },
    { id: 6, name: 'Eka Hospital', logo: '/sponsors/6-eka-hospital.png', video: '/sponsors/6-eka-hospital.mp4' },
    { id: 7, name: 'Kampung Kecil', logo: '/sponsors/7-kampung-kecil.png', video: '/sponsors/7-kampung-kecil.mp4' },
    { id: 8, name: 'Aesthetic', logo: '/sponsors/8-aestetic.jpeg' },
    { id: 9, name: 'Be Smart', logo: '/sponsors/9-be-smart.png' },
    { id: 10, name: 'English 1', logo: '/sponsors/10-english-1.png' },
    { id: 11, name: 'Furry Claws', logo: '/sponsors/11-furry-claws.png' },
    { id: 12, name: 'J Power Oil', logo: '/sponsors/12-j-power-oil.png' },
    { id: 13, name: 'Kong Djie', logo: '/sponsors/13-kong-djie.jpeg' },
    { id: 14, name: 'Lunar Crochet', logo: '/sponsors/14-lunar-crochet.png' },
    { id: 15, name: 'Mareta Cookies', logo: '/sponsors/15-mareta-cookies.png' },
    { id: 16, name: 'Mekar Frozen Foods', logo: '/sponsors/16-mekar-frozen-foods.png' },
    { id: 17, name: 'Nuuraura', logo: '/sponsors/17-nuuraura.png', video: '/sponsors/17-nuuraura.mp4' },
    { id: 18, name: 'Wonder Shoes', logo: '/sponsors/18-wondershoes.jpeg' },
    { id: 19, name: 'Nuimage Creative', logo: '/sponsors/19-nuimage-creative.png' },
    { id: 20, name: 'Warmindo 88', logo: '/sponsors/20-warmindo-88.png' },
  ];

  const sponsorsPerGroup = 3;
  const totalGroups = Math.ceil(sponsors.length / sponsorsPerGroup);

  // Get current group of sponsors
  const getCurrentGroup = () => {
    const startIndex = currentGroupIndex * sponsorsPerGroup;
    return sponsors.slice(startIndex, startIndex + sponsorsPerGroup);
  };

  // Auto-rotate effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
    }, 4000); // Change group every 4 seconds

    return () => clearInterval(interval);
  }, [totalGroups]);

  const goToPrevious = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex === 0 ? totalGroups - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
  };

  const goToGroup = (groupIndex: number) => {
    setCurrentGroupIndex(groupIndex);
  };

  return (
    <Card className='bg-white rounded-2xl shadow-xl h-full'>
      <CardContent className='p-3 lg:p-4 h-full flex flex-col'>
        <h2 className='text-xl font-bold text-center text-gray-800 mb-4'>
          <Handshake className='inline-block w-6 h-6 text-blue-500 mr-2' />
          Sponsor & Partner
        </h2>

        {/* Carousel Container */}
        <div className='relative flex-1 flex items-center justify-center'>
          {/* Previous Button */}
          <Button
            variant='outline'
            size='icon'
            className='absolute left-2 z-10 bg-white/80 hover:bg-white shadow-md'
            onClick={goToPrevious}
          >
            <ChevronLeft className='w-4 h-4' />
          </Button>

          {/* Current Group Display */}
          <div className='relative w-full h-full flex items-center justify-center'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentGroupIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className='grid grid-cols-3 gap-4 w-full max-w-4xl'
              >
                {getCurrentGroup().map((sponsor, index) => (
                  <div
                    key={sponsor.id}
                    className='bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center h-32 hover:shadow-md hover:bg-gray-100 transition-all cursor-pointer group border border-gray-200'
                    data-testid={`sponsor-${sponsor.id}`}
                  >
                    {sponsor.logo ? (
                      <div className='relative w-full h-20 flex items-center justify-center mb-2'>
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          className='max-w-full max-h-full object-contain'
                        />
                        {sponsor.video && (
                          <Button
                            variant='outline'
                            size='icon'
                            className='absolute bottom-1 right-1 bg-white/90 hover:bg-white w-6 h-6'
                          >
                            <Play className='w-3 h-3' />
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className='h-20 flex items-center justify-center mb-2'>
                        <span className='text-gray-500 font-semibold text-sm text-center group-hover:text-gray-700 transition-colors'>
                          {sponsor.name}
                        </span>
                      </div>
                    )}

                    <h3 className='text-xs font-semibold text-gray-800 text-center leading-tight'>{sponsor.name}</h3>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <Button
            variant='outline'
            size='icon'
            className='absolute right-2 z-10 bg-white/80 hover:bg-white shadow-md'
            onClick={goToNext}
          >
            <ChevronRight className='w-4 h-4' />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className='flex justify-center items-center space-x-2 mt-4'>
          {Array.from({ length: totalGroups }, (_, index) => (
            <button
              key={index}
              onClick={() => goToGroup(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentGroupIndex ? 'bg-blue-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to group ${index + 1}`}
            />
          ))}
        </div>

        <div className='text-center mt-4'>
          <p className='text-xs text-gray-600'>
            Terima kasih kepada semua sponsor dan partner yang telah mendukung acara ini
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
