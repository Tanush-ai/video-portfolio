/**
 * @file components/Navbar/LetsTalk.jsx
 * Why this code exists:
 * Renders an interactive call-to-action button in the desktop navigation header
 * with spring-animated arrow indicators on hover.
 */

import React from "react";
import { useSpring, animated } from "@react-spring/web";

/**
 * LetsTalk component with physics-based hover state micro-animations.
 * 
 * Tricky logic:
 * Uses dual react-spring APIs to cross-fade arrow and bullet icons simultaneously
 * while translating text position smoothly on mouse enter/leave.
 * 
 * TODO: Add magnetic cursor physics effect on mouse move.
 * 
 * @returns {React.ReactElement} Animated CTA anchor button
 */
const LetsTalk = () => {
  const [springs, api] = useSpring(() => ({ from: { x: 0 }, x: -10 }));
  const [opacitySprings, opacityApi] = useSpring(() => ({ opacity: 1, x: 0 }));
  const [opacitySpringsReverse, opacityApiReverse] = useSpring(() => ({ opacity: 0, x: -10 }));

  return (
    <a
      href="#contact-section"
      aria-label="Contact Section"
      className="nav_btn_lg nav_btn_dark flex items-center justify-center hover:bg-brblue py-6"
      onMouseEnter={() => {
        api.start({ x: 20 });
        opacityApi.start({ opacity: 0, x: 5 });
        opacityApiReverse.start({ opacity: 1, x: 3 });
      }}
      onMouseLeave={() => {
        api.start({ x: 0 });
        opacityApi.start({ opacity: 1, x: 0 });
        opacityApiReverse.start({ opacity: 0, x: -10 });
      }}
    >
      <animated.span style={opacitySpringsReverse} className="opacity-0">➔</animated.span>
      <animated.span style={springs}>LET'S TALK &nbsp;</animated.span>
      <animated.span style={opacitySprings}>&nbsp;•&nbsp;</animated.span>
    </a>
  );
};

export default LetsTalk;
