import { useState } from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ScrollProgress from "@/components/layout/ScrollProgress"

import CommandMenu from "@/components/ui/CommandMenu"
import Loader from "@/components/sections/Loader"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Skills from "@/components/sections/Skills"
import FeaturedProjects from "@/components/sections/FeaturedProjects"
import Contact from "@/components/sections/Contact"
import ProjectsPage from "@/pages/ProjectsPage"

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      {/* Global Overlays */}

      <CommandMenu />
      <ScrollProgress />

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main Content */}
      {!loading && <AnimatedRoutes />}
    </BrowserRouter>
  )
}
