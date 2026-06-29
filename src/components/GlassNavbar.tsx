import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function GlassNavbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/characters", label: "Characters" },
    { path: "/clans", label: "Clans" },
    { path: "/villages", label: "Villages" },
    { path: "/tailed-beasts", label: "Tailed Beasts" },
    { path: "/teams", label: "Teams" },
    { path: "/akatsuki", label: "Akatsuki" },
    { path: "/kara", label: "Kara" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-background/80 backdrop-blur-xl shadow-2xl px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src="/leaflogo.png" alt="Leaf Logo" className="h-10 w-10" />
              <span className="text-xl font-black tracking-wider text-white hidden sm:block">
                NARUTO<span className="text-accent">EXPLORER</span>
              </span>
            </Link>

            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive(link.path)
                      ? "text-accent"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-xl bg-white/5"
                      initial={false}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="hidden md:flex items-center gap-3">
                <a
                  href="https://github.com/Nithishkumar2503"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .5C5.37.5 0 5.87 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.06-.02-2.08-3.34.73-4.04-1.61-4.04-1.61-.55-1.42-1.34-1.8-1.34-1.8-1.1-.75.09-.74.09-.74 1.22.09 1.85 1.25 1.85 1.25 1.08 1.85 2.81 1.31 3.5 1.01.1.78-.42 1.31-.59 1.61-.15.2-2.67.89-3.23 2.31-.24.56.26 1.76.78 2.33.42.33 1.24 1.21 3.44 1.21 3.44.72 1.95 2.57 1.32 3.44 1z" />
                  </svg>
                </a>
              </div>

              <button
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-text-secondary hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Theme toggle"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75S6.615 2.25 12 2.25c.993 0 1.96.162 2.88.457a.75.75 0 01-.52 1.374A8.268 8.268 0 0012 3.75c-4.556 0-8.25 3.694-8.25 8.25S7.444 20.25 12 20.25c4.556 0 8.25-3.694 8.25-8.25 0-1.47-.396-2.84-1.086-4.025a.75.75 0 01.162-.162z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default GlassNavbar;
