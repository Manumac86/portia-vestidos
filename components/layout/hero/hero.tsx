"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Hero() {
  const [hero, setHero] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHero(true);
    }, 3000);
  }, []);

  return (
    <>
      <div
        className={`${hero ? "opacity-100" : "opacity-0"} h-[95vh] font-bonanova-sc flex flex-col justify-center items-center relative z-10 text-center text-rose-200 max-w-6xl mx-auto px-4 transition-opacity duration-2000`}
      >
        <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-wide">
          Vestidos de Ensueño
        </h2>
        <p className="text-2xl md:text-3xl mb-12 font-light tracking-wide max-w-2xl">
          En el corazón de la Patagonia, donde las montañas abrazan tus sueños
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button
            size="lg"
            className="bg-rose-200 hover:bg-rose-300 text-primary-800 px-12 py-4 text-lg font-medium hover:text-gray-800"
          >
            Ver Colección
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-rose-200 text-primary-200 hover:bg-rose-200 hover:text-gray-800 px-12 py-4 text-lg font-medium bg-transparent"
          >
            Agendar Cita
          </Button>
        </div>
      </div>
    </>
  );
}
