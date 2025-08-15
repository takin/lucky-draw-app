import { useEffect, useState } from 'react';
import SpinWheel, { WinnerRecord } from '../components/SpinWheel';
import SponsorGrid from '../components/SponsorGrid';
import WinnersHistory from '../components/WinnersHistory';
import { Trophy, Users, Handshake } from 'lucide-react';

export default function Home() {
  useEffect(() => {
    const fetchWinners = async () => {
      const winners = window.localStorage.getItem('winners');
      if (winners) {
        console.log(JSON.parse(winners));
        setWinners(JSON.parse(winners));
      }
    };
    // fetchWinners();
  }, []);

  const [winners, setWinners] = useState<WinnerRecord[]>([]);

  const handleWinnerChange = (newWinners: WinnerRecord[]) => {
    // window.localStorage.setItem('winners', JSON.stringify(newWinners));
    console.log(newWinners);
    setWinners(newWinners);
  };

  const clearWinnersHistory = () => {
    setWinners([]);
  };
  return (
    <div className='min-h-screen p-0 m-0'>
      {/* Header */}
      <header className='bg-white shadow-lg border-b-4 border-blue-500 h-[180px]'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='font-bold text-center leading-tight'>
            <div className='text-3xl md:text-5xl text-blue-600 mb-2'>FUNWALK</div>
            <div className='text-2xl md:text-3xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'>
              CLUSTER MONTERREY CITRALAND
            </div>
          </h1>
          <div className='text-center mt-2'>
            <span className='inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold'>
              <Trophy className='inline-block w-4 h-4 mr-2' />
              Live Draw Event
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6 xl:h-[calc(100vh-180px)]'>
        <div className='flex flex-col gap-4 h-full xl:grid-cols-2'>
          <div className='flex h-[40%] w-full'>
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 items-start mb-4 h-full w-full'>
              {/* Spin Wheel Section */}
              <SpinWheel onWinnerChange={handleWinnerChange} />
              {/* Winners History Section */}
              <WinnersHistory winners={winners} onClearHistory={clearWinnersHistory} />
            </div>
          </div>
          <div className='flex h-[60%]'>
            <div className='grid grid-cols-1 items-center h-full w-full'>
              {/* Sponsor Grid Section */}
              <SponsorGrid />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
