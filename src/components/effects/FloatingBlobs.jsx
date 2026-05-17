import { motion } from "framer-motion"

const blobs = [
  {
    size: "w-72 h-72",
    color: "bg-stone-400/15 dark:bg-zinc-500/8",
    position: "top-20 -left-20",
    delay: 0,
    duration: 7,
  },
  {
    size: "w-96 h-96",
    color: "bg-stone-300/12 dark:bg-zinc-600/6",
    position: "-top-10 right-20",
    delay: 2,
    duration: 9,
  },
  {
    size: "w-80 h-80",
    color: "bg-stone-400/12 dark:bg-zinc-500/6",
    position: "bottom-20 right-40",
    delay: 4,
    duration: 8,
  },
  {
    size: "w-64 h-64",
    color: "bg-stone-300/10 dark:bg-zinc-600/5",
    position: "bottom-40 -left-10",
    delay: 1,
    duration: 10,
  },
]

export default function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute ${blob.size} ${blob.color} ${blob.position} rounded-full blur-3xl`}
          animate={{
            y: [0, -30, 20, 0],
            x: [0, 20, -15, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: blob.delay,
          }}
          style={{ mixBlendMode: "normal" }}
        />
      ))}
    </div>
  )
}
