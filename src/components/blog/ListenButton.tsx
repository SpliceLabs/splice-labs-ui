import { cn } from "@/lib/utils";
import { apiPostBlob } from "@acme/api-client";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { actionButtonClass } from "./styles";

export type ListenStatus = "idle" | "loading" | "playing" | "paused";

export interface ListenButtonProps {
  /**
   * The body text to read aloud. Pass a function to resolve it lazily at
   * click time — needed when the source (e.g. a rendered article) is not
   * available on first render.
   */
  text: string | (() => string);
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

  const objectUrlRef = useRef<string | null>(null);

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
      // Revoke any Object URL to prevent memory leak
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  async function start() {
    // Resolve lazily — the text source may not exist until click time.
    const content = typeof text === "function" ? text() : text;

    if (endpoint) {
      set("loading");
      try {
        const blob = await apiPostBlob(endpoint, { text: content });
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
        }
        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        const audio = new Audio(url);
        audioRef.current = audio;
        audio.onended = () => set("idle");
        await audio.play();
        set("playing");
      } catch (err) {
        console.error("TTS fetch error:", err);
        set("idle");
      }
      return;
    }

    // Check speechSynthesis availability
    if (typeof window === "undefined" || !window.speechSynthesis) {
      console.warn("Speech synthesis not available");
      return;
    }

    // Empty text causes onend to never fire, leaving status stuck
    if (!content.trim()) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(content);
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
      className={cn(actionButtonClass, className)}
    >
      {playing ? <Pause size={14} /> : <Play size={14} />}
      {status === "loading" ? "Loading" : playing ? "Pause" : "Listen"}
    </button>
  );
}
