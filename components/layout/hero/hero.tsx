"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero({
  title,
  description,
  links,
  alignment = "start",
}: {
  title: string;
  description: string;
  links: { label: string; href: string }[];
  alignment?: "start" | "center";
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
        className={`${hero ? "opacity-100" : "opacity-0"} h-[calc(100vh-85px)] pb-24 sm:pb-48 mx-auto px-4 font-oswald flex flex-col justify-end items-${alignment} relative z-10 text-white transition-opacity duration-2000 xl:max-w-7xl`}
      >
        <h2 className="text-6xl md:text-8xl mb-8 tracking-wide drop-shadow-lg font-oswald">
          {title}
        </h2>
        <p
          className={`text-2xl md:text-3xl mb-12 font-light tracking-wide max-w-lg drop-shadow-md ${
            alignment === "center" ? "text-center" : "text-left"
          }`}
        >
          {description}
        </p>
        <div className={`flex gap-2 justify-${alignment} sm:flex-row sm:gap-6`}>
          {links.map((link, index) => (
            <Button
              key={index}
              size="lg"
              className={`${index === 0 ? "bg-primary hover:bg-primary/70 text-primary-foreground" : "bg-black/50 hover:bg-secondary/50 text-primary"} rounded-full px-12 py-4 text-lg font-light transition-all duration-300 shadow-lg hover:shadow-xl`}
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
