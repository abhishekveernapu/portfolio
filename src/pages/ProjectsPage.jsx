import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Search, X, ExternalLink, ArrowUpRight } from "lucide-react"
import { FadeUp } from "@/components/effects/TextReveal"
import SectionReveal from "@/components/effects/SectionReveal"
import { projects } from "@/data/projects"
import Navbar from "@/components/layout/Navbar"

/* ─── Shared easing & spring configs ─── */
const ease = [0.22, 1, 0.36, 1]

// Buttery spring for layout shifts — slightly underdamped for that premium feel
const layoutSpring = {
  type: "spring",
  stiffness: 180,
  damping: 26,
  mass: 0.9,
}

// Softer spring for expand/collapse height
const expandSpring = {
  type: "spring",
  stiffness: 145,
  damping: 24,
  mass: 1.1,
}

/* ─── Collapsed Project Card ─── */
function ProjectCard({ project, index, isExpanded, onExpand }) {
  return (
    <motion.div
      layout
      layoutId={`card-container-${project.id}`}
      transition={layoutSpring}
      className={`group cursor-pointer ${isExpanded ? "ring-2 ring-stone-900/15 dark:ring-zinc-100/15 rounded-2xl" : ""}`}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.28, ease } }}
      transition={{
        layout: layoutSpring,
        opacity: { duration: 0.55, delay: index * 0.07, ease },
        y: { duration: 0.66, delay: index * 0.07, ease },
        scale: { duration: 0.55, delay: index * 0.07, ease },
      }}
      onClick={() => onExpand(project.id)}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 dark:bg-zinc-800/60"
        style={{ transform: "translateZ(0)" }} // force GPU layer
      >
        {project.image && !project.image.endsWith(".jpg") ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            loading="lazy"
            referrerPolicy="no-referrer"
            style={{ willChange: "transform", transform: "translateZ(0)" }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-300 dark:from-zinc-700 dark:to-zinc-800">
            <span className="text-[140px] font-display font-black text-stone-300/60 dark:text-zinc-600/60 select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <motion.div
        className="mt-5 flex flex-col gap-2.5"
        layout="position"
        transition={layoutSpring}
      >
        <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1">
          <h2 className="text-lg md:text-xl font-display font-bold text-stone-900 dark:text-zinc-50 tracking-tight leading-snug">
            {project.title}
          </h2>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-full border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800/70 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-zinc-400 leading-none">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm text-stone-400 dark:text-zinc-500 leading-relaxed">
          <span className="text-stone-300 dark:text-zinc-600 mr-1.5">/</span>
          {project.subtitle || project.description}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Full-width expanded panel (image + info side-by-side, highlights below) ─── */
function ExpandedPanel({ project, isLeftSide, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  // Stagger children with smoother orchestration
  const contentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.17,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.55,
        ease,
      },
    },
  }

  return (
    <motion.div
      ref={panelRef}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        height: expandSpring,
        opacity: { duration: 0.33, ease: [0.4, 0, 0.2, 1] },
      }}
      style={{ overflow: "hidden", willChange: "height, opacity" }}
      className="scroll-mt-24"
    >
      <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 mt-6">
        {/* Top: Image + Info side-by-side */}
        <div className={`flex flex-col md:flex-row ${!isLeftSide ? "md:flex-row-reverse" : ""}`}>
          {/* Image */}
          <div
            className="relative w-full md:w-1/2 aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-zinc-800/60"
            style={{ transform: "translateZ(0)" }}
          >
            {project.image && !project.image.endsWith(".jpg") ? (
              <motion.img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
                initial={{ scale: 1.08, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.88, ease }}
                style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-300 dark:from-zinc-700 dark:to-zinc-800">
                <span className="text-[140px] font-display font-black text-stone-300/60 dark:text-zinc-600/60 select-none">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div
            className="w-full md:w-1/2 p-8 md:p-10 lg:p-12 flex flex-col justify-center relative"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 rounded-full bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 transition-all duration-300 z-10 hover:scale-110 active:scale-95"
              aria-label="Close"
            >
              <X size={16} className="text-stone-600 dark:text-zinc-400" />
            </button>

            <motion.h2 variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight text-stone-900 dark:text-zinc-50 mb-3">
              {project.title}
            </motion.h2>
            <motion.p variants={itemVariants}
              className="text-sm md:text-base text-stone-500 dark:text-zinc-400 leading-relaxed mb-6">
              {project.subtitle}
            </motion.p>

            <motion.div variants={itemVariants}>
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-zinc-500 mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.33 + i * 0.045, duration: 0.39, ease }}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-zinc-800 border border-stone-200 dark:border-zinc-700 text-xs font-mono text-stone-600 dark:text-zinc-400"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 dark:bg-zinc-100 text-stone-50 dark:text-zinc-900 text-sm font-medium hover:bg-stone-700 dark:hover:bg-zinc-300 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]">
                  <ExternalLink size={14} /> Source Code
                </a>
              )}
              {project.links.live && project.links.live !== "#" && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-stone-300 dark:border-zinc-700 text-stone-700 dark:text-zinc-300 text-sm font-medium hover:bg-stone-100 dark:hover:bg-zinc-800 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]">
                  <ArrowUpRight size={14} /> Live Demo
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom: Highlights */}
        {project.highlights?.length > 0 && (
          <div className="px-8 md:px-10 lg:px-12 pb-8 md:pb-10 lg:pb-12">
            <div className="border-t border-stone-200 dark:border-zinc-800 pt-6 md:pt-8">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.33, duration: 0.55, ease }}
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 dark:text-zinc-500 mb-5"
              >
                Key Highlights
              </motion.h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                {project.highlights.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.39 + i * 0.07, duration: 0.5, ease }}
                    className="flex items-start gap-3"
                  >
                    <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-zinc-500" />
                    <span className="text-sm leading-relaxed text-stone-600 dark:text-zinc-400">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Page ─── */
