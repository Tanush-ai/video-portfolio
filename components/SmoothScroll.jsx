/**
 * @file components/SmoothScroll.jsx
 * Why this code exists:
 * Initializes Lenis smooth scrolling and synchronizes scroll updates with GSAP ScrollTrigger,
 * ensuring high-performance momentum scrolling throughout the application.
 */

"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SmoothScroll component wraps children with Lenis smooth scroll provider
 * and registers GSAP ticker integration.
 * 
 * Tricky logic:
 * Exposes Lenis instance globally as `window.__lenis` so navigation buttons and anchor links
 * can trigger animated scroll events smoothly without breaking GSAP pin triggers.
 * 
 * TODO: Add option to disable smooth scroll on low-power devices if performance degrades.
 * 
 * @param {Object} props - React component props
 * @param {React.ReactNode} props.children - Child elements to wrap with smooth scrolling
 * @returns {React.ReactNode} Rendered children
 */
const SmoothScroll = ({ children }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      syncTouch: true,
      smoothTouch: true,
      touchMultiplier: 1.5,
    });
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      if (typeof window !== "undefined" && window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);
  return children;
};

export default SmoothScroll;
