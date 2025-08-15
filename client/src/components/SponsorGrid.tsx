import { Card, CardContent } from '@/components/ui/card';
import { Handshake } from 'lucide-react';
import { motion } from 'framer-motion';

interface Sponsor {
  id: number;
  name: string;
  logo?: string;
}

export default function SponsorGrid() {
  const sponsors: Sponsor[] = [
    { id: 1, name: 'PROPERTEK', logo: '/sponsors/1-propertek.png' },
    { id: 2, name: 'PTPN', logo: '/sponsors/2-ptpn.png' },
    { id: 3, name: 'PLN Mobile', logo: '/sponsors/3-pln-mobile.png' },
    { id: 4, name: 'Breeze', logo: '/sponsors/4-breeze.png' },
    { id: 5, name: 'KAO', logo: '/sponsors/5-kao.png' },
    { id: 6, name: 'Eka Hospital', logo: '/sponsors/6-eka-hospital.png' },
    { id: 7, name: 'Kampung Kecil', logo: '/sponsors/7-kampung-kecil.png' },
    { id: 8, name: 'Aesthetic', logo: '/sponsors/8-aestetic.jpeg' },
    { id: 9, name: 'Be Smart', logo: '/sponsors/9-be-smart.png' },
    { id: 10, name: 'English 1', logo: '/sponsors/10-english-1.png' },
    { id: 11, name: 'Furry Claws', logo: '/sponsors/11-furry-claws.png' },
    { id: 12, name: 'J Power Oil', logo: '/sponsors/12-j-power-oil.png' },
    { id: 13, name: 'Kong Djie', logo: '/sponsors/13-kong-djie.jpeg' },
    { id: 14, name: 'Lunar Crochet', logo: '/sponsors/14-lunar-crochet.png' },
    { id: 15, name: 'Mareta Cookies', logo: '/sponsors/15-mareta-cookies.png' },
    { id: 16, name: 'Mekar Frozen Foods', logo: '/sponsors/16-mekar-frozen-foods.png' },
    { id: 17, name: 'Nuuraura', logo: '/sponsors/17-nuuraura.png' },
    { id: 18, name: 'Wonder Shoes', logo: '/sponsors/18-wondershoes.jpeg' },
    { id: 19, name: 'Nuimage Creative', logo: '/sponsors/19-nuimage-creative.png' },
    { id: 20, name: 'Warmindo 88', logo: '/sponsors/20-warmindo-88.png' },
  ];

  return (
    <Card className='bg-white rounded-2xl shadow-xl h-full'>
      <CardContent className='p-3 lg:p-4 h-full flex flex-col'>
        <h2 className='text-xl font-bold text-center text-gray-800 mb-4'>
          <Handshake className='inline-block w-6 h-6 text-blue-500 mr-2' />
          Sponsor & Partner
        </h2>

        <div
          className='items-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 flex-1'
          data-testid='sponsor-grid'
        >
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className='bg-gray-50 rounded-xl p-4 flex items-center justify-center h-24 hover:shadow-md hover:bg-gray-100 transition-all cursor-pointer group border border-gray-200'
              data-testid={`sponsor-${sponsor.id}`}
            >
              {sponsor.logo ? (
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} className='max-w-full max-h-full object-contain' />
              ) : (
                <span className='text-gray-500 font-semibold text-sm text-center group-hover:text-gray-700 transition-colors'>
                  {sponsor.name}
                </span>
              )}
            </motion.div>
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
