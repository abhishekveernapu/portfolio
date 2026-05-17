import { cn } from "@/lib/utils"

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900 px-4 py-3 text-sm text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-stone-900/30 dark:focus:ring-zinc-100/30 focus:border-stone-900/50 dark:border-zinc-100/50 transition-all backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

export function Textarea({ className = "", ...props }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900 px-4 py-3 text-sm text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-stone-900/30 dark:focus:ring-zinc-100/30 focus:border-stone-900/50 dark:border-zinc-100/50 transition-all backdrop-blur-sm resize-none",
        className
      )}
      {...props}
    />
  )
}
