import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreVertical, BarChart2, TrendingUp, X, Activity } from "lucide-react";

export function VoiceMetricsCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const daysData = [
    { day: "Mon", heightPercent: 70, count: 142, growth: "+12%" },
    { day: "Tue", heightPercent: 45, count: 98, growth: "-4%" },
    { day: "Wed", heightPercent: 85, count: 184, growth: "+28%" },
    { day: "Thu", heightPercent: 60, count: 120, growth: "+8%" },
    { day: "Fri", heightPercent: 75, count: 165, growth: "+18%" },
  ];

  return (
    <>
      <motion.div
        className="p-5 rounded-3xl glass-neo-card relative overflow-hidden h-full flex flex-col justify-between group border border-white/90 hover:border-blue-400/80 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(37,99,235,0.18),12px_12px_28px_rgba(165,185,210,0.35),-12px_-12px_28px_rgba(255,255,255,0.98)] cursor-pointer"
        whileHover={{ y: -2 }}
        onClick={() => setIsAnalyticsOpen(true)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-sans flex items-center gap-1.5">
            Voice Interaction Metrics
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAnalyticsOpen(true);
            }}
            className="p-1 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Glass 3D Bar Charts */}
        <div className="flex items-end justify-between gap-2 h-36 px-2 my-2 relative">
          {daysData.map((d, i) => (
            <div
              key={d.day}
              className="flex-1 flex flex-col items-center h-full justify-end relative group/bar cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute -top-10 z-20 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[9px] font-black font-sans shadow-lg whitespace-nowrap pointer-events-none"
                  >
                    {d.day}: {d.count} req ({d.growth})
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3D Glass Pill Column */}
              <div className="w-full max-w-[28px] h-28 bg-slate-200/40 rounded-full p-1 flex flex-col justify-end relative shadow-inner border border-white/60 group-hover/bar:border-blue-400/80 transition-colors">
                <motion.div
                  className="w-full rounded-full bg-gradient-to-t from-blue-700 via-blue-500 to-blue-400 relative shadow-md"
                  initial={{ height: "0%" }}
                  animate={{ height: `${d.heightPercent}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                >
                  {/* Glass top cap highlight */}
                  <div className="w-full h-2 rounded-t-full bg-white/50 backdrop-blur-sm" />
                </motion.div>
              </div>

              {/* Day Label */}
              <span className="text-[10px] font-bold text-slate-500 font-sans mt-2 group-hover/bar:text-blue-600 transition-colors">
                {d.day}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Modal */}
      <AnimatePresence>
        {isAnalyticsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setIsAnalyticsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="p-6 rounded-3xl glass-neo-card w-full max-w-lg relative shadow-2xl border border-white"
            >
              <button
                onClick={() => setIsAnalyticsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-2xl bg-blue-600 text-white shadow-md">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 font-sans">
                    Voice Interactions Analytics
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 font-sans">
                    Weekly Voice Traffic Breakdown & Acoustic NLP Telemetry
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-2xl glass-neo-inset text-center">
                  <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Total Queries</span>
                  <span className="text-base font-black text-slate-900 font-mono mt-0.5 block">709</span>
                </div>
                <div className="p-3 rounded-2xl glass-neo-inset text-center">
                  <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Success Rate</span>
                  <span className="text-base font-black text-emerald-600 font-mono mt-0.5 block">99.4%</span>
                </div>
                <div className="p-3 rounded-2xl glass-neo-inset text-center">
                  <span className="text-[9px] font-extrabold uppercase text-slate-400 block">Avg Response</span>
                  <span className="text-base font-black text-blue-600 font-mono mt-0.5 block">140ms</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsAnalyticsOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

