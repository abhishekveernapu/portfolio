import { useEffect, useState } from "react"

export function useScrollSpy(sectionIds, offset = 100) {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      // If user is near the bottom of the page, activate the last section
      const scrollBottom = window.scrollY + window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      if (docHeight - scrollBottom < 100) {
        setActiveSection(sectionIds[sectionIds.length - 1] || "")
        return
      }

      const scrollPosition = window.scrollY + offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i])
        if (element) {
          const rect = element.getBoundingClientRect()
          const top = rect.top + window.scrollY
          if (top <= scrollPosition) {
            setActiveSection(sectionIds[i])
            return
          }
        }
      }
      setActiveSection(sectionIds[0] || "")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
