import { motion } from "framer-motion"
import { FadeUp } from "@/components/effects/TextReveal"
import SectionReveal from "@/components/effects/SectionReveal"
import Badge from "@/components/ui/Badge"
import { experiences } from "@/data/experience"

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <p className="text-sm font-mono text-stone-900 dark:text-zinc-100 mb-4 tracking-wider uppercase">Experience</p>
        </FadeUp>
        <SectionReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-16 text-stone-900 dark:text-zinc-50">Where I've worked</h2>
        </SectionReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 dark:bg-zinc-800 md:-translate-x-1/2" />

          {experiences.map((exp, i) => (
            <SectionReveal key={exp.id} delay={i * 0.15} direction={i % 2 === 0 ? "left" : "right"}>
              <div className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-stone-900 dark:bg-zinc-100 border-4 border-stone-50 dark:border-zinc-950 -translate-x-[5px] md:-translate-x-1/2 z-10">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-stone-900 dark:bg-zinc-100"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>

                {/* Card */}
                <div className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <motion.div
                    className="p-6 rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900/50 hover:border-stone-900/15 dark:border-zinc-100/15 transition-all"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-display font-bold text-stone-900 dark:text-zinc-50">{exp.company}</h3>
                      <span className="text-xs font-mono text-stone-400 dark:text-zinc-500">{exp.duration}</span>
                    </div>
                    <p className="text-sm font-medium text-stone-900 dark:text-zinc-100 mb-3">{exp.role}</p>
                    <p className="text-sm text-stone-500 dark:text-zinc-400 leading-relaxed mb-4">{exp.description}</p>

                    <ul className="space-y-2 mb-4">
                      {exp.highlights.map((h, hi) => (
                        <li key={hi} className="flex items-start gap-2 text-sm text-stone-500 dark:text-zinc-400">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-900 dark:bg-zinc-100 shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="default">{tech}</Badge>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
