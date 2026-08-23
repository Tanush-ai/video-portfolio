"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    name: "Personal Portfolio",
    href: "https://devendhargopagoni.netlify.app/",
    role: "React • Next.js • TypeScript",
    kind: "Live",
    note: "Modern portfolio website showcasing work, skills, and services with premium UI/UX, smooth animations, and fast performance.",
    image: "/images/projects/personalportfolio.jpg",
  },
  {
    name: "NoMoreDMS",
    href: "https://nomoredms.vercel.app/",
    role: "React • Next.js • Node.js • Supabase",
    kind: "Live",
    note: "Platform eliminating repetitive DMs by giving creators and professionals a central hub to share links, resources, and digital products.",
    image: "/images/projects/nomoredms.png",
  },
  {
    name: "EduCalc",
    href: "https://educalc-expert0509.vercel.app/",
    role: "React • Next.js • TypeScript",
    kind: "Live",
    note: "Educational platform giving students access to academic tools through a clean and responsive interface.",
    image: "/images/projects/educalc.png",
  },
  {
    name: "PostLearn",
    href: "https://postlearn-lake.vercel.app/",
    role: "React • Next.js",
    kind: "Live",
    note: "Modern learning platform focused on delivering educational content through an intuitive, engaging interface.",
    image: "/images/projects/postlearn.png",
  },
  {
    name: "Cozy Cafe Website",
    href: "https://cozy-cafa1.netlify.app/",
    role: "Food & Hospitality Website",
    kind: "Live",
    note: "Bespoke cafe website featuring online menus, ambiance galleries, and table reservation flows.",
    image: "/images/projects/cozy-cafe.png",
  },
  {
    name: "Maatoori Akshith Portfolio",
    href: "https://maatoori-akshith.netlify.app/",
    role: "Client Portfolio Website",
    kind: "Live",
    note: "Personal portfolio website built for a client to establish a strong digital presence with modern animations.",
    image: "/images/projects/maatoori-akshith.jpg",
  },
  {
    name: "TeamZ",
    href: "https://teamz09.netlify.app/",
    role: "Corporate / Business Website",
    kind: "Live",
    note: "Corporate website designed to present company services professionally with clean sections and contact forms.",
    image: "/images/projects/teamz.png",
  },
];

const VENTURES = [
  {
    name: "Corporate & Business Websites",
    role: "Professional Brand Presence",
    href: "https://devendhargopagoni.netlify.app/",
    kind: "Capability",
    note: "Custom business websites designed with clean sections, service presentations, and SEO best practices.",
  },
  {
    name: "SaaS Platforms & Admin Dashboards",
    role: "Scalable Application Architecture",
    href: "https://nomoredms.vercel.app/",
    kind: "Capability",
    note: "Web apps with user authentication, resource management, database integration, and high performance.",
  },
  {
    name: "AI Applications & Workflow Automation",
    role: "OpenAI • Chatbots • WhatsApp & CRM",
    href: null,
    kind: "Capability",
    note: "AI agents, smart chatbots, automated CRM pipelines, and intelligent API workflows.",
  },
  {
    name: "High-Converting Landing Pages",
    role: "UI/UX & Performance Optimization",
    href: null,
    kind: "Capability",
    note: "Fast-loading landing pages built to solve real business problems and transform ideas into production applications.",
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const Row = ({ item, index }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <li className="pj-row">
      <Wrapper
        className={`pj-link${hasLink ? "" : " pj-link--static"}`}
        {...wrapperProps}
      >
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-14 sm:w-28 sm:h-18 object-contain bg-white/5 rounded-xl border border-white/10 shrink-0"
          />
        )}
        <div className="pj-meta">
          <span className="pj-name">{item.name}</span>
          {item.role && <span className="pj-role">{item.role}</span>}
          {item.note && <span className="pj-note">{item.note}</span>}
        </div>
        <span className="pj-kind">{item.kind}</span>
        <span className="pj-arrow" aria-hidden="true">
          {hasLink ? <ArrowIcon /> : <span className="pj-dot">•</span>}
        </span>
      </Wrapper>
    </li>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = sectionRef.current.querySelectorAll(".pj-row");
      gsap.from(rows, {
        opacity: 0,
        y: 60,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const titles = sectionRef.current.querySelectorAll(".pj-title");
      gsap.from(titles, {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" ref={sectionRef}>
      <div className="pj-head">
        <span className="pj-label">PROJECTS</span>
        <h2 className="pj-title">selected work</h2>
      </div>

      <ul className="pj-list">
        {PROJECTS.map((p, i) => (
          <Row key={p.name} item={p} index={i} />
        ))}
      </ul>

      <div id="ventures" className="pj-head pj-head--secondary">
        <span className="pj-label">WHAT I BUILD</span>
        <h2 className="pj-title">products &amp; solutions</h2>
      </div>

      <ul className="pj-list">
        {VENTURES.map((v, i) => (
          <Row key={v.name} item={v} index={i} />
        ))}
      </ul>
    </section>
  );
};

export default Projects;
