import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function GlowCard({ children, className = "", ...props }) {
  const cardRef = useRef(null)
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900/50 overflow-hidden group",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      {...props}
    >
      {/* Mouse-tracking glow border */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-0 transition-opacity duration-300"
          style={{
            left: glowPosition.x - 150,
            top: glowPosition.y - 150,
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(120,113,108,0.12) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
