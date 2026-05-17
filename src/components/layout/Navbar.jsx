import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import { useScrollSpy } from "@/hooks/useScrollSpy"
import { personal } from "@/data/personal"
import { useNavigate, useLocation } from "react-router-dom"

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeSection = useScrollSpy(navLinks.map((l) => l.id), 150)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileMenuOpen])

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false)
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
      }, 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      >
        {/* Logo / Name — Left */}
        <motion.button
          onClick={() => scrollToSection("home")}
          className="text-lg font-display font-bold text-stone-900 dark:text-zinc-50 tracking-tight z-10"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {personal.name}
          <span className="text-stone-900 dark:text-zinc-100">.</span>
        </motion.button>

        {/* Center — Floating Pill Nav (saddine-style) */}
        <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-full border border-stone-200/80 dark:border-zinc-800/60 bg-stone-100/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                  activeSection === link.id
                    ? "bg-stone-300 dark:bg-zinc-700 text-stone-900 dark:text-zinc-100"
                    : "text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right — Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-2 z-10">

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="rounded-full p-2 border border-stone-200 dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900 hover:scale-105 transition-all"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu Toggle */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden rounded-full p-2 border border-stone-200 dark:border-zinc-800 bg-stone-100 dark:bg-zinc-900"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-stone-50/95 dark:bg-zinc-950/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-3xl font-display font-semibold tracking-tight transition-colors ${
                    activeSection === link.id
                      ? "text-stone-900 dark:text-zinc-100"
                      : "text-stone-900 dark:text-zinc-100"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
