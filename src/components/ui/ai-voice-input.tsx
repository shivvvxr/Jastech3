"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AIVoiceInputProps {
  onStart?: () => void;
  onStop?: () => void;
  className?: string;
}

export function AIVoiceInput({ onStart, onStop, className }: AIVoiceInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startAudioAnalysis = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);

      const updateLevel = () => {
        if (analyserRef.current) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average / 255);
          animationFrameRef.current = requestAnimationFrame(updateLevel);
        }
      };

      updateLevel();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopAudioAnalysis = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setAudioLevel(0);
  };

  const handleToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      stopAudioAnalysis();
      onStop?.();
    } else {
      setIsRecording(true);
      startAudioAnalysis();
      onStart?.();
    }
  };

  return (
    <div className={cn("relative flex items-center justify-center w-64 h-64", className)}>
      {/* Outer pulsing rings */}
      {isRecording && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border-4 border-[#6ad0ff]"
              style={{
                width: `${160 + i * 40}px`,
                height: `${160 + i * 40}px`,
              }}
              animate={{
                scale: [1, 1.2 + audioLevel * 0.3, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}
      
      {/* Visualizer bars with real audio levels */}
      {isRecording && (
        <div className="absolute w-full h-full flex items-center justify-center">
          {[...Array(12)].map((_, i) => {
            const angle = (i * 360) / 12;
            const radius = 80;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 bg-gradient-to-t from-[#6ad0ff] to-[#a2e3ff] rounded-full origin-bottom"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `rotate(${angle}deg)`,
                }}
                animate={{
                  height: [`${20 + audioLevel * 30}px`, `${30 + audioLevel * 50}px`, `${20 + audioLevel * 30}px`],
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.03,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Center button */}
      <Button
        onClick={handleToggle}
        size="lg"
        className={cn(
          "relative z-10 w-32 h-32 rounded-full transition-all duration-300 shadow-2xl",
          isRecording
            ? "bg-red-500 hover:bg-red-600 animate-pulse"
            : "bg-gradient-to-br from-[#a2e3ff] to-[#6ad0ff] hover:from-[#6ad0ff] hover:to-[#a2e3ff]"
        )}
      >
        {isRecording ? (
          <Square className="w-12 h-12 text-white" />
        ) : (
          <Mic className="w-12 h-12 text-[#0d1b2a]" />
        )}
      </Button>
    </div>
  );
}