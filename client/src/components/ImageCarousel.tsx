import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  alt: string;
}

export default function ImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: "Fun Walk Peserta",
      description: "Antusiasme warga Cluster Monterrey",
      alt: "Fun walk participants exercising together"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: "Cluster Monterrey",
      description: "Lingkungan hunian yang asri",
      alt: "Modern residential houses in Cluster Monterrey"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: "Acara Komunitas",
      description: "Kebersamaan warga Citraland",
      alt: "Community members celebrating together"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      title: "Doorprize Menarik",
      description: "Hadiah menanti para pemenang",
      alt: "Prizes and gifts display for winners"
    }
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <Card className="bg-white rounded-2xl shadow-xl">
      <CardContent className="p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          <Images className="inline-block w-6 h-6 text-blue-500 mr-2" />
          Galeri Event
        </h2>
        
        <div className="relative">
          {/* Carousel Container */}
          <div 
            className="relative overflow-hidden rounded-xl shadow-lg"
            style={{ height: "400px" }}
            data-testid="carousel-container"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].alt}
                    className="w-full h-full object-cover"
                    data-testid={`slide-image-${currentSlide}`}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Arrows */}
          <Button
            onClick={prevSlide}
            data-testid="button-prev-slide"
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={nextSlide}
            data-testid="button-next-slide"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              data-testid={`indicator-${index}`}
              variant="ghost"
              size="sm"
              className={`w-3 h-3 rounded-full p-0 transition-colors ${
                index === currentSlide 
                  ? "bg-blue-500" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-2">
          <span className={`text-xs ${isAutoPlaying ? "text-green-500" : "text-gray-400"}`}>
            {isAutoPlaying ? "● Auto-play aktif" : "○ Auto-play dijeda"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
