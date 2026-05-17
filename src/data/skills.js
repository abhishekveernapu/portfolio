import {
  Code2, Server, Database, Wrench, Cloud,
  FileCode2, Palette, Globe, Terminal, GitBranch,
  Box, Cpu, Layers, Smartphone, Settings,
} from "lucide-react"

export const skillCategories = [
  {
    title: "Frontend",
    icon: Code2,
    color: "stone",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 80 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "blue",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express.js", level: 90 },
      { name: "Python", level: 70 },
      { name: "FastAPI", level: 65 },
      { name: "REST APIs", level: 92 },
      { name: "Socket.io", level: 70 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "stone",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "Mongoose", level: 88 },
      { name: "MySQL", level: 65 },
      { name: "Firebase", level: 60 },
      { name: "Redis", level: 55 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    color: "purple",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 85 },
      { name: "Figma", level: 60 },
      { name: "npm / yarn", level: 85 },
      { name: "Chrome DevTools", level: 88 },
    ],
  },
  {
    title: "DevOps",
    icon: Cloud,
    color: "cyan",
    skills: [
      { name: "Docker", level: 55 },
      { name: "Vercel", level: 85 },
      { name: "Netlify", level: 80 },
      { name: "Linux", level: 65 },
      { name: "CI/CD", level: 60 },
      { name: "Nginx", level: 50 },
    ],
  },
]
