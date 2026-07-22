import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pause, Play, ChevronRight, Volume2, Sparkles, X, Users, Mic, Clock, Settings2 } from "lucide-react";

interface VoiceCreationSessionCardProps {
  isListening?: boolean;
  onToggleListening?: () => void;
}

export function VoiceCreationSessionCard({
  isListening = false,
  onToggleListening,
}: VoiceCreationSessionCardProps) {
  const [seconds, setSeconds] = useState(922); // 00:15:22
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [gain, setGain] = useState(85);

  useEffect(() => {
    let interval: any = null;
    if (isListening) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCardClick = () => {
    if (onToggleListening) {
      onToggleListening();
    } else {
      setIsDetailsOpen(true);
    }
  };

  return (
    <>
      <motion.div
        className={`p-5 rounded-3xl h-full flex flex-col justify-between glass-neo-card relative overflow-hidden group border cursor-pointer transition-all duration-300 ${
          isListening
            ? "border-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.25),12px_12px_28px_rgba(165,185,210,0.35)] bg-gradient-to-br from-blue-50/40 via-white/80 to-indigo-50/30"
            : "border-white/90 hover:border-blue-400/80 hover:shadow-[0_10px_30px_rgba(37,99,235,0.18),12px_12px_28px_rgba(165,185,210,0.35),-12px_-12px_28px_rgba(255,255,255,0.98)]"
        }`}
        whileHover={{ y: -2 }}
        onClick={handleCardClick}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-sans flex items-center gap-2">
              Voice Session (Director)
            </h3>
            {isListening && (
              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[8px] font-black uppercase tracking-wider animate-pulse">
                Escuchando
              </span>
            )}
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
        </div>

        {/* Center Voice Orb Visual */}
        <div className="my-2 flex items-center justify-center gap-3 relative">
          {/* Left Waveform Bars */}
          <div className="flex items-center gap-0.5">
            {[12, 18, 8, 24, 16, 28, 10, 20].map((h, i) => (
              <motion.div
                key={`left-${i}`}
                className={`w-1 rounded-full ${isListening ? "bg-blue-600" : "bg-slate-300"}`}
                animate={{
                  height: isListening ? [h, h * 1.6, h * 0.5, h] : h * 0.3,
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
              />
            ))}
          </div>

          {/* Central Concentric Glass Orb */}
          <div className="relative flex items-center justify-center">
            {/* Outer Pulsing Aura */}
            <motion.div
              className={`absolute -inset-3 rounded-full blur-md pointer-events-none ${
                isListening ? "bg-blue-500/40" : "bg-blue-400/10"
              }`}
              animate={{
                scale: isListening ? [1, 1.3, 1] : 1,
                opacity: isListening ? [0.5, 0.9, 0.5] : 0.2,
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Concentric Ring 1 */}
            <div className="w-16 h-16 rounded-full border border-blue-400/50 flex items-center justify-center relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),0_6px_16px_rgba(37,99,235,0.25)] bg-gradient-to-br from-white/95 to-blue-50/90">
              {/* Concentric Ring 2 */}
              <div className="w-12 h-12 rounded-full border border-blue-300/70 flex items-center justify-center bg-white/90 shadow-inner">
                {/* Play / Pause Toggle Button */}
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleListening) {
                      onToggleListening();
                    }
                  }}
                  className={`w-9 h-9 rounded-full text-white flex items-center justify-center shadow-md border border-white/80 cursor-pointer ${
                    isListening
                      ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800"
                      : "bg-slate-700 hover:bg-slate-800"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isListening ? (
                    <Pause className="w-4 h-4 fill-current text-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-current text-white ml-0.5" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Waveform Bars */}
          <div className="flex items-center gap-0.5">
            {[20, 10, 28, 16, 24, 8, 18, 12].map((h, i) => (
              <motion.div
                key={`right-${i}`}
                className={`w-1 rounded-full ${isListening ? "bg-blue-600" : "bg-slate-300"}`}
                animate={{
                  height: isListening ? [h, h * 0.5, h * 1.6, h] : h * 0.3,
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
              />
            ))}
          </div>
        </div>

        {/* User Avatars Row matching Image 1 */}
        <div className="flex items-center justify-center gap-3 my-1">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-600 border-2 border-white text-white text-[8px] font-black flex items-center justify-center shadow-sm">
              EA
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-400 to-pink-600 border-2 border-white text-white text-[8px] font-black flex items-center justify-center shadow-sm">
              AR
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-600 font-sans">
            {isListening ? "Escuchando Director Live" : "2 Voice Engineers Standby"}
          </span>
        </div>

        {/* Bottom Session Pills */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="p-2 rounded-2xl glass-neo-inset flex flex-col items-center justify-center text-center">
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 font-sans">
              Active Session
            </span>
            <span className="text-xs font-mono font-black text-blue-900 tracking-tight mt-0.5">
              {formatTime(seconds)}
            </span>
          </div>

          <div className="p-2 rounded-2xl glass-neo-inset flex flex-col items-center justify-center text-center">
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 font-sans">
              Estado Voz
            </span>
            <span className={`text-xs font-mono font-black tracking-tight mt-0.5 ${isListening ? "text-emerald-600" : "text-slate-500"}`}>
              {isListening ? "ACTIVE" : "STANDBY"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Interactive Details Modal */}
      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setIsDetailsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="p-6 rounded-3xl glass-neo-card w-full max-w-md relative shadow-2xl border border-white"
            >
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-2xl bg-blue-600 text-white shadow-md">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 font-sans">
                    Current Voice Creation Session
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 font-sans">
                    Real-time AI Voice Synthesizer & CRM Mapping
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-5">
                <div className="p-3 rounded-2xl glass-neo-inset flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-700">Audio Stream Gain</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gain}
                    onChange={(e) => setGain(Number(e.target.value))}
                    className="w-32 accent-blue-600 cursor-pointer"
                  />
                  <span className="text-xs font-mono font-black text-blue-900">{gain}%</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-white/80 border border-slate-200">
                    <span className="text-[9px] font-extrabold text-slate-400 block uppercase">Sampling Rate</span>
                    <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">48.0 kHz 24-bit</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/80 border border-slate-200">
                    <span className="text-[9px] font-extrabold text-slate-400 block uppercase">Latency</span>
                    <span className="text-xs font-extrabold text-emerald-600 mt-0.5 block">12ms (Ultra Low)</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    if (onToggleListening) onToggleListening();
                    setIsDetailsOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer"
                >
                  {isListening ? "Pause Stream" : "Resume Stream"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

