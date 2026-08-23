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

const ProjectCard = ({ item, index }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <div className="pj-row w-full flex">
      <Wrapper
        className="flex flex-col w-full bg-fg/[0.03] dark:bg-white/[0.02] border border-fg/10 dark:border-white/5 rounded-3xl p-5 hover:bg-fg/[0.06] dark:hover:bg-white/[0.04] hover:border-fg/20 dark:hover:border-white/10 transition-all duration-300 group cursor-pointer"
        {...wrapperProps}
      >
        {/* 100% Image Layout Container (No crop) */}
        {item.image && (
          <div className="w-full aspect-[16/10] bg-fg/[0.02] dark:bg-white/[0.01] border border-fg/5 dark:border-white/5 rounded-2xl overflow-hidden mb-5 flex items-center justify-center p-2 relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        )}

        {/* Meta details */}
        <div className="flex flex-col w-full flex-grow">
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] tracking-widest text-fg-muted font-semibold uppercase">
              Project {String(index + 1).padStart(2, "0")}
            </span>
            <span className="px-2.5 py-0.5 bg-fg/10 dark:bg-white/10 text-fg rounded-full text-[10px] font-bold uppercase tracking-wider">
              {item.kind}
            </span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold uppercase tracking-tight text-fg mt-3 group-hover:text-fg/80 transition-colors">
            {item.name}
          </h3>

          {item.role && (
            <span className="text-[11px] font-bold tracking-wider text-fg-muted/70 uppercase mt-1">
              {item.role}
            </span>
          )}

          {item.note && (
            <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mt-4 flex-grow">
              {item.note}
            </p>
          )}

          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase mt-6 text-fg group-hover:translate-x-1 transition-transform duration-300">
            <span>{hasLink ? "View Project" : "Learn More"}</span>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

const VentureCard = ({ item, index }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <div className="pj-row w-full flex">
      <Wrapper
        className="flex flex-col w-full bg-fg/[0.02] dark:bg-white/[0.01] border border-fg/5 dark:border-white/5 rounded-3xl p-6 hover:bg-fg/[0.04] dark:hover:bg-white/[0.03] hover:border-fg/10 dark:hover:border-white/10 transition-all duration-300 group cursor-pointer justify-between"
        {...wrapperProps}
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full">
            <span className="text-[10px] tracking-widest text-fg-muted font-semibold uppercase">
              Service {String(index + 1).padStart(2, "0")}
            </span>
            <span className="px-2.5 py-0.5 bg-fg/5 dark:bg-white/5 text-fg-muted rounded-full text-[10px] font-bold uppercase tracking-wider">
              {item.kind}
            </span>
          </div>

          <h3 className="text-lg lg:text-xl font-bold uppercase tracking-tight text-fg mt-4 group-hover:text-fg/80 transition-colors">
            {item.name}
          </h3>

          {item.role && (
            <span className="text-[10px] font-bold tracking-wider text-fg-muted/70 uppercase mt-1">
              {item.role}
            </span>
          )}

          {item.note && (
            <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mt-4">
              {item.note}
            </p>
          )}
        </div>

        {hasLink && (
          <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase mt-6 text-fg group-hover:translate-x-1 transition-transform duration-300">
            <span>Learn More</span>
            <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        )}
      </Wrapper>
    </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 w-full">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} item={p} index={i} />
        ))}
      </div>

      <div id="ventures" className="pj-head pj-head--secondary">
        <span className="pj-label">WHAT I BUILD</span>
        <h2 className="pj-title">products &amp; solutions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 w-full">
        {VENTURES.map((v, i) => (
          <VentureCard key={v.name} item={v} index={i} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
