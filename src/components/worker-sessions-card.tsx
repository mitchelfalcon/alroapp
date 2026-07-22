import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Calendar, Plus, Users, X } from "lucide-react";

export function WorkerSessionsCard() {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduledMsg, setScheduledMsg] = useState("");

  return (
    <motion.div
      className="p-5 rounded-3xl h-full flex flex-col justify-between glass-neo-card relative overflow-hidden group border border-white/90 hover:border-blue-400/80 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(37,99,235,0.18),12px_12px_28px_rgba(165,185,210,0.35),-12px_-12px_28px_rgba(255,255,255,0.98)]"
      whileHover={{ y: -2 }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-sans flex items-center gap-1.5">
            Voice CRM Sync Sessions
          </h3>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all cursor-pointer" />
        </div>

        {/* Top 2 Status Pills */}
        <div className="space-y-2 mt-1">
          <motion.div
            className="p-2.5 rounded-2xl flex items-center gap-2.5 border cursor-pointer select-none"
            style={{
              background: "rgba(243, 247, 252, 0.85)",
              borderColor: "rgba(255, 255, 255, 0.9)",
              boxShadow:
                "3px 3px 6px rgba(165, 185, 210, 0.18), -2px -2px 6px rgba(255,255,255,0.9)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glossy Green Sphere */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm border border-white/60 flex-shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 tracking-tight font-sans">
              API Integration Review
            </span>
          </motion.div>

          <motion.div
            className="p-2.5 rounded-2xl flex items-center gap-2.5 border cursor-pointer select-none"
            style={{
              background: "rgba(243, 247, 252, 0.85)",
              borderColor: "rgba(255, 255, 255, 0.9)",
              boxShadow:
                "3px 3px 6px rgba(165, 185, 210, 0.18), -2px -2px 6px rgba(255,255,255,0.9)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glossy Purple Sphere */}
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-sm border border-white/60 flex-shrink-0" />
            <span className="text-[11px] font-bold text-slate-800 tracking-tight font-sans">
              UI Flow for Opps
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom 2 Pill Cards */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        {/* Teams Pill */}
        <div
          className="p-2 rounded-2xl flex flex-col items-center justify-center text-center border"
          style={{
            background: "rgba(243, 247, 252, 0.85)",
            borderColor: "rgba(255, 255, 255, 0.9)",
            boxShadow:
              "inset 1.5px 1.5px 3px rgba(165, 185, 210, 0.15), inset -1.5px -1.5px 3px rgba(255,255,255,0.8)",
          }}
        >
          {/* Stacked avatars */}
          <div className="flex -space-x-1.5 mb-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 text-white text-[7px] font-bold flex items-center justify-center border border-white">
              SM
            </div>
            <div className="w-4 h-4 rounded-full bg-cyan-500 text-white text-[7px] font-bold flex items-center justify-center border border-white">
              CO
            </div>
          </div>
          <span className="text-[9px] font-bold text-slate-600 tracking-tight font-sans">
            Dttniavor teams
          </span>
        </div>

        {/* Schedule Voice Session Button Pill */}
        <motion.button
          onClick={() => setIsScheduleOpen(true)}
          className="p-2 rounded-2xl flex flex-col items-center justify-center text-center border cursor-pointer select-none"
          style={{
            background: "rgba(243, 247, 252, 0.9)",
            borderColor: "rgba(255, 255, 255, 0.95)",
            boxShadow:
              "3px 3px 6px rgba(165, 185, 210, 0.25), -2px -2px 6px rgba(255,255,255,0.9)",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          {/* Concentric Circle Icon */}
          <div className="w-5 h-5 rounded-full border border-blue-400 flex items-center justify-center bg-blue-50 text-blue-600 text-[8px] font-bold mb-1 shadow-inner">
            L
          </div>
          <span className="text-[9px] font-extrabold text-blue-800 tracking-tight leading-tight font-sans">
            Schedule Voice Session
          </span>
        </motion.button>
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 10 }}
              className="p-6 rounded-3xl glass-neo-card w-full max-w-md relative"
            >
              <button
                onClick={() => setIsScheduleOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800">
                  Schedule Voice CRM Session
                </h3>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                Set up an automated voice interaction session for Salesforce CRM sync.
              </p>

              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Session Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Revenue Opportunities Voice Audit"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white/80 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                    Scheduled Time
                  </label>
                  <input
                    type="datetime-local"
                    defaultValue="2026-07-22T14:30"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white/80 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {scheduledMsg && (
                <div className="mb-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold text-center">
                  {scheduledMsg}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsScheduleOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setScheduledMsg("Session scheduled successfully!");
                    setTimeout(() => {
                      setScheduledMsg("");
                      setIsScheduleOpen(false);
                    }, 1200);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md"
                >
                  Confirm Schedule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
