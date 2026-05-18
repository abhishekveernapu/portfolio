// Personal information — reads from environment variables with fallbacks
export const personal = {
  name: "Abhishek Veernapu",
  fullName: "Abhishek",
  title: "MERN Stack Developer",
  tagline: "Building fast, scalable web applications.",
  bio: "I'm a passionate MERN Stack Developer who builds production-grade digital products with React, Node.js, Express, and MongoDB. I care about interfaces that feel polished on the surface and stay reliable underneath — with a strong focus on performance, clean code, and user experience.",
  shortBio: "MERN Stack Developer crafting fast, clean web apps for real users.",
  email: import.meta.env.VITE_EMAIL,
  location: "India",
  availability: "Open to opportunities",
  resumeUrl: import.meta.env.VITE_RESUME_URL,
  profileImage: import.meta.env.VITE_PROFILE_IMAGE,
  social: {
    github: import.meta.env.VITE_GITHUB_URL,
    linkedin: import.meta.env.VITE_LINKEDIN_URL,
    twitter: import.meta.env.VITE_TWITTER_URL,
  },
  stats: {
    experience: "2+",
    projects: "10+",
    commits: "500+",
  },
}
