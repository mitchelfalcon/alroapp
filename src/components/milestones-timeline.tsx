import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Clock, Mic, Send, Sparkles, Plus, Check, X, Calendar, User, MicOff } from "lucide-react";

interface MilestoneCard {
  id: string;
  day: string;
  status: "Done" | "Medium" | "High" | "Low";
  statusColor: string;
  title: string;
  desc?: string;
  time?: string;
  comments?: string;
  avatars?: string[];
}

interface MilestonesTimelineProps {
  isListening?: boolean;
  onToggleListening?: () => void;
}

const DIRECTOR_VOICE_PHRASES = [
  "Director: \"Revisando métricas de voz y asignando metas semanales en Salesforce...\"",
  "Director: \"Ajustando flujo de trabajo del equipo e integrando API de voz en tiempo real...\"",
  "Director: \"Validando hitos de creación de contenido e inteligencia conversacional...\"",
  "Director: \"Sincronizando sesiones de equipo y reasignando prioridades de ejecución...\""
];

export function MilestonesTimeline({
  isListening = false,
  onToggleListening,
}: MilestonesTimelineProps) {
  const [activeTab, setActiveTab] = useState<"Today" | "Week" | "Month" | "Year">("Week");
  const [voiceInput, setVoiceInput] = useState("");
  const [submittedCommands, setSubmittedCommands] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<MilestoneCard | null>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const tabs: ("Today" | "Week" | "Month" | "Year")[] = ["Today", "Week", "Month", "Year"];

  // Real-time typewriter effect capturing Director's voice when listening
  useEffect(() => {
    if (!isListening) {
      setVoiceInput("");
      return;
    }

    let charIndex = 0;
    const targetPhrase = DIRECTOR_VOICE_PHRASES[phraseIndex % DIRECTOR_VOICE_PHRASES.length];
    setVoiceInput("");

    const typingInterval = setInterval(() => {
      if (charIndex < targetPhrase.length) {
        setVoiceInput(targetPhrase.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        // Wait 3s after finishing phrase then cycle to next phrase
        const timeout = setTimeout(() => {
          setPhraseIndex((prev) => prev + 1);
        }, 3200);
        return () => clearTimeout(timeout);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [isListening, phraseIndex]);

  const handleCommandSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!voiceInput.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setSubmittedCommands((prev) => [voiceInput, ...prev]);
      setIsSubmitting(false);
      setVoiceInput("");
    }, 600);
  };

  const handleCardClick = (card: MilestoneCard) => {
    setSelectedMilestone(card);
  };

  return (
    <>
      <div className="p-6 rounded-3xl relative overflow-hidden flex flex-col h-full glass-neo-card border border-white/90">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 font-sans flex items-center gap-2">
            Creation Milestones Timeline
          </h2>

          {/* Tab Buttons Pill */}
          <div className="flex items-center gap-1 p-1 rounded-full glass-neo-inset border border-white/80 self-start sm:self-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-slate-900 shadow-sm border border-slate-200/80"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-12 gap-3 flex-1 min-h-[460px] relative pb-16">
          {/* Left Time Axis (col-span-2) */}
          <div className="col-span-2 flex flex-col justify-between pt-10 pb-4 text-[10px] font-mono font-extrabold text-slate-400">
            <div className="flex items-center gap-1">
              <span>09:00</span>
            </div>
            <div className="flex items-center gap-1">
              <span>10:20</span>
            </div>
            <div className="flex items-center gap-1">
              <span>10:20</span>
            </div>
            <div className="flex items-center gap-1">
              <span>09:00</span>
            </div>
            <div className="flex items-center gap-1">
              <span>07:00</span>
            </div>
          </div>

          {/* 5 Day Columns (col-span-10 split into 5 equal cols) */}
          <div className="col-span-10 grid grid-cols-5 gap-2.5">
            {/* MON 18 */}
            <div className="flex flex-col h-full">
              <div className="p-1.5 rounded-2xl glass-neo-inset text-center mb-2">
                <span className="text-[9px] font-extrabold text-slate-400 font-sans block uppercase">MON</span>
                <span className="text-xs font-black text-slate-800 font-sans">18</span>
              </div>

              <div className="space-y-2 flex-1">
                {/* Card 1 */}
                <motion.div
                  onClick={() =>
                    handleCardClick({
                      id: "m1",
                      day: "MON 18",
                      status: "Done",
                      statusColor: "emerald",
                      title: "Voice API Integration Check",
                      desc: "Review project goals and acoustic feedback loops with backend CRM",
                      time: "0th 53m",
                      comments: "1M",
                      avatars: ["13", "83"],
                    })
                  }
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-blue-400/80 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[8px] font-extrabold text-emerald-600 uppercase font-sans">Done</span>
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight font-sans">
                    Voice API Integration Check
                  </h4>
                  <p className="text-[9px] text-slate-500 font-medium font-sans mt-0.5 line-clamp-2">
                    Review project goals and...
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                    <div className="flex -space-x-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[6px] font-bold flex items-center justify-center border border-white">
                        13
                      </div>
                      <div className="w-3.5 h-3.5 rounded-full bg-cyan-500 text-white text-[6px] font-bold flex items-center justify-center border border-white">
                        83
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[8px] font-mono text-slate-400">
                      <span>⏱ 0th 53m</span>
                      <span>💬 1M</span>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  onClick={() =>
                    handleCardClick({
                      id: "m2",
                      day: "MON 18",
                      status: "Done",
                      statusColor: "emerald",
                      title: "Moodboard Creation",
                      desc: "Define the visual direction and neumorphic layout hierarchy",
                    })
                  }
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-blue-400/80 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[8px] font-extrabold text-emerald-600 uppercase font-sans">Done</span>
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight font-sans">
                    Moodboard Creation
                  </h4>
                  <p className="text-[9px] text-slate-500 font-medium font-sans mt-0.5">
                    Define the visual direction
                  </p>
                </motion.div>

                {/* Brake time bar */}
                <div className="p-1.5 rounded-xl glass-neo-inset text-center text-[8px] font-extrabold text-slate-500 font-sans">
                  &gt; Brake time
                </div>
              </div>
            </div>

            {/* TUE 19 */}
            <div className="flex flex-col h-full">
              <div className="p-1.5 rounded-2xl glass-neo-inset text-center mb-2">
                <span className="text-[9px] font-extrabold text-slate-400 font-sans block uppercase">TUE</span>
                <span className="text-xs font-black text-slate-800 font-sans">19</span>
              </div>

              <div className="space-y-2 flex-1">
                <motion.div
                  onClick={() =>
                    handleCardClick({
                      id: "m3",
                      day: "TUE 19",
                      status: "Done",
                      statusColor: "emerald",
                      title: "Typography and Layout Design for Dashboard",
                      desc: "Help with fonts and layout elements to perfect dashboard hierarchy",
                    })
                  }
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-blue-400/80 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[8px] font-extrabold text-emerald-600 uppercase font-sans">Done</span>
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight font-sans">
                    Typography and Layout Design for Dashboard
                  </h4>
                  <p className="text-[9px] text-slate-500 font-medium font-sans mt-0.5 leading-snug">
                    Help with fonts and layout elements to the design
                  </p>
                </motion.div>
              </div>
            </div>

            {/* WED 20 (Active Column) */}
            <div className="flex flex-col h-full">
              <div className="p-1.5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center mb-2 shadow-md border border-white/60">
                <span className="text-[9px] font-extrabold text-blue-200 font-sans block uppercase">WED</span>
                <span className="text-xs font-black text-white font-sans">20</span>
              </div>

              <div className="space-y-2 flex-1">
                <motion.div
                  onClick={() =>
                    handleCardClick({
                      id: "m4",
                      day: "WED 20",
                      status: "Medium",
                      statusColor: "amber",
                      title: "Active Session Review (Revenue Obj.)",
                      time: "01:24",
                      comments: "3",
                      avatars: ["AR"],
                    })
                  }
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-2.5 rounded-2xl bg-white/95 border border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span className="text-[8px] font-extrabold text-amber-600 uppercase font-sans">Medium</span>
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight font-sans">
                    Active Session Review (Revenue Obj.)
                  </h4>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                    <div className="flex -space-x-1">
                      <div className="w-3.5 h-3.5 rounded-full bg-purple-500 text-white text-[6px] font-bold flex items-center justify-center border border-white">
                        AR
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[8px] font-mono text-slate-400">
                      <span>⏱ 01:24</span>
                      <span>💬 3</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* THU 31 */}
            <div className="flex flex-col h-full">
              <div className="p-1.5 rounded-2xl glass-neo-inset text-center mb-2">
                <span className="text-[9px] font-extrabold text-slate-400 font-sans block uppercase">THU</span>
                <span className="text-xs font-black text-slate-800 font-sans">31</span>
              </div>

              <div className="space-y-2 flex-1">
                <motion.div
                  onClick={() =>
                    handleCardClick({
                      id: "m5",
                      day: "THU 31",
                      status: "High",
                      statusColor: "rose",
                      title: "User Experience (UX) Flow Validation",
                      desc: "Create an appealing and visually engaging interface",
                      comments: "24",
                      avatars: ["68"],
                    })
                  }
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-blue-400/80 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-[8px] font-extrabold text-rose-600 uppercase font-sans">High</span>
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight font-sans">
                    User Experience (UX) Flow Validation
                  </h4>
                  <p className="text-[9px] text-slate-500 font-medium font-sans mt-0.5 leading-snug">
                    Create an appealing and visually engaging interface
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[6px] font-bold flex items-center justify-center border border-white">
                      68
                    </div>
                    <span className="text-[8px] font-mono text-slate-400">💬 24</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* FRI 22 */}
            <div className="flex flex-col h-full">
              <div className="p-1.5 rounded-2xl glass-neo-inset text-center mb-2">
                <span className="text-[9px] font-extrabold text-slate-400 font-sans block uppercase">FRI</span>
                <span className="text-xs font-black text-slate-800 font-sans">22</span>
              </div>

              <div className="space-y-2 flex-1">
                <motion.div
                  onClick={() =>
                    handleCardClick({
                      id: "m6",
                      day: "FRI 22",
                      status: "Low",
                      statusColor: "cyan",
                      title: "Conduct User Testing",
                    })
                  }
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-blue-400/80 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    <span className="text-[8px] font-extrabold text-cyan-600 uppercase font-sans">Low</span>
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight font-sans">
                    Conduct User Testing
                  </h4>
                </motion.div>

                <motion.div
                  onClick={() =>
                    handleCardClick({
                      id: "m7",
                      day: "FRI 22",
                      status: "High",
                      statusColor: "rose",
                      title: "Voice Presentation",
                      desc: "Present the project and gather feedback from leadership",
                    })
                  }
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-blue-400/80 shadow-sm hover:shadow-md transition-all cursor-pointer text-left"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span className="text-[8px] font-extrabold text-rose-600 uppercase font-sans">High</span>
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800 leading-tight font-sans">
                    Voice Presentation
                  </h4>
                  <p className="text-[9px] text-slate-500 font-medium font-sans mt-0.5 leading-snug">
                    Present the project and gather feedback
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Voice Command Input Capsule - Unfolds ONLY when isListening is active */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-xl z-30"
            >
              <div className="p-2 pl-4 rounded-full bg-slate-900/90 backdrop-blur-2xl border border-sky-400/50 shadow-[0_12px_40px_rgba(2,132,199,0.35)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  {/* Pulsing Voice Listening Indicator */}
                  <div className="relative w-3 h-3 flex-shrink-0 flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500 shadow-[0_0_8px_#0ea5e9]" />
                  </div>

                  {/* Audio Waveform Bars */}
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    {[12, 18, 10, 22, 14, 20].map((h, i) => (
                      <motion.div
                        key={`bar-${i}`}
                        className="w-0.5 rounded-full bg-sky-400"
                        animate={{ height: [4, h, 4] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08 }}
                      />
                    ))}
                  </div>

                  {/* Input displaying Live Typewritten Director Voice */}
                  <form onSubmit={handleCommandSubmit} className="flex-1 min-w-0 flex items-center">
                    <input
                      type="text"
                      value={voiceInput}
                      onChange={(e) => setVoiceInput(e.target.value)}
                      placeholder="Capturando voz del Director..."
                      className="w-full bg-transparent text-xs font-semibold text-sky-100 focus:outline-none placeholder:text-sky-300/60 font-mono tracking-tight"
                    />
                    <span className="animate-pulse text-sky-400 font-mono text-xs font-bold ml-0.5">|</span>
                  </form>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  {/* Send Button */}
                  <motion.button
                    type="button"
                    onClick={() => handleCommandSubmit()}
                    disabled={isSubmitting}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center shadow-md border border-white/40 cursor-pointer"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    {isSubmitting ? (
                      <Sparkles className="w-3.5 h-3.5 animate-spin text-white" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-white ml-0.5" />
                    )}
                  </motion.button>

                  {/* Stop Listening Button */}
                  <motion.button
                    type="button"
                    onClick={onToggleListening}
                    title="Detener sesión de voz"
                    className="w-8 h-8 rounded-full bg-slate-800 hover:bg-rose-600/80 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>

              {/* Real-time Submitted Command Feedback Toast */}
              <AnimatePresence>
                {submittedCommands.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mt-2 p-2 rounded-2xl bg-slate-900/95 text-sky-200 text-[10px] font-extrabold backdrop-blur-md border border-sky-500/40 shadow-lg text-center font-sans"
                  >
                    Comando Procesado: "{submittedCommands[0]}"
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Milestone Inspector Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
            onClick={() => setSelectedMilestone(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="p-6 rounded-3xl glass-neo-card w-full max-w-md relative shadow-2xl border border-white"
            >
              <button
                onClick={() => setSelectedMilestone(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200/50 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-400 block font-mono">
                    {selectedMilestone.day}
                  </span>
                  <h3 className="text-sm font-black text-slate-800 font-sans">
                    {selectedMilestone.title}
                  </h3>
                </div>
              </div>

              {selectedMilestone.desc && (
                <p className="text-xs font-semibold text-slate-600 mb-4 font-sans bg-white/60 p-3 rounded-2xl border border-slate-200">
                  {selectedMilestone.desc}
                </p>
              )}

              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-5">
                <span className="flex items-center gap-1">
                  Status:{" "}
                  <span className="text-emerald-600 font-extrabold uppercase">
                    {selectedMilestone.status}
                  </span>
                </span>
                {selectedMilestone.time && <span>Duration: {selectedMilestone.time}</span>}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

