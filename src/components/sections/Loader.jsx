import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { personal } from "@/data/personal"

/* ── Magnetic button hook ─────────────────────────────── */
function useMagnetic(ref, strength = 0.35) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x.set((e.clientX - cx) * strength)
      y.set((e.clientY - cy) * strength)
    }

    const handleLeave = () => {
      x.set(0)
      y.set(0)
    }

    el.addEventListener("mousemove", handleMove)
    el.addEventListener("mouseleave", handleLeave)
    return () => {
      el.removeEventListener("mousemove", handleMove)
      el.removeEventListener("mouseleave", handleLeave)
    }
  }, [ref, strength, x, y])

  return { x: springX, y: springY }
}

/* ── Build name segments ─────────────────────────────── */
function buildNameSegments(name) {
  const parts = name.split(" ")
  const segments = []

  parts.forEach((word, wi) => {
    if (wi > 0) segments.push({ ch: "\u00A0", bold: false, key: `sp-${wi}` })
    word.split("").forEach((ch, ci) => {
      segments.push({ ch, bold: wi > 0, key: `${wi}-${ci}` })
    })
  })

  return segments
}

/* ── Loader component ─────────────────────────────────── */
export default function Loader({ onComplete }) {
  const [counter, setCounter] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [hovered, setHovered] = useState(false)
  const btnRef = useRef(null)
  const { x: magX, y: magY } = useMagnetic(btnRef, 0.3)

  const nameSegments = buildNameSegments(personal.name)

  // Counter 0 → 100
  useEffect(() => {
    let frame
    let start = null
    const duration = 2800

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCounter(Math.round(eased * 100))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setTimeout(() => setShowWelcome(true), 400)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleWelcome = useCallback(() => {
    if (exiting) return
    setExiting(true)
    setTimeout(() => onComplete(), 800)
  }, [exiting, onComplete])

  // Slower stagger for smooth letter reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.6,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const welcomeLetters = "Welcome".split("")

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="loader-overlay flex-col"
          style={{ backgroundColor: "#000000" }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Blue edge glow */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              boxShadow:
                "inset 0 0 120px rgba(30, 60, 180, 0.25), inset 0 0 300px rgba(20, 40, 140, 0.12)",
            }}
          />

          {/* ── Name — fixed in center, never moves ── */}
          <motion.div
            className="absolute z-10 select-none"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              marginTop: "-20px",
            }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <span style={{ whiteSpace: "nowrap" }}>
              {nameSegments.map((seg) => (
                <motion.span
                  key={seg.key}
                  variants={letterVariants}
                  style={{
                    fontFamily: '"Inter", "Geist Sans", system-ui, sans-serif',
                    fontWeight: seg.bold ? 700 : 400,
                    fontSize: "35px",
                    letterSpacing: "-0.01em",
                    color: "rgba(255,255,255,0.88)",
                    display: "inline-block",
                  }}
                >
                  {seg.ch}
                </motion.span>
              ))}
            </span>
          </motion.div>

          {/* ── Welcome pill — fixed below name, never shifts it ── */}
          <div
            className="absolute z-10"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, 0)",
              marginTop: "28px",
            }}
          >
            <AnimatePresence>
              {showWelcome && (
                <motion.div
                  ref={btnRef}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.9,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  style={{ x: magX, y: magY }}
                >
                  <button
                    onClick={handleWelcome}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="relative outline-none overflow-hidden rounded-full"
                    style={{
                      border: "1.5px solid rgba(255,255,255,0.45)",
                      padding: "10px 32px",
                      background: "transparent",
                      cursor: "pointer",
                      transition:
                        "border-color 0.4s ease, background 0.4s ease",
                      ...(hovered
                        ? {
                            borderColor: "rgba(255,255,255,0.7)",
                            background: "rgba(255,255,255,0.06)",
                          }
                        : {}),
                    }}
                  >
                    {/* Letter-roll text — slower and smoother */}
                    <span
                      className="flex items-center justify-center overflow-hidden"
                      style={{ height: "20px" }}
                    >
                      {welcomeLetters.map((ch, i) => (
                        <span
                          key={i}
                          className="inline-flex flex-col items-center"
                          style={{ height: "20px", overflow: "hidden" }}
                        >
                          <motion.span
                            animate={{ y: hovered ? -20 : 0 }}
                            transition={{
                              duration: 0.45,
                              delay: i * 0.035,
                              ease: [0.76, 0, 0.24, 1],
                            }}
                            style={{
                              fontFamily:
                                '"Inter", "Geist Sans", system-ui, sans-serif',
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "rgba(255,255,255,0.8)",
                              letterSpacing: "0.02em",
                              display: "inline-block",
                              lineHeight: "20px",
                            }}
                          >
                            {ch}
                          </motion.span>
                          <motion.span
                            animate={{ y: hovered ? -20 : 0 }}
                            transition={{
                              duration: 0.45,
                              delay: i * 0.035,
                              ease: [0.76, 0, 0.24, 1],
                            }}
                            style={{
                              fontFamily:
                                '"Inter", "Geist Sans", system-ui, sans-serif',
                              fontSize: "14px",
                              fontWeight: 400,
                              color: "rgba(255,255,255,0.9)",
                              letterSpacing: "0.02em",
                              display: "inline-block",
                              lineHeight: "20px",
                            }}
                          >
                            {ch}
                          </motion.span>
                        </span>
                      ))}
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Counter — bottom right ── */}
          <motion.div
            className="absolute bottom-8 right-10 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span
              style={{
                fontFamily: '"Inter", "Geist Sans", system-ui, sans-serif',
                fontWeight: 300,
                fontSize: "24px",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              {counter}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
