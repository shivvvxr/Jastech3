"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LiquidButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function LiquidButton({ children, className, onClick }: LiquidButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative px-12 py-6 text-2xl font-semibold text-[#0d1b2a] overflow-hidden rounded-2xl",
        "backdrop-blur-xl bg-white/30 border-2 border-[#b4dcff]",
        "shadow-[0_8px_32px_0_rgba(180,220,255,0.37)]",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#a2e3ff] via-[#6ad0ff] to-[#a2e3ff]"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ opacity: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
