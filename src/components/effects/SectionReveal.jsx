import { motion } from "framer-motion"

export default function SectionReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
}) {
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  }

  const offset = directionMap[direction] || directionMap.up

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: offset.y,
        x: offset.x,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay,
        duration,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
