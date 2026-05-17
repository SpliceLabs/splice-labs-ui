import { cn } from "@/lib/utils";
import { ModuleLabel } from "./ModuleLabel";
import { TagPill } from "./TagPill";

export interface FilterGroup {
  label: string;
  options: string[];
}

export interface FilterRailProps {
  groups: FilterGroup[];
  /** Active option per group, keyed by group label. */
  active: Record<string, string>;
  onChange: (group: string, value: string) => void;
  className?: string;
}

/** Vertical multi-group filter sidebar for the blog index. */
export function FilterRail({
  groups,
  active,
  onChange,
  className,
}: FilterRailProps) {
  return (
    <aside className={cn("flex flex-col gap-8", className)}>
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-3">
          <ModuleLabel dot>{group.label}</ModuleLabel>
          <div className="flex flex-col items-start gap-1">
            {group.options.map((option) => (
              <TagPill
                key={option}
                active={active[group.label] === option}
                onClick={() => onChange(group.label, option)}
              >
                {option}
              </TagPill>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
