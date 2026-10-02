/**
 * @file components/Featured/Header.jsx
 * Why this code exists:
 * Displays the large stylized section title "Building Real Digital Systems"
 * with React Spring trail entrance effects and horizontal translation shift.
 */

import { a, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";
import React, { useEffect, useState } from "react";

/**
 * Header component rendering animated large headline text.
 * 
 * Why this code exists:
 * Delivers an impactful, motion-driven visual introduction to Tanush's portfolio
 * that adapts gracefully across phone, tablet, and widescreen displays.
 * 
 * Tricky logic:
 * Triggers a spring X translation shift on callback once the trail animation completes.
 * On mobile viewports (< 768px), suppresses the 8% X translation shift to prevent text
 * from clipping beyond mobile viewport edges or inducing horizontal scroll.
 * 
 * TODO: Add split-by-character animation option for tighter typography control.
 * 
 * @returns {React.ReactElement} Header section component
 */
export default function Header() {
  const [open, set] = useState(false);
  useEffect(() => { set(true); }, []);

  const [horizontal, api] = useSpring(() => ({ from: { transform: 'translateX(0%)' } }));

  return (
    <div className="w-full z-10 relative px-2 sm:px-4 md:px-0 md:pl-6 font-semibold text-[2.2rem] sm:text-5xl md:text-7xl lg:text-[6.8rem] xl:text-[8rem] text-center md:text-left leading-[1] sm:leading-[0.95] tracking-tight mb-4 md:mb-8" style={{ letterSpacing: "-0.05em" }}>
      <Trail callback={(isOpen) => {
        const offset = typeof window !== 'undefined' && window.innerWidth < 768 ? '0%' : '8%';
        api.start({ transform: `translateX(${isOpen ? offset : '0%'})` });
      }}>
        <a.div className="flex justify-center md:justify-start flex-wrap md:flex-nowrap" style={horizontal}>
          <div>Building&nbsp;</div><div>Real&nbsp;</div>
        </a.div>
        <div className="flex justify-center md:justify-start flex-wrap md:flex-nowrap">
          <div>Digital&nbsp;</div><div>Systems&nbsp;</div>
        </div>
      </Trail>
    </div>
  );
}
