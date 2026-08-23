"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const videoContainerRef = useRef(null);
  const loaderRef = useRef(null);
  const loaderCounterRef = useRef(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.style.overflow = "hidden";

    // Initial hidden state setup for background video (slightly scaled up to ease in)
    gsap.set(videoContainerRef.current, { autoAlpha: 0, scale: 1.05 });

    const tl = gsap.timeline({
      onComplete: () => {
        setLoaderDone(true);
        document.body.style.overflow = "";
      },
    });

    const counter = { value: 0 };

    // Loader counter 0 → 100
    tl.to(
      counter,
      {
        value: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (loaderCounterRef.current) {
            loaderCounterRef.current.innerText = `${Math.floor(counter.value)}`;
          }
        },
      },
      "start"
    );

    // Loader slide up reveal
    tl.to(
      loaderRef.current,
      {
        y: "-100%",
        duration: 1.1,
        ease: "power3.out",
      },
      "start+=1.8"
    );

    // Fade counter out
    tl.to(
      loaderCounterRef.current,
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "start+=1.6"
    );

    // Background video reveal (fade & scale down to 1)
    tl.to(
      videoContainerRef.current,
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
      },
      "start+=2.0"
    );

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  const handleScrollToWork = (e) => {
    e.preventDefault();
    const target = document.getElementById("projects-section") || document.getElementById("about");
    if (target) {
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(target, { offset: 0, duration: 1.4 });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Framer Motion reveal variants (triggered once loader is finished)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 2.2, // starts after loader slides up
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const rightColumnVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
        delay: 2.4
      }
    }
  };

  const bottomBarVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
        delay: 2.6
      }
    }
  };

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      ),
      title: "DESIGN",
      desc: "Crafting clean, user-centered designs that make impact."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      ),
      title: "DEVELOPMENT",
      desc: "Building robust, scalable and high-performance web apps."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
        </svg>
      ),
      title: "FULL STACK",
      desc: "End to end development using modern technologies."
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.5 16.5c-1.5 1.26-2 3.43-2 3.43s2.17-.5 3.43-2c1.26-1.5 2-3.43 2-3.43s-2.17.5-3.43 2z"/>
          <path d="M12 15l-3-3m0 0l-1.5 1.5M9 12h-3m3 3v3"/>
          <path d="M19 5c-3 0-7.5 3.5-9 6.5l2.5 2.5c3-1.5 6.5-6 6.5-9z"/>
        </svg>
      ),
      title: "PROBLEM SOLVER",
      desc: "Turning ideas into digital solutions that create value."
    }
  ];

  return (
    <>
      {/* Loader Overlay */}
      <div
        id="loader"
        ref={loaderRef}
        style={{
          backgroundColor: "#111111",
          zIndex: 100002,
        }}
      >
        <div
          id="loader-counter"
          ref={loaderCounterRef}
          style={{
            color: "#F5F1EA",
            fontFamily: "'Druk Condensed', 'Barlow Condensed', 'Anton', sans-serif",
            fontWeight: 800,
            fontSize: "8vw",
            letterSpacing: "0.02em",
          }}
        >
          0
        </div>
      </div>

      {/* Hero Section Container */}
      <section
        id="hero-section"
        ref={sectionRef}
        className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center select-none transition-colors duration-300 py-24 lg:py-0 px-6 sm:px-12 lg:px-20 overflow-hidden"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        {/* Background Video */}
        <div
          ref={videoContainerRef}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden"
        >
          <video
            src="/hero-bg-video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
          {/* Theme adaptive overlay to guarantee text legibility */}
          <div className="absolute inset-0 bg-bg/85 backdrop-blur-[1px] dark:bg-bg/90" />
        </div>

        {/* Content Layout Grid */}
        <div className="relative z-10 w-full max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading + Call to Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={loaderDone ? "visible" : "hidden"}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <motion.span
              variants={itemVariants}
              className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-fg-muted/80 uppercase mb-4"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              HELLO, I'M DEV
            </motion.span>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl xl:text-[3.8rem] font-black uppercase leading-[1.05] tracking-tight text-fg mb-6"
              style={{ fontFamily: "'AeonikBold', 'Neue Montreal', sans-serif" }}
            >
              UI/UX DESIGNER <br />
              & FULL STACK <br />
              WEB DEVELOPER
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="w-16 h-[1.5px] bg-fg/20 my-2"
            />

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-fg-muted leading-relaxed mb-8 mt-4 max-w-[45ch]"
              style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
            >
              I design intuitive interfaces and build scalable web applications that solve real world problems.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6"
            >
              <a
                href="#projects-section"
                onClick={handleScrollToWork}
                className="px-6 py-3 bg-fg text-bg hover:bg-fg/90 rounded-full flex items-center gap-2 text-sm font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-sm"
                style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
              >
                <span>View My Work</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"/>
                  <polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>

              <a
                href="#"
                className="text-sm font-semibold hover:text-fg/80 flex items-center gap-1.5 pb-1 border-b border-current transition-all"
                style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
              >
                <span>Download CV</span>
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <polyline points="19 12 12 19 5 12"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Features + Tech Stack */}
          <motion.div
            variants={rightColumnVariants}
            initial="hidden"
            animate={loaderDone ? "visible" : "hidden"}
            className="lg:col-span-6 flex flex-col gap-8 w-full max-w-md lg:ml-auto"
          >
            {/* Features Vertical List */}
            <div className="flex flex-col">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 py-4 border-b border-fg/10 last:border-b-0"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-fg/5 border border-fg/10 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold uppercase tracking-wider text-fg"
                      style={{ fontFamily: "'AeonikMedium', sans-serif" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-xs sm:text-sm text-fg-muted mt-1 leading-relaxed"
                      style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech Stack Row */}
            <div className="flex flex-col">
              <span
                className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-fg-muted/80 uppercase mb-3"
                style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
              >
                TECH STACK
              </span>
              <div className="flex items-center gap-3">
                {/* React Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-fg/5 border border-fg/10 text-fg shadow-sm hover:scale-105 transition-all">
                  <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5 fill-none stroke-current">
                    <circle cx="0" cy="0" r="2" fill="currentColor"/>
                    <g stroke="currentColor" strokeWidth="1">
                      <ellipse rx="11" ry="4.2"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                    </g>
                  </svg>
                </div>
                {/* TypeScript Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-fg/5 border border-fg/10 text-fg shadow-sm hover:scale-105 transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M1.125 0h21.75c.621 0 1.125.504 1.125 1.125v21.75c0 .621-.504 1.125-1.125 1.125H1.125C.504 24 0 23.496 0 22.875V1.125C0 .504.504 0 1.125 0zm17.476 17.228c.414-.143.765-.368 1.053-.675.289-.307.498-.682.627-1.125.13-.443.195-.944.195-1.503v-4.14h-2.1v4.185c0 .323-.056.574-.168.752-.112.179-.272.268-.48.268-.158 0-.294-.047-.408-.142s-.199-.235-.255-.42l-1.92 1.035c.18.525.467.954.862 1.287.396.333.91.5 1.543.5.578 0 1.066-.118 1.463-.352v.015zm-8.88-5.325h-2.58v9.42h-2.22v-9.42h-2.58V9.708h7.38v2.195z"/>
                  </svg>
                </div>
                {/* JavaScript Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-fg/5 border border-fg/10 text-fg shadow-sm hover:scale-105 transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M0 0h24v24H0V0zm20.337 19.384c-.451.954-1.353 1.639-2.52 1.83-1.462.24-2.88-.345-3.525-1.503-.314-.54-.42-.87-.495-1.635h2.295c.045.39.195.69.42.945.315.345.825.525 1.395.525.57 0 1.05-.24 1.29-.63.225-.39.27-.855.27-1.74V9.705h2.52v7.92c0 1.125-.135 1.77-.375 2.159v-.4zM10.14 17.58c.285.555.72 1.005 1.305 1.245.54.225 1.17.27 1.755.15.75-.15 1.365-.6 1.68-1.275.315-.675.315-1.665.015-2.295-.3-.585-.825-.975-1.71-1.35-1.125-.495-1.455-.765-1.785-1.125-.33-.36-.48-.795-.48-1.32 0-.66.27-1.23.825-1.59.39-.255.855-.36 1.395-.36.795 0 1.425.27 1.83.825.33.435.435.81.48 1.485h-2.22c-.03-.36-.15-.6-.39-.78-.24-.18-.54-.255-.9-.255-.42 0-.75.12-.96.345-.195.225-.27.525-.27.855 0 .345.105.615.375.825.27.21.69.42 1.41.735 1.095.48 1.68.87 2.055 1.335.39.465.555 1.05.555 1.785 0 .975-.435 1.815-1.185 2.295-.57.36-1.29.51-1.995.45-.96-.09-1.71-.525-2.145-1.26l1.83-1.095z"/>
                  </svg>
                </div>
                {/* MongoDB Leaf Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-fg/5 border border-fg/10 text-fg shadow-sm hover:scale-105 transition-all">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.153 10.74c-.588-3.328-2.616-6.67-4.472-8.39a.747.747 0 0 0-1.026-.002c-1.854 1.712-3.89 5.048-4.49 8.375-.688 3.82.502 7.743 3.125 9.877a.64.64 0 0 0 .153.093c.196.096.42.143.64.143.208 0 .42-.047.608-.135a.8.8 0 0 0 .16-.097c2.62-2.14 3.803-6.05 3.102-9.864zM12 19.382V3.79c1.173 1.34 2.8 4.248 3.262 6.877.534 3.012-.345 6.092-2.316 7.828.188-.363.385-.758.558-1.186a23.14 23.14 0 0 0 .61-2.023.75.75 0 1 0-1.442-.406 20.316 20.316 0 0 1-.58 1.91c-.035.1-.07.195-.102.292z"/>
                  </svg>
                </div>
                {/* Ellipsis / Dots Icon */}
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-fg/5 border border-fg/10 text-fg shadow-sm hover:scale-105 transition-all text-xs font-black tracking-tighter">
                  •••
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Bottom Bar (Desktop Layout) */}
        <motion.div
          variants={bottomBarVariants}
          initial="hidden"
          animate={loaderDone ? "visible" : "hidden"}
          className="absolute bottom-6 left-6 right-6 h-14 bg-[#0B0C10]/95 backdrop-blur-md border border-white/10 text-[#E3E4E6] rounded-full hidden lg:flex items-center justify-between px-8 z-30 shadow-lg"
        >
          {/* Social Links */}
          <div className="flex items-center gap-5">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56"/></svg>
            </a>
          </div>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-white/20" />

          {/* Inspirational Quote */}
          <p
            className="text-xs font-medium text-[#E3E4E6]/75 italic uppercase tracking-wider"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            "Code is like humor. When you have to explain it, it's bad."
          </p>

          {/* Divider */}
          <div className="h-4 w-[1px] bg-white/20" />

          {/* Scroll Down Action */}
          <a
            href="#projects-section"
            onClick={handleScrollToWork}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-white transition-all"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            <span>Scroll Down</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 animate-bounce fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="19 12 12 19 5 12"/>
            </svg>
          </a>
        </motion.div>

        {/* Bottom Bar (Mobile Layout - inline block flow at bottom) */}
        <motion.div
          variants={bottomBarVariants}
          initial="hidden"
          animate={loaderDone ? "visible" : "hidden"}
          className="w-full bg-[#0B0C10]/95 backdrop-blur-md border border-white/10 text-[#E3E4E6] rounded-2xl p-6 flex flex-col items-center gap-4 z-30 mt-12 lg:hidden shadow-lg"
        >
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56"/></svg>
            </a>
          </div>

          <div className="w-full h-[1px] bg-white/10" />

          {/* Quote */}
          <p
            className="text-xs font-medium text-[#E3E4E6]/75 italic text-center uppercase tracking-wider"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            "Code is like humor. When you have to explain it, it's bad."
          </p>

          <div className="w-full h-[1px] bg-white/10" />

          {/* Scroll Down */}
          <a
            href="#projects-section"
            onClick={handleScrollToWork}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-white transition-all"
            style={{ fontFamily: "'Neue Montreal', 'Inter', sans-serif" }}
          >
            <span>Scroll Down</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 animate-bounce fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="19 12 12 19 5 12"/>
            </svg>
          </a>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
