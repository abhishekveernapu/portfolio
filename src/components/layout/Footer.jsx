import { useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { personal } from "@/data/personal"

/* ─── wirkus-style Footer ─── */
export default function Footer() {
  const location = useLocation()

  // Only render on non-home pages (home has its own contact/footer in Contact section)
  if (location.pathname === "/") return null

  return (
    <motion.footer
      className="border-t border-stone-200 dark:border-zinc-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* ─── 3-Column Grid ─── */}
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-zinc-800">

          {/* Column 1 — Contact */}
          <div className="py-10 md:py-14 md:pr-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-display font-bold text-stone-900 dark:text-zinc-50 leading-none select-none">
                +
              </span>
            </div>
            <div className="space-y-3">
              <a
                href={`mailto:${personal.email}`}
                className="block text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
              >
                {personal.email}
              </a>
              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Column 2 — Navigation */}
          <div className="py-10 md:py-14 md:px-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-display font-bold text-stone-900 dark:text-zinc-50 leading-none select-none">
                +
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-zinc-500 mb-4">
              Navigation
            </p>
            <div className="space-y-3">
              <a
                href="/"
                className="block text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
              >
                Home
              </a>
              <a
                href="/projects"
                className="block text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
              >
                Projects
              </a>
            </div>
          </div>

          {/* Column 3 — Social */}
          <div className="py-10 md:py-14 md:pl-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl md:text-3xl font-display font-bold text-stone-900 dark:text-zinc-50 leading-none select-none">
                +
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-zinc-500 mb-4">
              Social
            </p>
            <div className="space-y-3">
              {personal.social.github && (
                <a
                  href={personal.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
                >
                  GitHub
                </a>
              )}
              {personal.social.linkedin && (
                <a
                  href={personal.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {personal.social.twitter && (
                <a
                  href={personal.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Twitter
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-stone-200 dark:border-zinc-800">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-14 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400 dark:text-zinc-500">
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-stone-400 dark:text-zinc-500">
              Built with React
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
