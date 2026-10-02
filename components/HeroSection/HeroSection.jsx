/**
 * @file components/HeroSection/HeroSection.jsx
 * Why this code exists:
 * Displays the main hero section with introductory loader animation, background video,
 * typography headline, resume download CTA, and video play/pause controls.
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

/**
 * HeroSection component with full-screen video background and initial multilingual loader transition.
 * 
 * Tricky logic:
 * Uses a GSAP timeline synchronized with sequential setTimeout text updates to display multilingual greetings
 * ("తనుష్ పోర్ట్ఫోలియో", "तनुष पोर्टफोलियो", "TANUSH V PORTFOLIO") before sliding up loader screen.
 * 
 * TODO: Implement lazy loading or fallback poster image for background video on mobile bandwidth-constrained networks.
 * 
 * @returns {React.ReactElement} Hero section container element
 */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);
  const loaderRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentText, setCurrentText] = useState("తనుష్ పోర్ట్ఫోలియో");

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = "hidden";
    gsap.set(videoContainerRef.current, { autoAlpha: 0, scale: 1.05 });

    // Ensure video begins playing immediately on mount (muted satisfies browser autoplay restrictions)
    if (videoRef.current) {
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaderDone(true);
        document.body.style.overflow = "";
        // Re-verify playback state when loader finishes unveiling hero section
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      },
    });
    tl.to(loaderRef.current, { y: "-100%", duration: 1.1, ease: "power3.out" }, "start+=3.0");
    tl.to(videoContainerRef.current, { autoAlpha: 1, scale: 1, duration: 1.2, ease: "power2.out" }, "start+=3.2");

    const t1 = setTimeout(() => setCurrentText("तनुष पोर्टफोलियो"), 1000);
    const t2 = setTimeout(() => setCurrentText("TANUSH V PORTFOLIO"), 2000);

    return () => {
      tl.kill();
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  /**
   * Scrolls to work/projects section via Lenis smooth scroll provider.
   * @param {React.MouseEvent} e - Click event
   */
  const handleScrollToWork = (e) => {
    e.preventDefault();
    const target = document.getElementById("projects-section") || document.getElementById("about");
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
    } else {
      target?.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * Toggles play and pause states for background HTML5 video element.
   * @returns {void}
   */
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Video play error:", err));
    }
  };

  /**
   * Toggles audio mute and unmute states for the background HTML5 video element.
   * @returns {void}
   */
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <>
      <div id="loader" ref={loaderRef} style={{ backgroundColor: "#111111", zIndex: 100002, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex flex-col items-center justify-center text-center px-4">
          <img src="/avatar-logo.jpg" alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/10 mb-6 object-cover object-top shadow-lg" />
          <div className="h-10 flex items-center justify-center overflow-hidden">
            <motion.div key={currentText} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.35 }} className="text-[#F5F1EA] text-2xl sm:text-4xl font-extrabold tracking-widest uppercase">
              {currentText}
            </motion.div>
          </div>
        </motion.div>
      </div>
      <section id="hero-section" ref={sectionRef} className="relative w-full h-screen min-h-[600px] overflow-hidden select-none">
        <div ref={videoContainerRef} className="absolute inset-0 w-full h-full bg-black">
          <video
            ref={videoRef}
            src="/hero-bg-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <motion.div initial="hidden" animate={loaderDone ? "visible" : "hidden"}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 2.2 } } }}
          className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-12 lg:left-20 z-10 max-w-[480px] p-6 rounded-2xl bg-bg/85 lg:bg-transparent lg:p-0">
          <motion.span variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-xs font-semibold tracking-[0.22em] text-fg-muted/80 uppercase mb-2">HELLO, I'M TANUSH</motion.span>
          <div className="w-12 h-[1.5px] bg-fg/20 mb-6" />
          <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-black uppercase leading-[1.05] tracking-tight text-fg mb-6">
            MLOPS <br />
            Engineer <br />
            <span className="text-fg-muted/65">& AI SYSTEMS</span> <br />
            <span className="text-fg-muted/65">Developer</span>
          </h1>
          <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-8 max-w-[38ch]">Architecting robust AI infrastructure, scalable machine learning systems, and intelligent applications.</p>
          <div className="flex items-center gap-5">
            <a href="#projects-section" onClick={handleScrollToWork} className="px-6 py-3 bg-fg text-bg rounded-full text-xs font-semibold flex items-center gap-2">
              <span>View My Work</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </a>
            {/* Download link targeting Tanush V's updated MLOps & AI Systems resume PDF */}
            <a href="/Tanush_V_Resume.pdf" target="_blank" rel="noopener noreferrer" download="Tanush_V_Resume.pdf" className="text-xs font-semibold border-b border-current flex items-center gap-1.5">
              <span>Download CV</span>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
            </a>
          </div>
        </motion.div>
        {/* Playback & Audio Controls */}
        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2.5">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-bg/85 border border-fg/10 text-fg hover:bg-fg hover:text-bg transition-all active:scale-95 shadow-md"
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
            )}
          </button>
          <button
            onClick={togglePlay}
            className="flex items-center gap-3 bg-bg/85 border border-fg/10 px-4 py-2.5 rounded-full text-fg hover:bg-fg hover:text-bg transition-all active:scale-95 shadow-md"
          >
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase pr-1">
              {isPlaying ? "PAUSE VIDEO" : "PLAY VIDEO"}
            </span>
          </button>
        </div>
      </section>
    </>
  );
}
