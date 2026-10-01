/**
 * @file components/Projects/Projects.jsx
 * Why this code exists:
 * Displays selected portfolio projects and venture capabilities list with hover state preview images,
 * external links, and GSAP scroll-triggered row staggered entrance animations.
 */

"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  { name: "Personal Portfolio", href: "https://devendhargopagoni.netlify.app/", role: "React • Next.js • TypeScript", kind: "Live", note: "Modern portfolio website showcasing work, skills, and services.", image: "/images/projects/personalportfolio.jpg" },
  { name: "NoMoreDMS", href: "https://nomoredms.vercel.app/", role: "React • Next.js • Supabase", kind: "Live", note: "Platform giving creators a central hub to share digital links.", image: "/images/projects/nomoredms.png" },
  { name: "EduCalc", href: "https://educalc-expert0509.vercel.app/", role: "React • Next.js • TypeScript", kind: "Live", note: "Educational platform giving students access to academic tools.", image: "/images/projects/educalc.png" },
  { name: "PostLearn", href: "https://postlearn-lake.vercel.app/", role: "React • Next.js", kind: "Live", note: "Modern learning platform focused on educational content.", image: "/images/projects/postlearn.png" },
  { name: "Cozy Cafe Website", href: "https://cozy-cafa1.netlify.app/", role: "Food & Hospitality Website", kind: "Live", note: "Bespoke cafe website featuring online menus and bookings.", image: "/images/projects/cozy-cafe.png" },
  { name: "Maatoori Akshith Portfolio", href: "https://maatoori-akshith.netlify.app/", role: "Client Portfolio Website", kind: "Live", note: "Personal portfolio website built for a client.", image: "/images/projects/maatoori-akshith.jpg" },
  { name: "TeamZ", href: "https://teamz09.netlify.app/", role: "Corporate / Business Website", kind: "Live", note: "Corporate website designed to present company services.", image: "/images/projects/teamz.png" }
];

const VENTURES = [
  { name: "Corporate & Business Websites", role: "Professional Brand Presence", href: "https://devendhargopagoni.netlify.app/", kind: "Capability", note: "Custom business websites designed with clean sections." },
  { name: "SaaS Platforms & Dashboards", role: "Scalable Application Architecture", href: "https://nomoredms.vercel.app/", kind: "Capability", note: "Web apps with user authentication, databases, and high performance." },
  { name: "AI Applications & Workflow Automation", role: "OpenAI • Chatbots • CRM", href: null, kind: "Capability", note: "AI agents, smart chatbots, automated CRM pipelines." },
  { name: "High-Converting Landing Pages", role: "UI/UX & Performance", href: null, kind: "Capability", note: "Fast-loading landing pages built to solve real business problems." }
];

/**
 * Individual project row component supporting interactive hover state padding shifts.
 * 
 * Tricky logic:
 * Polymorphically renders either an <a> element or a static <div> wrapper based on whether item.href is present.
 * 
 * @param {Object} props Component properties
 * @param {Object} props.item Project metadata item object
 * @param {number} props.index 0-indexed position
 * @returns {React.ReactElement} Rendered list item row
 */
const Row = ({ item, index }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  return (
    <li className="pj-row">
      <Wrapper className={`pj-link${hasLink ? "" : " pj-link--static"}`} {...(hasLink ? { href: item.href, target: "_blank", rel: "noreferrer" } : {})}>
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        {item.image && <img src={item.image} alt={item.name} className="w-20 h-14 sm:w-28 sm:h-18 object-contain shrink-0 bg-white/5 border border-white/10 rounded-xl" />}
        <div className="pj-meta">
          <span className="pj-name">{item.name}</span>
          {item.role && <span className="pj-role">{item.role}</span>}
          {item.note && <span className="pj-note">{item.note}</span>}
        </div>
        <span className="pj-kind">{item.kind}</span>
        <span className="pj-arrow">
          {hasLink ? <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 17 17 7m-9 0h9v9"/></svg> : "•"}
        </span>
      </Wrapper>
    </li>
  );
};

/**
 * Projects section container component using GSAP ScrollTrigger batch animations.
 * 
 * TODO: Add tag filtering buttons (React, Next.js, AI, Full Stack).
 * 
 * @returns {React.ReactElement} Projects list section container
 */
export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current.querySelectorAll(".pj-row"), {
        opacity: 0, y: 60, duration: 0.9, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true }
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" ref={sectionRef}>
      <div className="pj-head">
        <span className="pj-label">PROJECTS</span><h2 className="pj-title">selected work</h2>
      </div>
      <ul className="pj-list">
        {PROJECTS.map((p, i) => <Row key={p.name} item={p} index={i} />)}
      </ul>
      <div id="ventures" className="pj-head pj-head--secondary">
        <span className="pj-label">WHAT I BUILD</span><h2 className="pj-title">products &amp; solutions</h2>
      </div>
      <ul className="pj-list">
        {VENTURES.map((v, i) => <Row key={v.name} item={v} index={i} />)}
      </ul>
    </section>
  );
}
