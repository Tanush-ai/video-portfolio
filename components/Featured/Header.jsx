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
 * Tricky logic:
 * Triggers a spring X translation shift on callback once the trail animation completes,
 * aligning the top line with visual grid hierarchy.
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
    <div className="w-full z-10 relative px-4 md:px-0 md:pl-6 font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[6.8rem] xl:text-[8rem] text-center md:text-left leading-[0.95] tracking-tight mb-4 md:mb-8" style={{ letterSpacing: "-0.05em" }}>
      <Trail callback={(isOpen) => api.start({ transform: `translateX(${isOpen ? '8%' : '0%'})` })}>
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
