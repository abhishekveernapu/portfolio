import { motion } from "framer-motion"
import { MapPin, Calendar, Coffee } from "lucide-react"
import SectionReveal from "@/components/effects/SectionReveal"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/effects/TextReveal"
import Badge from "@/components/ui/Badge"
import { personal } from "@/data/personal"

const techStack = [
  "React.js", "Node.js", "Express.js", "MongoDB",
   "JavaScript", "Python", 
   "Git", "REST APIs",
]

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Label */}
        <FadeUp>
          <p className="text-sm font-mono text-stone-900 dark:text-zinc-100 mb-4 tracking-wider uppercase">
            About
          </p>
        </FadeUp>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Left Column - Text */}
          <div className="md:col-span-3">
            <SectionReveal>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-tight mb-8 text-stone-900 dark:text-zinc-50">
                I build things for the web that
                <span className="gradient-text"> actually work</span>.
              </h2>
            </SectionReveal>

            <FadeUp delay={0.2}>
              <p className="text-base md:text-lg text-stone-500 dark:text-zinc-400 leading-relaxed mb-6">
                {personal.bio}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-base text-stone-500 dark:text-zinc-400 leading-relaxed mb-8">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source, or building side projects that solve real problems. I believe in writing clean, maintainable code that scales.
              </p>
            </FadeUp>

            {/* Info Pills */}
            <FadeUp delay={0.4}>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-zinc-400">
                  <MapPin size={14} className="text-stone-900 dark:text-zinc-100" />
                  {personal.location}
                </div>
              </div>
            </FadeUp>

            {/* Tech Stack Pills */}
            <FadeUp delay={0.5}>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Right Column - Stats + Avatar */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Animated Avatar Placeholder */}
            <SectionReveal delay={0.3}>
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-stone-300 dark:border-zinc-700 bg-stone-100 dark:bg-zinc-800 shadow-sm">
                {/* Decorative Code Block */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className="w-full max-w-[240px] font-mono text-xs leading-relaxed">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, staggerChildren: 0.1 }}
                    >
                      <p className="text-stone-400 dark:text-zinc-600">{"// about.js"}</p>
                      <p className="text-stone-700 dark:text-zinc-300"><span className="text-stone-900 dark:text-zinc-100 font-semibold">const</span> developer = {"{"}</p>
                      <p className="pl-4 text-stone-500 dark:text-zinc-400"><span className="text-stone-600 dark:text-zinc-400">name</span>: <span className="text-stone-900 dark:text-zinc-100">"{personal.name}"</span>,</p>
                      <p className="pl-4 text-stone-500 dark:text-zinc-400"><span className="text-stone-600 dark:text-zinc-400">role</span>: <span className="text-stone-900 dark:text-zinc-100">"MERN Stack"</span>,</p>
                      <p className="pl-4 text-stone-500 dark:text-zinc-400"><span className="text-stone-600 dark:text-zinc-400">skills</span>: [<span className="text-stone-900 dark:text-zinc-100">"React"</span>, <span className="text-stone-900 dark:text-zinc-100">"Node"</span>, <span className="text-stone-900 dark:text-zinc-100">"..."</span>],</p>
                      <p className="pl-4 text-stone-500 dark:text-zinc-400"><span className="text-stone-600 dark:text-zinc-400">passion</span>: <span className="text-stone-900 dark:text-zinc-100">"∞"</span>,</p>
                      <p className="text-stone-700 dark:text-zinc-300">{"}"};</p>
                    </motion.div>
                  </div>
                </div>

                {/* Corner decoration — macOS window dots */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
              </div>
            </SectionReveal>

            {/* Stats Grid */}
            
          </div>
        </div>
      </div>
    </section>
  )
}
