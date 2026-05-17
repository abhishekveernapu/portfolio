import { useEffect, useState, useRef } from "react"
import { Command } from "cmdk"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Home, User, Code2, Briefcase, Mail,
  FolderOpen, Sun, Moon, Download, Copy,
} from "lucide-react"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/SocialIcons"
import { useTheme } from "@/context/ThemeContext"
import { personal } from "@/data/personal"

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const scrollTo = (id) => {
    setOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Command Menu */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-[9999] w-full max-w-lg"
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Command
              className="rounded-2xl border border-stone-200 dark:border-zinc-800 bg-stone-50 dark:bg-zinc-900 shadow-2xl overflow-hidden"
              label="Command Menu"
            >
              <div className="flex items-center gap-2 px-4 border-b border-stone-200 dark:border-zinc-800">
                <Search size={16} className="text-stone-400" />
                <Command.Input
                  placeholder="Type a command or search..."
                  className="w-full py-4 text-sm bg-transparent text-stone-900 dark:text-zinc-100 placeholder:text-stone-400 outline-none"
                />
              </div>

              <Command.List className="max-h-72 overflow-y-auto p-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-stone-400">
                  No results found.
                </Command.Empty>

                <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-stone-400 uppercase tracking-wider">
                  <Command.Item onSelect={() => scrollTo("home")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <Home size={16} /> Home
                  </Command.Item>
                  <Command.Item onSelect={() => scrollTo("about")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <User size={16} /> About
                  </Command.Item>
                  <Command.Item onSelect={() => scrollTo("skills")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <Code2 size={16} /> Skills
                  </Command.Item>
                  <Command.Item onSelect={() => scrollTo("projects")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <FolderOpen size={16} /> Projects
                  </Command.Item>
                  <Command.Item onSelect={() => scrollTo("contact")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <Mail size={16} /> Contact
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-stone-200 dark:bg-zinc-800" />

                <Command.Group heading="Actions" className="px-2 py-1.5 text-xs font-medium text-stone-400 uppercase tracking-wider">
                  <Command.Item onSelect={() => { toggleTheme(); setOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                    Toggle Theme
                  </Command.Item>
                  <Command.Item onSelect={copyEmail} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <Copy size={16} /> {copied ? "Copied!" : "Copy Email"}
                  </Command.Item>
                  <Command.Item onSelect={() => window.open(personal.resumeUrl, "_blank")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <Download size={16} /> Download Resume
                  </Command.Item>
                </Command.Group>

                <Command.Separator className="my-1 h-px bg-stone-200 dark:bg-zinc-800" />

                <Command.Group heading="Social" className="px-2 py-1.5 text-xs font-medium text-stone-400 uppercase tracking-wider">
                  <Command.Item onSelect={() => window.open(personal.social.github, "_blank")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <GithubIcon size={16} /> GitHub
                  </Command.Item>
                  <Command.Item onSelect={() => window.open(personal.social.linkedin, "_blank")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <LinkedinIcon size={16} /> LinkedIn
                  </Command.Item>
                  <Command.Item onSelect={() => window.open(personal.social.twitter, "_blank")} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-stone-700 dark:text-zinc-300 cursor-pointer hover:bg-stone-100 dark:hover:bg-zinc-800 data-[selected=true]:bg-stone-100 dark:data-[selected=true]:bg-zinc-800">
                    <TwitterIcon size={16} /> Twitter
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between px-4 py-2.5 border-t border-stone-200 dark:border-zinc-800 text-xs text-stone-400">
                <span>Navigate with ↑↓ · Select with ↵</span>
                <kbd className="px-1.5 py-0.5 rounded bg-stone-200 dark:bg-zinc-800 text-stone-500 font-mono text-[10px]">ESC</kbd>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
