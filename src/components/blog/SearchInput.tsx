import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { useEffect, useRef } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Enables the global `/` shortcut to focus this input. */
  shortcut?: boolean;
  className?: string;
}

/** Search field with a `/` global shortcut, clear button, and teal focus ring. */
export function SearchInput({
  value,
  onChange,
  placeholder = "Search posts…  ( / )",
  shortcut = true,
  className,
}: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!shortcut) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shortcut]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 border border-current/20 px-3 py-2",
        "focus-within:ring-2 focus-within:ring-blog-ring-teal",
        className,
      )}
    >
      <Search size={15} className="shrink-0 text-blog-text-muted" />
      <input
        ref={ref}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent font-mono text-label-lg outline-none placeholder:text-blog-text-muted [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="shrink-0 text-blog-text-muted transition-colors hover:text-current"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
