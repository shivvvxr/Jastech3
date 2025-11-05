"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
}: GooeyTextProps) {
  const [textIndex, setTextIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      // Fade out with blur
      await controls.start({
        opacity: 0,
        filter: "blur(10px)",
        transition: { 
          duration: morphTime / 2,
          ease: "easeInOut"
        },
      });

      // Change text while invisible
      setTextIndex((prev) => (prev + 1) % texts.length);

      // Fade in with blur clearing
      await controls.start({
        opacity: 1,
        filter: "blur(0px)",
        transition: { 
          duration: morphTime / 2,
          ease: "easeInOut"
        },
      });

      await new Promise((resolve) => setTimeout(resolve, cooldownTime * 1000));
    };

    const interval = setInterval(animate, (morphTime + cooldownTime) * 1000);
    return () => clearInterval(interval);
  }, [texts.length, morphTime, cooldownTime, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 1, filter: "blur(0px)" }}
      className={cn("text-6xl md:text-8xl font-bold", className)}
    >
      {texts[textIndex]}
    </motion.div>
  );
}