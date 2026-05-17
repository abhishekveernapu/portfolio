import { motion } from "framer-motion"
import { useMagnetic } from "@/hooks/useMagnetic"

export default function MagneticButton({ children, className = "", strength = 0.3, ...props }) {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic(strength)

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
