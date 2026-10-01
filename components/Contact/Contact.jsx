/**
 * @file components/Contact/Contact.jsx
 * Why this code exists:
 * Renders the main call-to-action contact section with character-by-character GSAP stagger animations
 * and direct email / portfolio call-to-action links.
 */

"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Contact component featuring large stylized text and interactive CTA buttons.
 * 
 * Tricky logic:
 * Splits string characters into discrete inline-block spans so GSAP stagger selectors can animate
 * individual letters moving upward from Y=200px as the user scrolls into view.
 * 
 * TODO: Add dynamic contact form modal with direct email dispatch integration.
 * 
 * @returns {React.ReactElement} Contact section container element
 */
export default function Contact() {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const emailRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const eyebrowChars = eyebrowRef.current?.querySelectorAll(".ct-char") ?? [];
      const headlineChars = headlineRef.current?.querySelectorAll(".ct-char") ?? [];
      gsap.from(eyebrowChars, {
        opacity: 0, y: 40, duration: 1, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: eyebrowRef.current, start: "top 90%", toggleActions: "play none none reverse" }
      });
      gsap.from(headlineChars, {
        opacity: 0, y: 200, duration: 1.4, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none reverse" }
      });
      gsap.from([emailRef.current, ctaRef.current], {
        autoAlpha: 0, y: 50, duration: 1, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: emailRef.current, start: "top 95%", toggleActions: "play none none reverse" }
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  /**
   * Splits input string into animated character spans preserving non-breaking spaces.
   * @param {string} text - Raw string content
   * @returns {React.ReactNode[]} Array of character span nodes
   */
  const splitChars = (text) => text.split("").map((char, i) => (
    <span key={i} className="ct-char" style={{ display: "inline-block" }}>{char === " " ? "\u00A0" : char}</span>
  ));

  return (
    <section id="contact-section" ref={sectionRef}>
      <div id="ct-eyebrow" ref={eyebrowRef}>{splitChars("have a project in mind?")}</div>
      <h2 id="ct-headline" ref={headlineRef}>{splitChars("let's talk.")}</h2>
      <a id="ct-email" href="mailto:tanushvelgpudi123@gmail.com" ref={emailRef}>tanushvelgpudi123@gmail.com</a>
      <div id="ct-actions" ref={ctaRef}>
        <a id="ct-btn" href="https://github.com/Tanush-ai" target="_blank" rel="noreferrer">
          <span>VIEW GITHUB</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7m-10 0h10v10"/></svg>
        </a>
        <a id="ct-btn-secondary" href="https://nomoredms.vercel.app/" target="_blank" rel="noreferrer">
          <span>CHECK NOMOREDMS</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7m-10 0h10v10"/></svg>
        </a>
      </div>
    </section>
  );
}
