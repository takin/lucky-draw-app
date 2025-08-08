import { Handshake } from "lucide-react";
import { motion } from "framer-motion";

interface Sponsor {
  id: number;
  name: string;
  logo?: string;
}

export default function SponsorSection() {
  const sponsors: Sponsor[] = [
    { id: 1, name: "SPONSOR 1" },
    { id: 2, name: "SPONSOR 2" },
    { id: 3, name: "SPONSOR 3" },
    { id: 4, name: "SPONSOR 4" },
    { id: 5, name: "SPONSOR 5" },
    { id: 6, name: "SPONSOR 6" }
  ];

  return (
    <section className="bg-white shadow-lg mt-12" data-testid="sponsor-section">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          <Handshake className="inline-block w-6 h-6 text-blue-500 mr-2" />
          Sponsor & Partner
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-20 hover:shadow-md transition-shadow cursor-pointer group"
              data-testid={`sponsor-${sponsor.id}`}
            >
              {sponsor.logo ? (
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-gray-500 font-semibold text-sm group-hover:text-gray-700 transition-colors">
                  {sponsor.name}
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Terima kasih kepada semua sponsor dan partner yang telah mendukung acara ini
          </p>
        </div>
      </div>
    </section>
  );
}
