"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, RotateCcw, SendHorizonal, Sparkles, X } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { trackEvent } from "@/lib/analytics";
import { WhatsAppIcon } from "@/components/site-header";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

/** Render minimal markdown: **bold** + line breaks → rich text. */
function renderRich(text: string) {
  return text.split(/\n/).map((line, li) => (
    <span key={li} className="block">
      {line.split(/\*\*(.+?)\*\*/g).map((seg, si) =>
        si % 2 === 1 ? (
          <strong key={si} className="font-semibold">
            {seg}
          </strong>
        ) : (
          <span key={si}>{seg}</span>
        )
      )}
    </span>
  ));
}

const SUGGESTIONS = {
  id: [
    "Berapa harga Geely EX5?",
    "Bandingkan EX5 vs Coolray",
    "Cara simulasi kreditnya?",
    "Booking test drive dong",
  ],
  en: [
    "How much is the Geely EX5?",
    "Compare EX5 vs Coolray",
    "How does financing work?",
    "I want to book a test drive",
  ],
} as const;

const GREETING = {
  id: "Halo! 👋 Saya Geely Bot, asisten AI Pusat Geely. Tanya apa saja soal EX5, EX2, Starray EM-i, Coolray, harga, kredit, atau test drive — saya bantu jawab instan.",
  en: "Hi! 👋 I'm Geely Bot, the AI assistant of Pusat Geely. Ask me anything about the EX5, EX2, Starray EM-i, Coolray, pricing, financing, or test drives — instant answers, 24/7.",
} as const;

export function AiChatWidget() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waUrl, setWaUrl] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openedOnce = useRef(false);

  // Seed greeting on first open (per session)
  useEffect(() => {
    if (open && !openedOnce.current) {
      openedOnce.current = true;
      setMessages([{ role: "assistant", content: GREETING[lang] }]);
      // Analytics — panel chat dibuka PERTAMA kali (sekali per sesi).
      trackEvent("chat_open");
    }
  }, [open, lang]);

  // Auto-scroll to latest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 350);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || loading) return;

      setError(null);
      setInput("");
      const next: ChatMessage[] = [...messages, { role: "user", content }];
      setMessages(next);
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next.slice(-12), lang }),
        });
        const data = (await res.json()) as {
          ok: boolean;
          reply?: string;
          waUrl?: string;
          error?: string;
        };

        if (!res.ok || !data.ok || !data.reply) {
          throw new Error(data.error ?? "server_error");
        }

        setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
        if (data.waUrl) setWaUrl(data.waUrl);
      } catch {
        setError(
          lang === "id"
            ? "Waduh, koneksi bot terganggu. Coba lagi sebentar atau langsung chat WhatsApp ya."
            : "Oops, the bot connection hiccuped. Try again shortly or reach us on WhatsApp."
        );
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, lang]
  );

  const reset = useCallback(() => {
    setMessages([{ role: "assistant", content: GREETING[lang] }]);
    setError(null);
    setWaUrl(null);
  }, [lang]);

  const label = lang === "id" ? "Geely Bot — Asisten AI" : "Geely Bot — AI Assistant";
  const suggestions = SUGGESTIONS[lang];

  return (
    <>
      {/* ══ FAB — desktop: kiri dari tombol WhatsApp; mobile: di atas sticky bar ══ */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? (lang === "id" ? "Tutup Geely Bot" : "Close Geely Bot") : label}
        aria-expanded={open}
        initial={false}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-20 right-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-600/40 focus-visible:outline-2 focus-visible:outline-ring md:right-24 md:bottom-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="size-6" aria-hidden="true" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot className="size-6" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Pulse dot — menandakan bot online */}
        {!open && (
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 flex size-3.5"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex size-3.5 rounded-full border-2 border-background bg-emerald-400" />
          </span>
        )}
      </motion.button>

      {/* ══ Chat panel ══ */}
      <AnimatePresence>
        {open && (
          <motion.section
            key="chat-panel"
            role="dialog"
            aria-label={label}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed inset-x-3 bottom-[5.75rem] z-50 flex max-h-[min(34rem,calc(100dvh-9rem))] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/30 md:inset-x-auto md:right-6 md:bottom-24 md:w-[24rem] lg:w-[26rem]"
          >
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-emerald-950/80 to-card px-4 py-3">
              <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/30">
                <Bot className="size-5" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-card bg-emerald-400"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold tracking-tight">
                  Geely Bot
                  <Sparkles
                    className="ml-1.5 inline size-3.5 text-amber-400"
                    aria-hidden="true"
                  />
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {lang === "id" ? "Online • balas instan 24/7" : "Online • instant replies 24/7"}
                </p>
              </div>
              <button
                type="button"
                onClick={reset}
                aria-label={lang === "id" ? "Mulai ulang percakapan" : "Restart conversation"}
                title={lang === "id" ? "Mulai ulang" : "Restart"}
                className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={lang === "id" ? "Tutup chat" : "Close chat"}
                className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </header>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="chat-scroll flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.03 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {m.role === "assistant" && (
                    <span
                      aria-hidden="true"
                      className="mr-2 mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                    >
                      <Bot className="size-3.5" />
                    </span>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border border-border/60 bg-muted/60 text-foreground"
                    }`}
                  >
                    {renderRich(m.content)}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                  aria-live="polite"
                  aria-label={lang === "id" ? "Geely Bot sedang mengetik" : "Geely Bot is typing"}
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
                  >
                    <Bot className="size-3.5" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-border/60 bg-muted/60 px-4 py-3">
                    <span className="typing-dot size-1.5 rounded-full bg-muted-foreground/70" />
                    <span className="typing-dot size-1.5 rounded-full bg-muted-foreground/70 [animation-delay:0.15s]" />
                    <span className="typing-dot size-1.5 rounded-full bg-muted-foreground/70 [animation-delay:0.3s]" />
                  </span>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
                >
                  {error}
                </p>
              )}

              {/* Quick suggestions — hanya saat percakapan masih pendek */}
              {messages.length <= 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void send(s)}
                      className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-500 transition-colors hover:bg-emerald-500 hover:text-white focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer — input + WhatsApp handoff */}
            <footer className="border-t border-border/60 bg-background/60 p-3">
              {waUrl && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("wa_click", { location: "ai_chat" })}
                  className="mb-2.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-bold text-white shadow-lg shadow-[#25D366]/25 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <WhatsAppIcon className="size-4" aria-hidden="true" />
                  {lang === "id" ? "Lanjut ke WhatsApp Sena" : "Continue to WhatsApp"}
                </a>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
                className="flex items-center gap-2"
              >
                <label htmlFor="geely-bot-input" className="sr-only">
                  {lang === "id" ? "Tulis pesan untuk Geely Bot" : "Write a message for Geely Bot"}
                </label>
                <input
                  id="geely-bot-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  autoComplete="off"
                  placeholder={
                    lang === "id" ? "Tanya soal Geely…" : "Ask about Geely…"
                  }
                  className="h-11 min-w-0 flex-1 rounded-full border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-emerald-500/60 focus-visible:outline-2 focus-visible:outline-ring"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label={lang === "id" ? "Kirim pesan" : "Send message"}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-600/25 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <SendHorizonal className="size-4.5" aria-hidden="true" />
                </button>
              </form>
              <p className="mt-2 text-center text-[10px] leading-tight text-muted-foreground/70">
                {lang === "id"
                  ? "Geely Bot memakai data website ini — jawaban indikatif, konfirmasi final via WhatsApp."
                  : "Geely Bot uses this website's data — answers are indicative, confirm via WhatsApp."}
              </p>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
