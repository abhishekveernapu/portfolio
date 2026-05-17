import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const variants = {
  primary: "bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 hover:bg-stone-800 dark:hover:bg-zinc-200 shadow-lg shadow-stone-900/10 dark:shadow-zinc-100/10",
  secondary: "border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-100 hover:bg-stone-100 dark:hover:bg-zinc-800",
  ghost: "text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 hover:bg-stone-100 dark:hover:bg-zinc-800/50",
  outline: "border border-stone-300 dark:border-zinc-700 text-stone-900 dark:text-zinc-100 hover:bg-stone-100 dark:hover:bg-zinc-800",
}

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
  xl: "px-8 py-4 text-base",
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  icon: Icon,
  iconRight: IconRight,
  magnetic = false,
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-stone-900/30 dark:focus:ring-zinc-100/30 focus:ring-offset-2 focus:ring-offset-stone-50 dark:focus:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    sizes[size],
    className
  )

  const Component = href ? "a" : "button"
  const linkProps = href ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: href.startsWith("http") ? "noopener noreferrer" : undefined } : {}

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Component className={classes} {...linkProps} {...props}>
        {Icon && <Icon size={16} />}
        {children}
        {IconRight && <IconRight size={16} />}
      </Component>
    </motion.div>
  )
}
