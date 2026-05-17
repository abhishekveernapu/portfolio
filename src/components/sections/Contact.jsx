import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, ArrowUp, Heart } from "lucide-react"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons"
import { personal } from "@/data/personal"

const SOCIALS = [
  { icon: GithubIcon, href: personal.social.github, label: "GitHub" },
  { icon: LinkedinIcon, href: personal.social.linkedin, label: "LinkedIn" },
  { icon: TwitterIcon, href: personal.social.twitter, label: "Twitter / X" },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative">

      {/* ═══════ STATUS BAR — availability + back to top ═══════ */}
      <div className="border-b border-stone-200 dark:border-zinc-800 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between flex-wrap gap-3">
          {/* Availability chip */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-300 dark:border-zinc-600 text-[11px] font-semibold uppercase tracking-[0.08em] text-stone-700 dark:text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-stone-900 dark:bg-zinc-100" />
            {personal.availability}
          </span>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors group"
          >
            Back to top
            <span className="w-8 h-8 rounded-full bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>

      {/* ═══════ FOOTER — two columns ═══════ */}
      <div className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-28">

            {/* LEFT — Me card + Contact rows */}
            <motion.div
              className="flex-shrink-0 lg:w-[400px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Me card — avatar + name + role */}
              <div className="flex items-center gap-3.5 mb-7">
                <div className="w-14 h-14 rounded-full bg-stone-200 dark:bg-zinc-800 flex items-center justify-center text-xl font-bold text-stone-600 dark:text-zinc-300 select-none shrink-0 overflow-hidden">
                  {personal.profileImage ? (
                    <img src={personal.profileImage} alt={personal.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                  ) : (
                    personal.name.charAt(0)
                  )}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-stone-900 dark:text-zinc-50 leading-tight">
                    {personal.name}
                  </h3>
                  <p className="text-sm text-stone-500 dark:text-zinc-400 mt-0.5">
                    {personal.title}
                  </p>
                </div>
              </div>

              {/* CONTACT ME label */}
              <p className="text-xs font-mono font-medium uppercase tracking-[0.08em] text-stone-400 dark:text-zinc-500 mb-3">
                Contact Me
              </p>

              {/* Contact row — email + location inline */}
              <div className="flex items-center gap-6 flex-wrap">
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2.5 text-[15px] text-stone-600 dark:text-zinc-300 hover:text-stone-900 dark:hover:text-zinc-50 transition-colors"
                >
                  <Mail size={16} className="text-stone-400 dark:text-zinc-500 shrink-0" />
                  {personal.email}
                </a>
                <span className="inline-flex items-center gap-2.5 text-[15px] text-stone-600 dark:text-zinc-300">
                  <MapPin size={16} className="text-stone-400 dark:text-zinc-500 shrink-0" />
                  {personal.location}
                </span>
              </div>
            </motion.div>

            {/* RIGHT — Let's Connect + Social Icons */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-display font-bold text-[clamp(32px,4vw,44px)] leading-[1.1] tracking-tight text-stone-900 dark:text-zinc-50 mb-4">
                Let's Connect
              </h2>
              <p className="text-[15px] leading-relaxed text-stone-500 dark:text-zinc-400 max-w-md mb-6">
                Feel free to reach out for collaborations or just a friendly hello.
              </p>

              {/* Social icon circles — same style as deepenvora */}
              <div className="flex items-center gap-2.5 flex-wrap">
                {SOCIALS.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-full border border-stone-300 dark:border-zinc-600 flex items-center justify-center text-stone-500 dark:text-zinc-400 transition-all duration-200 hover:text-stone-50 hover:bg-stone-900 hover:border-stone-900 dark:hover:text-zinc-900 dark:hover:bg-zinc-100 dark:hover:border-zinc-100"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ═══════ BOTTOM BAR — copyright ═══════ */}
      <div className="border-t border-stone-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
          <p className="text-center text-[13px] text-stone-400 dark:text-zinc-500 flex items-center justify-center gap-1.5">
            Made with <Heart size={12} className="text-red-400 fill-red-400" /> by {personal.name.split(" ")[0]}
          </p>
        </div>
      </div>

    </section>
  )
}
