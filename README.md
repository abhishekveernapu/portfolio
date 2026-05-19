# 🚀 Abhishek Veernapu — Portfolio

A modern, responsive personal portfolio website built with React, Vite, and Tailwind CSS — showcasing my projects, skills, and experience as an AI & Data Science developer.

## ✨ Features

- ⚡ Lightning-fast development with **Vite 8**
- 🎨 Utility-first styling with **Tailwind CSS v4**
- 🎞️ Smooth animations powered by **Framer Motion**
- 🔀 Client-side routing via **React Router v7**
- 🌙 Clean, minimal UI with `lucide-react` icons
- 📱 Fully responsive across all screen sizes

## 🛠️ Tech Stack

| Category      | Technology                          |
|---------------|--------------------------------------|
| Framework     | React 19 + Vite 8                   |
| Styling       | Tailwind CSS v4, tailwind-merge, clsx|
| Animations    | Framer Motion                        |
| Routing       | React Router DOM v7                  |
| Icons         | Lucide React                         |
| Linting       | ESLint 10                            |

## 📂 Project Structure
portfolio/
├── public/ # Static assets
├── src/ # React source code
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-level page components
│ └── main.jsx # App entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
└── .env.example # Environment variable template


## 🚀 Getting Started

### Prerequisites

- Node.js **v18+**
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abhishekveernapu/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

## 🌐 Deployment

This project can be deployed to any static hosting platform:

- **Vercel** — `vercel --prod`
- **Netlify** — Drag & drop the `dist/` folder
- **GitHub Pages** — Use `gh-pages` package with Vite base config
- **Firebase Hosting** — `firebase deploy`

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```env
# See .env.example for all required variables
```

## 📜 Scripts

| Command           | Description                    |
|-------------------|-------------------------------|
| `npm run dev`     | Start development server       |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview production build       |
| `npm run lint`    | Run ESLint                     |

## 👤 Author

**Abhishek Veernapu**
- GitHub: [@abhishekveernapu](https://github.com/abhishekveernapu)
- Location: Guntur, Andhra Pradesh, India

## 📄 License

This project is private and not licensed for redistribution.
