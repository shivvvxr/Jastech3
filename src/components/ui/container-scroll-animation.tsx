"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scaleDimensions = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div
      className="flex items-center justify-center relative"
      ref={containerRef}
    >
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <Header translate={scrollYProgress} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scaleDimensions} opacity={opacity}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center mb-12"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  opacity,
  children,
}: {
  rotate: any;
  scale: any;
  opacity: any;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        opacity,
      }}
      className="max-w-6xl mx-auto w-full border-4 border-[#b4dcff] rounded-[30px] shadow-2xl overflow-hidden"
    >
      <div className="bg-gradient-to-br from-[#a2e3ff] to-[#eaf7ff] p-2 md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
