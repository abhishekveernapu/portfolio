import { motion } from "framer-motion"
import { ArrowDown, Mail, Download } from "lucide-react"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons"

import { TextRevealByWord } from "@/components/effects/TextReveal"
import Button from "@/components/ui/Button"
import MagneticButton from "@/components/ui/MagneticButton"
import { personal } from "@/data/personal"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30 dark:opacity-15" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Status Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 dark:border-zinc-800 bg-stone-50/50 dark:bg-zinc-900/50 backdrop-blur-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-800 dark:bg-zinc-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-900 dark:bg-zinc-100" />
          </span>
          <span className="text-xs font-mono text-stone-500 dark:text-zinc-400">
            {personal.availability}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-6">
            <TextRevealByWord
              text={personal.title}
              className="justify-center"
              delay={0.3}
            />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="max-w-xl mx-auto text-base md:text-lg text-stone-500 dark:text-zinc-400 leading-relaxed mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {personal.tagline}{" "}
          <span className="text-stone-900 dark:text-zinc-100">
            I build frontend & backend systems
          </span>{" "}
          that make products feel clear, fast, and finished.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <MagneticButton>
            <Button
              variant="primary"
              size="lg"
              icon={ArrowDown}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </Button>
          </MagneticButton>

          <MagneticButton>
            <Button
              variant="secondary"
              size="lg"
              icon={Download}
              href={personal.resumeUrl}
            >
              Download Resume
            </Button>
          </MagneticButton>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          className="flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          {[
            { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
            { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
            { icon: TwitterIcon, href: personal.social.twitter, label: "Twitter" },
            { icon: Mail, href: `mailto:${personal.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-stone-200 dark:border-zinc-800 text-stone-400 hover:text-stone-900 dark:text-zinc-100 hover:border-stone-900/50 dark:border-zinc-100/50 bg-stone-50/50 dark:bg-zinc-900/50 backdrop-blur-sm transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={label}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-5 h-8 rounded-full border-2 border-stone-300 dark:border-zinc-700 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 rounded-full bg-stone-900 dark:bg-zinc-100"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
