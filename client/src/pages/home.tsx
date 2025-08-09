import { useState } from "react";
import SpinWheel, { WinnerRecord } from "../components/SpinWheel";
import SponsorGrid from "../components/SponsorGrid";
import WinnersHistory from "../components/WinnersHistory";
import { Trophy, Users, Handshake } from "lucide-react";

export default function Home() {
  const [winners, setWinners] = useState<WinnerRecord[]>([]);

  const handleWinnerChange = (newWinners: WinnerRecord[]) => {
    setWinners(newWinners);
  };

  const clearWinnersHistory = () => {
    setWinners([]);
  };
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="container mx-auto px-4 py-6">
          <h1 className="font-bold text-center leading-tight">
            <div className="text-3xl md:text-5xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
              FUNWALK
            </div>
            <div className="text-2xl md:text-3xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              CLUSTER MONTERREY CITRALAND
            </div>
          </h1>
          <div className="text-center mt-2">
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              <Trophy className="inline-block w-4 h-4 mr-2" />
              Live Draw Event
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Winners History Section */}
        <WinnersHistory 
          winners={winners} 
          onClearHistory={clearWinnersHistory}
        />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          {/* Spin Wheel Section */}
          <div className="space-y-4">
            <SpinWheel onWinnerChange={handleWinnerChange} />
          </div>
          
          {/* Sponsor Grid Section */}
          <SponsorGrid />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2024 Funwalk Cluster Monterrey Citraland. All rights reserved.</p>
          <p className="text-xs text-gray-400 mt-1">Powered by Community Management Team</p>
        </div>
      </footer>
    </div>
  );
}
