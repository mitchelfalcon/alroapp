import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoreVertical, Database, X, ChevronRight, Layers, ShieldCheck } from "lucide-react";

export function SalesforceObjectsCard() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    { label: "Opportunities", value: "44%", count: 1420, api: "Opportunity", color: "#f97316" }, // Orange
    { label: "Leads", value: "24%", count: 780, api: "Lead", color: "#22c55e" },         // Green
    { label: "Accounts", value: "18%", count: 590, api: "Account", color: "#06b6d4" },      // Cyan
    { label: "Contacts", value: "18%", count: 580, api: "Contact", color: "#3b82f6" },      // Blue
  ];

  return (
    <>
      <motion.div
        className="p-5 rounded-3xl glass-neo-card relative overflow-hidden h-full flex flex-col justify-between group border border-white/90 hover:border-blue-400/80 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(37,99,235,0.18),12px_12px_28px_rgba(165,185,210,0.35),-12px_-12px_28px_rgba(255,255,255,0.98)] cursor-pointer"
        whileHover={{ y: -2 }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-sans">
            Salesforce Objects Used
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="p-1 rounded-full hover:bg-slate-200/50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 my-2">
          {/* Multi-colored Donut Chart SVG */}
          <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              {/* Background ring */}
              <path
                className="text-slate-200/50"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Orange Segment - Opportunities (44%) */}
              <path
                stroke="#f97316"
                strokeWidth={activeItem === "Opportunities" ? "6" : "4.5"}
                strokeDasharray="44, 100"
                strokeDashoffset="0"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                className="transition-all duration-200"
              />
              {/* Green Segment - Leads (24%) */}
              <path
                stroke="#22c55e"
                strokeWidth={activeItem === "Leads" ? "6" : "4.5"}
                strokeDasharray="24, 100"
                strokeDashoffset="-44"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                className="transition-all duration-200"
              />
              {/* Cyan Segment - Accounts (18%) */}
              <path
                stroke="#06b6d4"
                strokeWidth={activeItem === "Accounts" ? "6" : "4.5"}
                strokeDasharray="18, 100"
                strokeDashoffset="-68"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                className="transition-all duration-200"
              />
              {/* Blue Segment - Contacts (18%) */}
              <path
                stroke="#3b82f6"
                strokeWidth={activeItem === "Contacts" ? "6" : "4.5"}
                strokeDasharray="18, 100"
                strokeDashoffset="-86"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                className="transition-all duration-200"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Database className="w-5 h-5 text-blue-600/70" />
            </div>
          </div>

          {/* Legend List */}
          <div className="flex-1 space-y-1.5 min-w-0">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between text-xs font-semibold p-1 rounded-xl transition-all ${
                  activeItem === item.label ? "bg-white/90 shadow-sm border border-slate-200" : ""
                }`}
                onMouseEnter={() => setActiveItem(item.label)}
                onMouseLeave={() => setActiveItem(null)}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm"
                    style={{ background: item.color }}
                  />
                  <span className="text-slate-700 font-sans text-[11px] font-bold truncate">
                    {item.label}
                  </span>
                </div>
                <span className="font-sans font-black text-slate-900 text-[11px] ml-1 font-mono">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Inspector Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="p-6 rounded-3xl glass-neo-card w-full max-w-md relative shadow-2xl border border-white"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-2xl bg-blue-600 text-white shadow-md">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 font-sans">
                    Salesforce Schema Objects
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 font-sans">
                    Live mapped CRM objects & voice execution bindings
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 mb-5">
                {items.map((it) => (
                  <div
                    key={it.label}
                    className="p-3 rounded-2xl glass-neo-inset flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full shadow-sm" style={{ background: it.color }} />
                      <div>
                        <span className="text-xs font-black text-slate-800 block">{it.label}</span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">API: {it.api}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-black text-slate-800 block">{it.count} records</span>
                      <span className="text-[9px] font-extrabold text-emerald-600 block">Active Sync</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
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

