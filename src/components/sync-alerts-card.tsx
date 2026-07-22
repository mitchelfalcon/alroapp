import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Bell, Check, X } from "lucide-react";

export function SyncAlertsCard() {
  const [alerts, setAlerts] = useState([
    {
      id: "1",
      time: "09:30 AM",
      title: "Check test results",
      level: "Low",
      color: "emerald",
    },
    {
      id: "2",
      time: "10:00 AM",
      title: "Client Presentation",
      level: "High",
      color: "rose",
    },
    {
      id: "3",
      time: "04:15 PM",
      title: "Add new subtask to Doctor+ analysis",
      level: "High",
      color: "rose",
    },
  ]);

  const [isManageOpen, setIsManageOpen] = useState(false);

  return (
    <motion.div
      className="p-5 rounded-3xl glass-neo-card relative overflow-hidden h-full flex flex-col justify-between group border border-white/90 hover:border-blue-400/80 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(37,99,235,0.18),12px_12px_28px_rgba(165,185,210,0.35),-12px_-12px_28px_rgba(255,255,255,0.98)]"
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-sans">
          Data Sync Alerts
        </h3>
        <button
          onClick={() => setIsManageOpen(true)}
          className="text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5 transition-colors cursor-pointer"
        >
          Manage <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* 3 Alerts List */}
      <div className="space-y-2.5">
        {alerts.map((al) => (
          <motion.div
            key={al.id}
            onClick={() => setIsManageOpen(true)}
            className="p-3 rounded-2xl flex items-center justify-between border cursor-pointer hover:border-blue-400/60 transition-all"
            style={{
              background: "rgba(243, 247, 252, 0.85)",
              borderColor: "rgba(255, 255, 255, 0.9)",
              boxShadow:
                "inset 1.5px 1.5px 3px rgba(165, 185, 210, 0.15), inset -1.5px -1.5px 3px rgba(255,255,255,0.8)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-[11px] font-extrabold text-slate-900 tracking-tight font-sans">
                {al.time}
              </span>
              <span className="text-[10px] text-slate-500 font-medium font-sans truncate mt-0.5">
                {al.title}
              </span>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-[10px] font-bold text-slate-600 font-sans">
                {al.level}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  al.color === "emerald" ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Manage Modal */}
      <AnimatePresence>
        {isManageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="p-6 rounded-3xl glass-neo-card w-full max-w-sm relative"
            >
              <button
                onClick={() => setIsManageOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-800">Manage Data Sync Alerts</h3>
              </div>

              <p className="text-xs text-slate-500 mb-4">
                Configure real-time notifications for Salesforce data synchronization.
              </p>

              <div className="space-y-2 mb-5">
                {alerts.map((al) => (
                  <div
                    key={al.id}
                    className="p-2.5 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-between"
                  >
                    <span className="text-xs font-semibold text-slate-700">{al.title}</span>
                    <button
                      onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== al.id))}
                      className="text-[10px] text-rose-600 font-bold hover:underline"
                    >
                      Dismiss
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setIsManageOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
