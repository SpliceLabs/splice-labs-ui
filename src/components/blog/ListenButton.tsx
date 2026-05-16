import { cn } from "@/lib/utils";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type ListenStatus = "idle" | "loading" | "playing" | "paused";

export interface ListenButtonProps {
  /** The body text to read aloud. */
  text: string;
  /** Optional remote TTS endpoint — POSTed `{ text }`, expects audio/mpeg. */
  endpoint?: string;
  voice?: string;
  rate?: number;
  onStatus?: (status: ListenStatus) => void;
  className?: string;
}

/** Read-aloud control. Uses the Web Speech API, or a remote TTS endpoint. */
export function ListenButton({
  text,
  endpoint,
  voice,
  rate = 1,
  onStatus,
  className,
}: ListenButtonProps) {
  const [status, setStatus] = useState<ListenStatus>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const set = (s: ListenStatus) => {
    setStatus(s);
    onStatus?.(s);
  };

  // Pause on tab blur so audio never plays unattended.
  useEffect(() => {
    const onHidden = () => {
      if (document.hidden) {
        window.speechSynthesis?.pause();
        audioRef.current?.pause();
      }
    };
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      document.removeEventListener("visibilitychange", onHidden);
      window.speechSynthesis?.cancel();
      audioRef.current?.pause();
    };
  }, []);

  async function start() {
    if (endpoint) {
      set("loading");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        const blob = await res.blob();
        const audio = new Audio(URL.createObjectURL(blob));
        audioRef.current = audio;
        audio.onended = () => set("idle");
        await audio.play();
        set("playing");
      } catch {
        set("idle");
      }
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    if (voice) {
      const match = window.speechSynthesis
        .getVoices()
        .find((v) => v.name === voice);
      if (match) utterance.voice = match;
    }
    utterance.onend = () => set("idle");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    set("playing");
  }

  function toggle() {
    if (status === "idle") {
      void start();
    } else if (status === "playing") {
      window.speechSynthesis?.pause();
      audioRef.current?.pause();
      set("paused");
    } else if (status === "paused") {
      window.speechSynthesis?.resume();
      void audioRef.current?.play();
      set("playing");
    }
  }

  const playing = status === "playing";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Pause article audio" : "Listen to article"}
      className={cn(
        "inline-flex items-center gap-2 border border-current/20 px-3 py-2",
        "font-mono text-[12px] uppercase tracking-[0.06em]",
        "transition-colors hover:border-current/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal",
        className,
      )}
    >
      {playing ? <Pause size={14} /> : <Play size={14} />}
      {status === "loading" ? "Loading" : playing ? "Pause" : "Listen"}
    </button>
  );
}
