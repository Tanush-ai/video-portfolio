/**
 * @file components/Navbar/Menu.jsx
 * Why this code exists:
 * Displays the popover overlay menu for desktop navigation, including anchor links
 * and quick-action contact shortcuts with Lenis smooth scrolling integration.
 */

import { useSpring, a } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";

const EMAIL = "tanushvelgpudi123@gmail.com";
const WHATSAPP_URL = "https://wa.me/919449237762";
const TELEGRAM_URL = "https://t.me/+919449237762";

/**
 * Smoothly scrolls to target element ID or top of window using Lenis if available.
 * @param {string} id - HTML element target ID or "top"
 */
const scrollToSection = (id) => {
  if (typeof window === "undefined") return;
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

/**
 * Menu popover panel component with spring rotation and fade animations.
 * 
 * Tricky logic:
 * Uses state timer to unmount DOM node after exit animation completes, avoiding layout shift
 * while preserving smooth spring collapse transitions.
 * 
 * TODO: Add keyboard focus trap for accessibility.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - State flag indicating if menu is open
 * @param {Function} props.onOutsideClick - Handler callback for clicks outside menu container
 * @param {Function} props.onClose - Handler callback to close the menu
 * @returns {React.ReactElement} Menu modal component
 */
const Menu = ({ open, onOutsideClick, onClose }) => {
  const ref = useRef();

  /**
   * Handles click events to trigger outside click detection.
   * @param {MouseEvent} event - Native DOM click event
   */
  const handleChildClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) onOutsideClick(event);
  };

  useEffect(() => {
    document.addEventListener("click", handleChildClick);
    return () => document.removeEventListener("click", handleChildClick);
  }, []);

  const [contents, contentsApi] = useSpring(() => ({ from: { y: 100, opacity: 0, transform: "rotate(20deg)" } }));
  const [news, newsApi] = useSpring(() => ({ from: { y: 100, opacity: 0, transform: "rotate(-20deg)" } }));
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (open === false) {
      setTimeout(() => setHidden(false), 500);
    } else {
      setHidden(true);
    }
    contentsApi.start({ y: open ? 0 : 100, opacity: open ? 1 : 0, transform: open ? `rotate(0deg)` : `rotate(20deg)` });
    newsApi.start({ y: open ? 0 : 100, opacity: open ? 1 : 0, transform: open ? `rotate(0deg)` : `rotate(-20deg)` });
  }, [open]);

  const navItems = [
    { label: "HOME", target: "top" },
    { label: "ABOUT", target: "about" },
    { label: "WORK", target: "projects-section" },
    { label: "CONTACT", target: "contact-section" },
  ];

  /**
   * Navigates to target section and closes menu overlay.
   * @param {React.MouseEvent} e - Click event
   * @param {string} target - Target element ID
   */
  const handleNavClick = (e, target) => {
    e.preventDefault();
    scrollToSection(target);
    if (onClose) onClose();
  };

  return (
    <>
      {hidden && (
        <div className="absolute top-[4rem] right-0 w-[20rem]" ref={ref}>
          <a.div className="rounded-xl bg-bg-alt text-fg flex flex-col font-Aeonik text-3xl p-8" style={contents}>
            {navItems.map((item, i) => (
              <a key={item.target} href={`#${item.target}`} onClick={(e) => handleNavClick(e, item.target)}
                className={`flex items-center justify-between transition-colors hover:text-brblue cursor-pointer ${i === 0 ? "pb-3" : i === navItems.length - 1 ? "pt-3" : "py-3"}`}>
                <span>{item.label}</span>
                <span className="text-fg-muted">•</span>
              </a>
            ))}
          </a.div>
          <a.div className="rounded-xl bg-bg-alt text-fg flex flex-col p-8 my-2" style={news}>
            <div className="font-Aeonik text-3xl leading-tight">Got an idea?<br />Let's talk.</div>
            <div className="flex flex-col gap-2 mt-5">
              <a href="#contact-section" onClick={() => onClose && onClose()} className="flex items-center justify-between bg-fg text-bg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold transition-transform hover:-translate-y-0.5">
                <span>GET IN TOUCH</span><span>↗</span>
              </a>
              <a href="https://github.com/Tanush-ai" target="_blank" rel="noreferrer" onClick={() => onClose && onClose()} className="flex items-center justify-between border-2 border-fg text-fg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold hover:bg-accent-soft">
                <span>GITHUB</span><span>↗</span>
              </a>
            </div>
          </a.div>
        </div>
      )}
    </>
  );
};

export default Menu;
