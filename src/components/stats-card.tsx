import React, { useState } from "react";
import { motion } from "motion/react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  trend: "up" | "down";
}

export function StatsCard({ title, value, change, icon, trend }: StatsCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-6 rounded-3xl cursor-pointer transition-shadow glass-neo-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          className="p-4 rounded-2xl glass-neo-inset"
          animate={{
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-[#0176D3]"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
        </motion.div>
        <motion.span
          className={`px-3 py-1 rounded-full text-sm glass-neo-inset ${
            trend === "up"
              ? "text-[#2E844A]"
              : "text-[#BA0517]"
          }`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {change}
        </motion.span>
      </div>
      <motion.p
        className="text-[#514F4D] mb-1 text-sm font-semibold"
        animate={{ opacity: isHovered ? 0.7 : 1 }}
      >
        {title}
      </motion.p>
      <motion.p
        className="text-[#080707] text-2xl font-bold"
        animate={{
          scale: isHovered ? 1.05 : 1,
          color: isHovered ? "#0176D3" : "#080707"
        }}
        transition={{ duration: 0.3 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}
