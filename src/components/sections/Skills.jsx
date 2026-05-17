import { motion } from "framer-motion"
import { FadeUp } from "@/components/effects/TextReveal"
import SectionReveal from "@/components/effects/SectionReveal"
import { skillCategories } from "@/data/skills"

/* ── Infinite scrolling marquee ── */
function Marquee({ children, reverse = false, duration = 32 }) {
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-3"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

/* ── Category card with bento-style layout ── */
function CategoryCard({ category, index }) {
  const Icon = category.icon
  const isLarge = index < 2 // First two categories get larger cards

  return (
    <motion.div
      className={`group relative rounded-2xl border border-stone-300 dark:border-zinc-700 bg-stone-100/95 dark:bg-zinc-900/95 overflow-hidden transition-colors duration-300 hover:border-stone-400 dark:hover:border-zinc-500 shadow-sm ${
        isLarge ? "md:col-span-3" : "md:col-span-2"
      }`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Subtle gradient accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-transparent to-transparent dark:from-zinc-800/40 dark:via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative p-6 md:p-8">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 flex items-center justify-center shadow-sm">
              <Icon size={18} strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-stone-900 dark:text-zinc-50 tracking-tight">
                {category.title}
              </h3>
              <p className="text-[11px] font-mono text-stone-400 dark:text-zinc-500 mt-0.5">
                {category.skills.length} technologies
              </p>
            </div>
          </div>
          {/* Decorative index */}
          <span className="text-[11px] font-mono text-stone-400 dark:text-zinc-500 tracking-wider">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Skills as clean pills */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, i) => (
            <motion.span
              key={skill.name}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-600 text-sm font-mono text-stone-800 dark:text-zinc-200 hover:bg-stone-50 dark:hover:bg-zinc-700 hover:border-stone-400 dark:hover:border-zinc-500 transition-all duration-200 cursor-default shadow-sm"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 + i * 0.04, duration: 0.35 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-zinc-500 shrink-0" />
              {skill.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── All tech names for the marquee ── */
const marqueeRow1 = skillCategories.slice(0, 3).flatMap(c => c.skills.map(s => s.name))
const marqueeRow2 = skillCategories.slice(2).flatMap(c => c.skills.map(s => s.name))

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <FadeUp>
              <p className="text-sm font-mono text-stone-900 dark:text-zinc-100 mb-3 tracking-wider uppercase">
                Skills & Expertise
              </p>
            </FadeUp>
            <SectionReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight text-stone-900 dark:text-zinc-50">
                Technologies I work with
              </h2>
            </SectionReveal>
          </div>
          <FadeUp delay={0.2}>
            <p className="text-sm text-stone-500 dark:text-zinc-400 max-w-sm md:text-right leading-relaxed">
              A curated set of tools I use daily to ship fast, reliable, and scalable products.
            </p>
          </FadeUp>
        </div>

        {/* ── Scrolling Tech Marquee ── */}
        <FadeUp delay={0.3}>
          <div className="mb-20 space-y-2.5">
            <Marquee duration={38}>
              {marqueeRow1.map((name) => (
                <span
                  key={name}
                  className="shrink-0 px-4 py-1.5 rounded-full border border-stone-300 dark:border-zinc-700 bg-stone-100 dark:bg-zinc-800/60 text-[11px] font-mono uppercase tracking-widest text-stone-600 dark:text-zinc-400 whitespace-nowrap select-none"
                >
                  {name}
                </span>
              ))}
            </Marquee>
            <Marquee duration={44} reverse>
              {marqueeRow2.map((name) => (
                <span
                  key={name}
                  className="shrink-0 px-4 py-1.5 rounded-full border border-stone-300 dark:border-zinc-700 bg-stone-100 dark:bg-zinc-800/60 text-[11px] font-mono uppercase tracking-widest text-stone-600 dark:text-zinc-400 whitespace-nowrap select-none"
                >
                  {name}
                </span>
              ))}
            </Marquee>
          </div>
        </FadeUp>

        {/* ── Bento Grid of Category Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {skillCategories.map((category, i) => (
            <CategoryCard key={category.title} category={category} index={i} />
          ))}
        </div>

        {/* ── Bottom stat line ── */}
        <motion.div
          className="mt-12 pt-8 border-t border-stone-200 dark:border-zinc-800 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { value: skillCategories.reduce((sum, c) => sum + c.skills.length, 0), label: "Total Skills" },
            { value: skillCategories.length, label: "Categories" },
            { value: "MERN", label: "Core Stack" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl font-display font-bold text-stone-900 dark:text-zinc-100">
                {stat.value}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400 dark:text-zinc-500">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
