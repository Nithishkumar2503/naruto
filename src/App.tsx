import {
  About,
  Akatsuki,
  CharacterDetails,
  Clans,
  Contact,
  Documents,
  Kara,
  KekkeiGenkkai,
  Main,
  TailedBeast,
  Teams,
  Villages,
} from "./pages";
import { Character } from "./pages";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import GlassNavbar from "./components/GlassNavbar";
import { AnimatePresence } from "framer-motion";

function AppContent() {
  const location = useLocation();

  return (
    <>
      <GlassNavbar />
      <div className="min-h-screen  bg-background overflow-x-hidden">
        <img
          loading="lazy"
          className="fixed inset-0 w-full h-full z-0 opacity-10 object-cover
          bg-[url('/akatsuki-cloud.png')]
          bg-repeat
          "
          alt=""
        />
        <div className="relative z-10 min-h-screen">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" Component={Main}></Route>
                <Route path="/about" Component={About}></Route>
                <Route path="/contact" Component={Contact}></Route>
                <Route path="/characters" Component={Character}></Route>
                <Route path="/kekkei-genkai" Component={KekkeiGenkkai}></Route>
                <Route path="/tailed-beasts" Component={TailedBeast}></Route>
                <Route
                  path="/tailed-beasts/:id"
                  Component={CharacterDetails}
                ></Route>
                <Route path="/teams" Component={Teams}></Route>
                <Route path="/docs" Component={Documents}></Route>
                <Route path="/akatsuki" Component={Akatsuki}></Route>
                <Route
                  path="/akatsukie/:akatsukiId"
                  Component={CharacterDetails}
                ></Route>
                <Route path="/kara" Component={Kara}></Route>
                <Route path="/kara/:id" Component={CharacterDetails}></Route>
                <Route path="/villages" Component={Villages}></Route>
                <Route path="/clans" Component={Clans}></Route>
                <Route path="/characters/:charId" Component={CharacterDetails} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <footer className="relative z-20 border-t border-white/10 bg-card/50 backdrop-blur-sm py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <a className="hover:text-accent transition-colors" href="/">Home</a>
              <span className="text-white/20">•</span>
              <a className="hover:text-accent transition-colors" href="/contact">Contact us</a>
              <span className="text-white/20">•</span>
              <a className="hover:text-accent transition-colors" href="/docs">Docs</a>
              <span className="text-white/20">•</span>
              <a className="hover:text-accent transition-colors" href="/about">About us</a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Nithishkumar2503"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .5C5.37.5 0 5.87 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61-.55-1.42-1.34-1.8-1.34-1.8-1.1-.75.09-.74.09-.74 1.22.09 1.85 1.25 1.85 1.25 1.08 1.85 2.81 1.31 3.5 1.01.1.78-.42 1.31-.59 1.61-.15.2-2.67.89-3.23 2.31-.24.56.26 1.76.78 2.33.42.33 1.24 1.21 3.44 1.21 3.44.72 1.95 2.57 1.32 3.44 1z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/nithishkumar-shanmugam/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.526c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.566H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.848 3.369-1.848 3.6 0 4.267 2.37 4.267 5.455v5.99zM5.337 7.433c-1.144 0-2.063-.925-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.141 0 2.063.925 2.063 2.063 0 1.139-.922 2.065-2.063 2.065m1.777 13.019H3.555V9h3.554zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.203 24 24 23.227 24 22.271V1.729C24 .774 23.203 0 22.222 0z" />
                </svg>
              </a>
            </div>

            <blockquote className="text-xs italic text-text-secondary max-w-xs text-center sm:text-right">
              "No matter how hard or impossible it is, I'll always reach my dreams!" — Naruto Uzumaki
            </blockquote>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
