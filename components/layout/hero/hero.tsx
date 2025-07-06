"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: { label: string; href: string }[];
}) {
  const [hero, setHero] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setHero(true);
    }, 3000);
  }, []);

  return (
    <>
      <div
        className={`${hero ? "opacity-100" : "opacity-0"} h-[calc(100vh-85px)] font-bonanova-sc flex flex-col justify-center items-center relative z-10 text-center text-white max-w-6xl mx-auto px-4 transition-opacity duration-2000`}
      >
        <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-wide text-primary/75 drop-shadow-lg">
          {title}
        </h2>
        <p className="text-2xl md:text-3xl mb-12 font-light tracking-wide max-w-2xl text-primary/80 drop-shadow-md">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {links.map((link, index) => (
            <Button
              key={index}
              size="lg"
              className={`${index === 0 ? "bg-primary hover:bg-primary/70 text-primary-foreground" : "bg-secondary hover:bg-secondary/70 text-secondary-foreground"} px-12 py-4 text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl`}
              onClick={() => {
                router.push(`${link.href}#top`);
              }}
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
