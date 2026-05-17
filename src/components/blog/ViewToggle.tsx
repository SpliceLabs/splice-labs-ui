import { cn } from "@/lib/utils";
import { LayoutGrid, Rows3 } from "lucide-react";

export type BlogView = "grid" | "list";

export interface ViewToggleProps {
  value: BlogView;
  onChange: (value: BlogView) => void;
  className?: string;
}

/** Grid ↔ list switch for the blog index. */
export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
  const options: { view: BlogView; icon: typeof LayoutGrid; label: string }[] = [
    { view: "grid", icon: LayoutGrid, label: "Grid view" },
    { view: "list", icon: Rows3, label: "List view" },
  ];

  return (
    <div className={cn("flex border border-current/20", className)}>
      {options.map(({ view, icon: Icon, label }) => (
        <button
          key={view}
          type="button"
          onClick={() => onChange(view)}
          aria-label={label}
          aria-pressed={value === view}
          className={cn(
            "grid size-10 place-items-center transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blog-ring-teal",
            value === view
              ? "bg-blog-chip-ink text-blog-chip-text"
              : "text-blog-text-muted hover:text-current",
          )}
        >
          <Icon size={15} />
        </button>
      ))}
    </div>
  );
}
