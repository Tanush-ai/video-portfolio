/**
 * @file components/Navbar/Navbar.jsx
 * Why this code exists:
 * Main header navigation component providing mobile drawer navigation, branding logo,
 * theme toggle, and desktop navigation controls across all viewport sizes.
 */

"use client";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";
import LetsTalk from "./LetsTalk";
import MenuButton from "./MenuButton";
import Link from "next/link";
import ThemeButton from "./MusicButton";

const EMAIL = "tanushvelgpudi123@gmail.com";
const WHATSAPP_URL = "https://wa.me/917569949639";
const TELEGRAM_URL = "https://t.me/+917569949639";

const MOBILE_NAV_ITEMS = [
  { label: "HOME", target: "top" },
  { label: "ABOUT", target: "about" },
  { label: "WORK", target: "projects-section" },
  { label: "CONTACT", target: "contact-section" },
];

/**
 * Navbar component controlling site header, brand logo, theme switcher, and mobile menu modal.
 * 
 * Tricky logic:
 * Locks document body scrolling when mobile drawer menu is active, preventing unwanted background scroll.
 * 
 * TODO: Add scroll progress indicator bar to top of navbar.
 * 
 * @returns {React.ReactElement} Main site navigation bar component
 */
export default function Navbar() {
  const [rotate, setRotate] = useSpring(() => ({ transform: `rotate(0deg)` }));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, set] = useState(false);

  useEffect(() => { set(true); }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [mobileOpen]);

  /**
   * Handles smooth navigation click on mobile drawer links.
   * @param {React.MouseEvent} e - Navigation click event
   * @param {string} target - Target element ID or "top"
   */
  const handleMobileNav = (e, target) => {
    e.preventDefault();
    setMobileOpen(false);
    setRotate({ transform: "rotate(0deg)" });
    const section = target === "top" ? 0 : document.getElementById(target);
    const lenis = window.__lenis;
    setTimeout(() => {
      if (lenis) {
        lenis.scrollTo(section, { duration: 1.4 });
      } else if (section === 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        section?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <>
      {/* Navbar small screen - completely transparent and invisible background container */}
      <div className="fixed top-0 left-0 z-[100001] w-full px-5 py-5 lg:hidden pointer-events-none bg-transparent">
        <div className="flex items-center justify-between w-full font-extrabold pointer-events-auto">
          <Link href="/" onClick={(e) => handleMobileNav(e, "top")} className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity">
            <img src="/avatar-logo.jpg" alt="Logo" className="w-8 h-8 rounded-full object-cover object-top border border-fg/10" />
            <span className="tracking-wider font-semibold text-lg text-fg">TANUSH V</span>
          </Link>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="nav_btn_sm flex items-center justify-center cursor-pointer"
            onClick={() => {
              const next = !mobileOpen;
              setMobileOpen(next);
              setRotate({ transform: next ? "rotate(45deg)" : "rotate(0deg)" });
            }}
          >
            <animated.div className="text-[0.55rem] leading-none" style={rotate}>
              {mobileOpen ? "✕" : "⬤ ⬤"}
            </animated.div>
          </button>
        </div>
      </div>
      <div className={`fixed inset-0 z-[100000] lg:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-bg" onClick={() => { setMobileOpen(false); setRotate({ transform: "rotate(0deg)" }); }} />
        <div className="relative z-10 h-full w-full flex flex-col pt-24 pb-8 px-6">
          <nav className="flex flex-col gap-1">
            {MOBILE_NAV_ITEMS.map((item, i) => (
              <a key={item.target} href={`#${item.target}`} onClick={(e) => handleMobileNav(e, item.target)}
                className="flex items-center justify-between py-4 border-b border-theme-border text-fg text-3xl font-semibold">
                <span>{item.label}</span>
                <span className="text-fg-muted text-base">0{i + 1}</span>
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8 flex flex-col gap-3">
            <p className="text-fg-muted text-xs tracking-[0.2em] uppercase">Get in touch</p>
            <a href={`mailto:${EMAIL}`} onClick={() => setMobileOpen(false)} className="flex items-center justify-between bg-fg text-bg rounded-full px-5 py-4 text-sm font-semibold">
              <span>EMAIL</span><span>↗</span>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)} className="flex items-center justify-between border-2 border-fg text-fg rounded-full px-5 py-4 text-sm font-semibold">
              <span>WHATSAPP</span><span>↗</span>
            </a>
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)} className="flex items-center justify-between border-2 border-fg text-fg rounded-full px-5 py-4 text-sm font-semibold">
              <span>TELEGRAM</span><span>↗</span>
            </a>
          </div>
        </div>
      </div>
      {/* Navbar large screen - completely transparent and invisible background container */}
      <div className="fixed top-0 left-0 w-full px-6 lg:px-20 z-[100001] hidden lg:block pointer-events-none bg-transparent">
        <div className="items-center justify-between flex pt-12 pb-8">
          <Link href="/" className="flex items-center gap-3 pointer-events-auto hover:opacity-85 transition-opacity">
            <img src="/avatar-logo.jpg" alt="Logo" className="w-10 h-10 rounded-full object-cover object-top border border-fg/10" />
            <span className="font-AeonikMedium text-2xl tracking-wider text-fg uppercase">Tanush V</span>
          </Link>
          <div className="hidden lg:flex items-center justify-around font-AeonikMedium pointer-events-auto">
            <Trail open={open} className="flex">
              <ThemeButton />
              <LetsTalk />
              <MenuButton />
            </Trail>
          </div>
        </div>
      </div>
    </>
  );
}
