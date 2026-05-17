import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9990] hidden lg:block"
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5,
      }}
    >
      <div
        className="w-[400px] h-[400px] rounded-full opacity-[0.03] dark:opacity-[0.02]"
        style={{
          background: "radial-gradient(circle, rgba(120,113,108,0.6) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  )
}
