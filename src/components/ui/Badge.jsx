import { cn } from "@/lib/utils"

export default function Badge({ children, className = "", variant = "default" }) {
  const variants = {
    default: "bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-400 border-stone-200 dark:border-zinc-700",
    accent: "bg-stone-900/10 dark:bg-zinc-100/10 text-stone-900 dark:text-zinc-200 border-stone-900/15 dark:border-zinc-100/15",
    muted: "bg-stone-200/50 dark:bg-zinc-800/50 text-stone-500 dark:text-zinc-400 border-stone-300/50 dark:border-zinc-700/50",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded-lg border transition-colors",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
