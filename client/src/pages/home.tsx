import SpinWheel from "../components/SpinWheel";
import ImageCarousel from "../components/ImageCarousel";
import SponsorSection from "../components/SponsorSection";
import { Trophy, Users, Images, Handshake } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-gray-800 leading-tight">
            <span className="text-blue-600">UNDIAN DOORPRIZE</span><br />
            <span className="text-gray-700">FUNWALK CLUSTER MONTERREY CITRALAND</span>
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
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* Spin Wheel Section */}
          <div className="space-y-6">
            <SpinWheel />
          </div>
          
          {/* Image Carousel Section */}
          <ImageCarousel />
        </div>
      </main>

      {/* Sponsor Section */}
      <SponsorSection />

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
