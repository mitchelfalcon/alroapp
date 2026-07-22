import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pause, Play, Star, ChevronRight, Plus, X, Command, Sparkles, Check } from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  isPlaying: boolean;
  type: "dot" | "star";
  targetObject?: string;
}

export function VoiceCommandQueue() {
  const [commands, setCommands] = useState<CommandItem[]>([
    {
      id: "1",
      title: "Create Revenue Widget (Opportunities)",
      isPlaying: true,
      type: "dot",
      targetObject: "Opportunities",
    },
    {
      id: "2",
      title: "Map Lead Field to Voice Command",
      isPlaying: false,
      type: "dot",
      targetObject: "Leads",
    },
    {
      id: "3",
      title: "Region Date Filter Command",
      isPlaying: false,
      type: "star",
      targetObject: "Accounts",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCmdTitle, setNewCmdTitle] = useState("");

  const togglePlay = (id: string) => {
    setCommands((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPlaying: !item.isPlaying } : item
      )
    );
  };

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCommands((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, type: item.type === "star" ? "dot" : "star" }
          : item
      )
    );
  };

  const handleAddCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCmdTitle.trim()) return;
    setCommands((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newCmdTitle,
        isPlaying: false,
        type: "dot",
        targetObject: "General",
      },
    ]);
    setNewCmdTitle("");
    setIsAddModalOpen(false);
  };

  return (
    <>
      <motion.div
        className="p-5 rounded-3xl h-full flex flex-col justify-between glass-neo-card relative overflow-hidden group border border-white/90 hover:border-blue-400/80 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(37,99,235,0.18),12px_12px_28px_rgba(165,185,210,0.35),-12px_-12px_28px_rgba(255,255,255,0.98)]"
        whileHover={{ y: -2 }}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 font-sans flex items-center gap-1.5">
              Voice Command Queue
            </h3>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="p-1 rounded-full hover:bg-blue-100/60 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
              title="Add Voice Command"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Pill Items List */}
          <div className="space-y-2.5 mt-2">
            {commands.map((cmd) => (
              <motion.div
                key={cmd.id}
                className="p-2.5 rounded-2xl flex items-center justify-between border transition-all cursor-pointer select-none hover:border-blue-400/60"
                style={{
                  background: cmd.isPlaying ? "rgba(238, 244, 255, 0.95)" : "rgba(243, 247, 252, 0.85)",
                  borderColor: cmd.isPlaying ? "rgba(59, 130, 246, 0.4)" : "rgba(255, 255, 255, 0.9)",
                  boxShadow:
                    "3px 3px 6px rgba(165, 185, 210, 0.2), -2px -2px 6px rgba(255,255,255,0.9)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => togglePlay(cmd.id)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Neumorphic Play/Pause Circle Button */}
                  <button
                    className={`w-7 h-7 rounded-full text-white flex items-center justify-center flex-shrink-0 shadow-sm border border-white/80 cursor-pointer transition-transform ${
                      cmd.isPlaying ? "bg-gradient-to-br from-blue-600 to-indigo-700" : "bg-gradient-to-br from-slate-400 to-slate-600"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(cmd.id);
                    }}
                  >
                    {cmd.isPlaying ? (
                      <Pause className="w-3 h-3 fill-current text-white" />
                    ) : (
                      <Play className="w-3 h-3 fill-current text-white ml-0.5" />
                    )}
                  </button>

                  <span className="text-[11px] font-bold text-slate-800 tracking-tight truncate font-sans">
                    {cmd.title}
                  </span>
                </div>

                {/* End Indicator: Blue Dot or Star Icon */}
                <button
                  onClick={(e) => toggleStar(cmd.id, e)}
                  className="p-1 cursor-pointer hover:scale-125 transition-transform"
                >
                  {cmd.type === "star" ? (
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 flex-shrink-0 ml-1" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0 ml-1 shadow-sm block" />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-3 text-right">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-[10px] font-extrabold text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-auto cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add Voice Automation
          </button>
        </div>
      </motion.div>

      {/* Modal for Adding Command */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="p-6 rounded-3xl glass-neo-card w-full max-w-md relative shadow-2xl border border-white"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-2xl bg-blue-600 text-white shadow-md">
                  <Command className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 font-sans">
                    Voice Command Queue Manager
                  </h3>
                  <p className="text-[10px] font-bold text-slate-500 font-sans">
                    Add new voice macro to Salesforce execution queue
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddCommand} className="space-y-4">
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600 block mb-1">
                    Command Prompt Phrase
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Update Lead Stage to Qualified"
                    value={newCmdTitle}
                    onChange={(e) => setNewCmdTitle(e.target.value)}
                    className="w-full p-3 rounded-2xl glass-neo-inset text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Enqueue Command
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

