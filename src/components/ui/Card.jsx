import { cn } from "@/lib/utils"

export default function Card({ children, className = "", hover = true, glow = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900/50 p-6",
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5 dark:hover:shadow-zinc-100/5",
        glow && "glow-accent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
