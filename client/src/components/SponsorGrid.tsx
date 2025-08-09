import { Card, CardContent } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import { motion } from "framer-motion";

interface Sponsor {
  id: number;
  name: string;
  logo?: string;
}

export default function SponsorGrid() {
  const sponsors: Sponsor[] = [
    { id: 1, name: "SPONSOR 1" },
    { id: 2, name: "SPONSOR 2" },
    { id: 3, name: "SPONSOR 3" },
    { id: 4, name: "SPONSOR 4" },
    { id: 5, name: "SPONSOR 5" },
    { id: 6, name: "SPONSOR 6" },
    { id: 7, name: "SPONSOR 7" },
    { id: 8, name: "SPONSOR 8" },
    { id: 9, name: "SPONSOR 9" },
    { id: 10, name: "SPONSOR 10" },
    { id: 11, name: "SPONSOR 11" },
    { id: 12, name: "SPONSOR 12" }
  ];

  return (
    <Card className="bg-white rounded-2xl shadow-xl">
      <CardContent className="p-4 lg:p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          <Handshake className="inline-block w-6 h-6 text-blue-500 mr-2" />
          Sponsor & Partner
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="sponsor-grid">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-gray-50 rounded-xl p-4 flex items-center justify-center h-24 hover:shadow-md hover:bg-gray-100 transition-all cursor-pointer group border border-gray-200"
              data-testid={`sponsor-${sponsor.id}`}
            >
              {sponsor.logo ? (
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-gray-500 font-semibold text-sm text-center group-hover:text-gray-700 transition-colors">
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
      </CardContent>
    </Card>
  );
}