export default function ProjectsPage() {
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedId, setExpandedId] = useState(null)

  // Auto-expand project from ?open=<id> query param
  useEffect(() => {
    const openId = searchParams.get("open")
    if (openId) {
      const id = Number(openId)
      if (projects.some((p) => p.id === id)) {
        setExpandedId(id)
      }
    }
  }, [searchParams])

  const handleExpand = useCallback(
    (id) => setExpandedId((prev) => (prev === id ? null : id)),
    []
  )
  const handleClose = useCallback(() => setExpandedId(null), [])

  const filteredProjects = useMemo(() => {
    if (searchQuery.trim() === "") return projects
    return projects.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery])

  const expandedProject = expandedId
    ? filteredProjects.find((p) => p.id === expandedId)
    : null

  // Find the expanded project's position
  const expandedIndex = expandedProject
    ? filteredProjects.indexOf(expandedProject)
    : -1
  const isLeftSide = expandedIndex % 2 === 0

  // Row-based splitting: find the row the expanded card belongs to
  // Row-mate goes DOWN below the panel, not above
  const rowStart = expandedIndex > -1
    ? expandedIndex - (expandedIndex % 2)  // start of the row (even index)
    : -1

  // Projects from COMPLETE rows before the expanded row
  const projectsBefore = rowStart > 0
    ? filteredProjects.slice(0, rowStart)
    : []

  // The row-mate (other card in the same row) + all projects after the expanded row
  const projectsAfter = useMemo(() => {
    if (expandedIndex < 0) return []
    const rowEnd = rowStart + 2 // end of the 2-card row
    const rowMate = filteredProjects.slice(rowStart, rowEnd).filter(p => p.id !== expandedId)
    const remaining = filteredProjects.slice(rowEnd)
    return [...rowMate, ...remaining]
  }, [filteredProjects, expandedId, expandedIndex, rowStart])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />

      <main className="min-h-screen w-full overflow-x-hidden">
        <section className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-14" aria-label="All projects">
          {/* Header */}
          <header className="pt-28 md:pt-36 pb-12 md:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-12">
            <SectionReveal>
              <h1 className="font-display font-bold tracking-tight text-stone-900 dark:text-zinc-50 leading-[0.95]"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
                Projects.
              </h1>
            </SectionReveal>
            <FadeUp delay={0.15}>
              <p className="text-sm md:text-base text-stone-400 dark:text-zinc-500 max-w-md md:text-right md:pb-2 leading-relaxed">
                Some of my favorite projects I've created in the last few years.
              </p>
            </FadeUp>
          </header>

          {/* Search */}
          <FadeUp delay={0.25}>
            <div className="mb-14 md:mb-18">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-zinc-500 pointer-events-none" />
                <input id="project-search" type="text" placeholder="Search projects..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-stone-100 dark:bg-zinc-800/70 pl-11 pr-5 py-2.5 text-sm text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 dark:placeholder:text-zinc-500 outline-none border border-transparent focus:border-stone-300 dark:focus:border-zinc-600 transition-all duration-300" />
              </div>
            </div>
          </FadeUp>

          {/* ─── Projects Flow ─── */}
          <LayoutGroup>
            <div className="pb-24 md:pb-32">

              {/* When nothing is expanded — show all projects in normal grid */}
              {!expandedProject && filteredProjects.length > 0 && (
                <motion.div
                  layout
                  transition={layoutSpring}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-x-10"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, i) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={i}
                        isExpanded={false}
                        onExpand={handleExpand}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Complete rows BEFORE the expanded row — normal 2-col grid */}
              {expandedProject && projectsBefore.length > 0 && (
                <motion.div
                  layout
                  transition={layoutSpring}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-x-10"
                >
                  {projectsBefore.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      isExpanded={false}
                      onExpand={handleExpand}
                    />
                  ))}
                </motion.div>
              )}

              {/* Expanded panel — full width */}
              <AnimatePresence mode="wait">
                {expandedProject && (
                  <motion.div
                    key={`panel-wrapper-${expandedProject.id}`}
                    layout
                    transition={layoutSpring}
                    className={projectsBefore.length > 0 ? "mt-14 md:mt-16" : ""}
                  >
                    <ExpandedPanel
                      key={`panel-${expandedProject.id}`}
                      project={expandedProject}
                      isLeftSide={isLeftSide}
                      onClose={handleClose}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Row-mate + remaining cards — flowing 2-col grid below the panel */}
              {expandedProject && projectsAfter.length > 0 && (
                <motion.div
                  key={`after-${expandedId}`}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{
                    layout: layoutSpring,
                    opacity: { duration: 0.5, delay: 0.11, ease },
                    y: { duration: 0.55, delay: 0.11, ease },
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 md:gap-x-10 mt-14 md:mt-16"
                >
                  {projectsAfter.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={i}
                      isExpanded={false}
                      onExpand={handleExpand}
                    />
                  ))}
                </motion.div>
              )}

              {/* No results found */}
              {filteredProjects.length === 0 && (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p className="text-stone-400 dark:text-zinc-500 text-lg">No projects found matching your criteria.</p>
                </motion.div>
              )}
            </div>
          </LayoutGroup>
        </section>
      </main>
    </motion.div>
  )
}
