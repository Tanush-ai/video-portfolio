/**
 * @file components/HorizontalScroll/HorizontalScroll.jsx
 * Why this code exists:
 * Provides a pinned horizontal marquee scroll section with GSAP ScrollTrigger character-by-character
 * 3D rotation and translation animation as the page is scrolled vertically.
 */

"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT = "I Transform Ideas into Production-Ready Applications.";

/**
 * HorizontalScroll component creating a full-width pinned container animation.
 * 
 * Tricky logic:
 * Pins the section container in place (`pin: stickyRef.current`) while translating the underlying text
 * container horizontally by -110% using a containerAnimation linked ScrollTrigger on individual character spans.
 * 
 * TODO: Adjust xPercent scroll distance calculation based on text string length dynamically.
 * 
 * @returns {React.ReactElement} Pinned horizontal marquee section
 */
export default function HorizontalScroll() {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const chars = textRef.current.querySelectorAll(".hs-char");
      const scrollTween = gsap.to(textRef.current, {
        xPercent: -110, ease: "none",
        scrollTrigger: {
          trigger: stickyRef.current, start: "top top",
          end: () => "+=" + Math.max(textRef.current.scrollWidth - window.innerWidth * 0.1, window.innerWidth),
          scrub: 0.5, pin: stickyRef.current, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });
      chars.forEach((char) => {
        gsap.from(char, {
          yPercent: gsap.utils.random(-200, 200),
          rotation: gsap.utils.random(-20, 20),
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: char, containerAnimation: scrollTween, start: "left 100%", end: "left 30%", scrub: 1 },
        });
      });
    }, wrapperRef.current);
    return () => ctx.revert();
  }, []);

  /**
   * Splits input text into accessible character and word spans for GSAP target selector mapping.
   * @returns {React.ReactNode[]} Array of formatted word elements
   */
  const renderText = () => {
    return TEXT.split(" ").map((word, wi, arr) => (
      <span key={wi} className="hs-word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {word.split("").map((char, ci) => (
          <span key={ci} className="hs-char" style={{ display: "inline-block" }}>{char}</span>
        ))}
        {wi < arr.length - 1 && <span className="hs-char" style={{ display: "inline-block" }}>&nbsp;</span>}
      </span>
    ));
  };

  return (
    <section className="Horizontal" ref={wrapperRef}>
      <div className="hs-sticky" ref={stickyRef}>
        <h3 className="Horizontal__text heading-xl" ref={textRef}>{renderText()}</h3>
      </div>
    </section>
  );
}
