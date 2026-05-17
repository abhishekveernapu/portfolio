import { useCallback, useEffect, useRef, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"
import { FadeUp } from "@/components/effects/TextReveal"
import SectionReveal from "@/components/effects/SectionReveal"
import { projects } from "@/data/projects"
import { Link, useNavigate } from "react-router-dom"

const FEATURED_COUNT = 4
const CARD_GAP = 32 // px gap between project cards

function categoryLabel(project) {
  const primary = project.tags[0] ?? "Build"
  const secondary = project.tags[1] ?? project.year
  return `[${primary.toUpperCase()}] — [${secondary.toUpperCase()}]`
}

export default function FeaturedProjects() {
  const navigate = useNavigate()
  // Memoize so the array ref is stable — prevents useEffect re-triggering
  const featured = useMemo(
    () => projects.filter((p) => p.featured).slice(0, FEATURED_COUNT),
    []
  )

  const sectionRef = useRef(null)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const headerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [typedTitle, setTypedTitle] = useState(featured[0]?.title ?? "")

  const lastIndexRef = useRef(0)

  const project = featured[activeIndex] ?? featured[0]

  // Scroll tracking — more scroll room = slower animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const [trackTravel, setTrackTravel] = useState(0)
  const [cardHeight, setCardHeight] = useState(0)
  const [galleryMaxWidth, setGalleryMaxWidth] = useState('100%')

  // Measure on mount & resize
  useEffect(() => {
    const measure = () => {
      const header = headerRef.current
      // Available height = screen height minus header height minus bottom padding
      const headerH = header ? header.offsetHeight : 0
      const paddingBottom = 16
      const availableH = window.innerHeight - headerH - paddingBottom
      // Max gallery width so that 4:3 height fits in available space
      const maxW = availableH * (4 / 3)
      setGalleryMaxWidth(maxW)
      // Actual gallery width: min of screen width (minus horizontal padding), max-w-6xl content, and maxW
      const screenContentW = window.innerWidth - 48 // px-6 = 24px each side
      const maxContainerW = 1152 - 48 // max-w-6xl minus padding
      const vw = Math.min(screenContentW, maxContainerW, maxW - 48)
      const ch = Math.max(vw, 0) * (3 / 4)
      setCardHeight(ch)
      // Track travel = (N-1) * (cardHeight + gap)
      const totalTrackH = FEATURED_COUNT * ch + (FEATURED_COUNT - 1) * CARD_GAP
      setTrackTravel(Math.max(0, totalTrackH - ch))
    }
    const raf = requestAnimationFrame(measure)
    window.addEventListener("resize", measure)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", measure)
    }
  }, [])

  // Scroll → translateY for the track
  const trackY = useTransform(scrollYProgress, [0, 1], [0, -trackTravel])

  // Update active index + overlay visibility from scroll
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (trackTravel <= 0) return

    // Calculate which card is currently centered
    const currentY = progress * trackTravel
    const cardStep = cardHeight + CARD_GAP
    const idx = Math.min(
      Math.round(currentY / cardStep),
      FEATURED_COUNT - 1
    )



    if (idx !== lastIndexRef.current) {
      lastIndexRef.current = idx
      setActiveIndex(idx)
    }
  })

  // Typing effect for title — only on project change
  useEffect(() => {
    const title = featured[activeIndex]?.title ?? ""
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) {
      setTypedTitle(title)
      return
    }
    setTypedTitle("")
    let i = 0
    const id = setInterval(() => {
      i += 1
      setTypedTitle(title.slice(0, i))
      if (i >= title.length) clearInterval(id)
    }, 32)
    return () => clearInterval(id)
  }, [activeIndex, featured])

  // Scroll to project when thumbnail is clicked
  const scrollToProject = useCallback((index) => {
    if (!sectionRef.current) return
    const sectionTop = sectionRef.current.offsetTop
    const sectionScroll = sectionRef.current.scrollHeight - window.innerHeight
    const cardStep = cardHeight + CARD_GAP
    const targetProgress = trackTravel > 0 ? (index * cardStep) / trackTravel : 0
    const targetScroll = sectionTop + sectionScroll * targetProgress
    window.scrollTo({ top: targetScroll, behavior: "smooth" })
  }, [cardHeight, trackTravel])

  // More scroll height = slower animation. ~150vh per project.
  const pinHeight = `${FEATURED_COUNT * 150}vh`

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative mb-24"
      style={{ height: pinHeight }}
    >
      {/* Sticky viewport — stays pinned while user scrolls through projects */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ——— Below md: stacked cards (no scroll hijack) ——— */}
        <div className="md:hidden px-6 pt-20 pb-10 overflow-y-auto h-full">
          <FadeUp>
            <span className="block font-mono text-[10px] uppercase tracking-[0.35em] text-stone-500 dark:text-zinc-400 mb-3">
              Selected Projects
            </span>
          </FadeUp>
          <SectionReveal>
            <h2 className="text-3xl sm:text-4xl font-display font-black uppercase leading-[0.95] tracking-tighter text-stone-900 dark:text-zinc-50 mb-4">
              Featured<br />Work
            </h2>
          </SectionReveal>
          <p className="text-sm leading-relaxed text-stone-500 dark:text-zinc-400 max-w-sm mb-8">
            Websites where scroll, motion, and interaction feel intentional.
          </p>
          <div className="space-y-6 mb-8">
            {featured.map((p, i) => (
              <div
                key={p.id}
                className="group overflow-hidden rounded-sm border border-stone-200 dark:border-zinc-800 cursor-pointer"
                onClick={() => navigate(`/projects?open=${p.id}`)}
              >
                <div className="relative overflow-hidden bg-stone-100 dark:bg-zinc-900" style={{ aspectRatio: '4 / 3' }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover block"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-stone-400 dark:text-zinc-500 mb-2">
                    {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-display font-black uppercase tracking-tight text-lg text-stone-900 dark:text-zinc-50 mb-2">
                    {p.title}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500/60 dark:text-zinc-400/60 mb-3">
                    {categoryLabel(p)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-stone-500 dark:text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-3 bg-stone-900 dark:bg-zinc-100 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-50 dark:text-zinc-900 transition-colors hover:bg-stone-800 dark:hover:bg-zinc-200"
          >
            View all
          </Link>
        </div>

        {/* ——— md+ : header + pinned scrub gallery ——— */}
        <div className="hidden md:block h-full">

          {/* Header + thumbnail nav row */}
          <div ref={headerRef} className="max-w-6xl w-full mx-auto px-6 pt-6 pb-4 flex items-center justify-between gap-6 shrink-0">
            <div>
              <FadeUp>
                <span className="block font-mono text-[10px] uppercase tracking-[0.35em] text-stone-500 dark:text-zinc-400 mb-1">
                  Selected Projects
                </span>
              </FadeUp>
              <SectionReveal>
                <h2 className="text-3xl xl:text-4xl font-display font-black uppercase leading-[0.95] tracking-tighter text-stone-900 dark:text-zinc-50">
                  Featured Work
                </h2>
              </SectionReveal>
            </div>

            {/* Thumbnail navigation */}
            <div className="flex items-center gap-3 shrink-0">
              {featured.map((p, i) => {
                const isActive = activeIndex === i
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => scrollToProject(i)}
                    className="group flex flex-col items-center gap-1.5 outline-none"
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1 : 0.85 }}
                      transition={{ type: "spring", stiffness: 340, damping: 28, mass: 0.72 }}
                      className="relative h-14 w-24 shrink-0 overflow-hidden rounded-sm border border-stone-200 dark:border-zinc-800"
                    >
                      <img
                        src={p.image}
                        alt=""
                        width={160}
                        height={90}
                        loading="eager"
                        draggable={false}
                        referrerPolicy="no-referrer"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      />
                      {isActive && (
                        <motion.span
                          layoutId="projects-active-frame"
                          className="pointer-events-none absolute inset-0 z-30 rounded-sm border-2 border-stone-900/45 dark:border-zinc-100/45"
                          transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                        />
                      )}
                      {!isActive && (
                        <span className="pointer-events-none absolute inset-0 z-20 bg-stone-100/50 dark:bg-zinc-900/50" />
                      )}
                    </motion.div>
                    <span className="relative h-1.5 w-1.5">
                      {isActive ? (
                        <motion.span
                          layoutId="projects-active-dot"
                          className="absolute inset-0 rounded-full bg-stone-900 dark:bg-zinc-100"
                          transition={{ type: "spring", stiffness: 460, damping: 32, mass: 0.6 }}
                        />
                      ) : (
                        <span className="absolute inset-0 rounded-full bg-stone-400/40 transition-colors group-hover:bg-stone-400/60" />
                      )}
                    </span>
                  </button>
                )
              })}
              <Link
                to="/projects"
                className="ml-4 inline-flex items-center gap-3 bg-stone-900 dark:bg-zinc-100 px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-50 dark:text-zinc-900 transition-colors hover:bg-stone-800 dark:hover:bg-zinc-200"
              >
                View all
              </Link>
            </div>
          </div>

          {/* ——— Gallery viewport ——— */}
          <div className="w-full mx-auto px-6 pb-4" style={{ maxWidth: galleryMaxWidth }}>
            <div ref={viewportRef} className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '4 / 3' }}>

              {/* Scrolling card track — translateY driven by scroll progress */}
              <motion.div
                ref={trackRef}
                className="absolute inset-x-0 top-0 will-change-transform"
                style={{ y: trackY }}
              >
                {featured.map((p, i) => (
                  <div
                    key={p.id}
                    className="group/card overflow-hidden rounded-lg bg-stone-900 dark:bg-zinc-950 shadow-2xl cursor-pointer"
                    style={{
                      aspectRatio: '4 / 3',
                      width: '100%',
                      marginBottom: i < featured.length - 1 ? CARD_GAP : 0,
                    }}
                    onClick={() => navigate(`/projects?open=${p.id}`)}
                  >
                    <div className="relative h-full w-full overflow-hidden">
                      <div className="relative h-full w-full origin-center transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-full w-full object-cover object-center"
                          loading={i === 0 ? "eager" : "lazy"}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Info overlay — stays in place while cards scroll behind */}
              <div
                className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between"
              >
                {/* Top: Counter + Title + Category + Tags */}
                <div className="bg-gradient-to-b from-black/75 via-black/35 to-transparent px-6 sm:px-8 xl:px-12 pb-20 pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/55">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                  </p>
                  <h3
                    className="mt-3 min-h-[2.6em] max-w-[95%] font-display font-black uppercase leading-[0.95] tracking-tight text-white text-[clamp(1.15rem,2.1vw,1.85rem)]"
                    aria-live="polite"
                  >
                    {typedTitle}
                  </h3>
                  <div className="mt-2 min-h-5">
                    <p
                      key={`cat-${activeIndex}`}
                      className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-white/65"
                    >
                      {categoryLabel(project)}
                    </p>
                  </div>
                  <div key={`tech-${activeIndex}`} className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white/85"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: Progress bars + scroll hint */}
                <div className="px-6 sm:px-8 xl:px-12 pb-5 bg-gradient-to-t from-black/60 via-black/20 to-transparent pt-12">
                  <div className="flex gap-1.5">
                    {featured.map((p, i) => (
                      <div
                        key={p.id}
                        className="h-[2px] min-w-0 flex-1 overflow-hidden rounded-full bg-white/20"
                      >
                        <div
                          className="h-full origin-left rounded-full bg-white transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{
                            transform: `scaleX(${i === activeIndex ? 1 : i < activeIndex ? 1 : 0.15})`,
                            opacity: i === activeIndex ? 1 : i < activeIndex ? 0.5 : 0.3,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-center font-mono text-[8px] uppercase tracking-[0.28em] text-white/45">
                    Scroll to scrub · Click a project to open
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
