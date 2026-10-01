/**
 * @file components/Featured/FeaturedVideo.jsx
 * Why this code exists:
 * Displays the hero portrait image with Framer Motion scroll scale effects,
 * serving as a visual focal point in the About/Featured section.
 */

import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

/**
 * FeaturedVideo / Portrait card component animated based on viewport scroll progress.
 * 
 * Tricky logic:
 * Listens to parent forward ref scroll progress using useMotionValueEvent to scale up the card
 * when progress crosses the 50% scroll threshold.
 * 
 * TODO: Support optional video thumbnail overlay on hover.
 * 
 * @param {Object} props Component properties
 * @param {React.RefObject} props.refForward Parent section ref for scroll target tracking
 * @returns {React.ReactElement} Motion container card element
 */
export default function FeaturedVideo({ refForward, ...props }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: refForward, layoutEffect: false });
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (val) => setProgress(val));

  return (
    <motion.div
      ref={ref}
      variants={{ initial: { scale: 1 }, animate: { scale: 1.08 } }}
      initial="initial"
      animate={progress > 0.5 ? "animate" : "initial"}
      className="relative w-full aspect-[3/4] md:aspect-[856/1024] overflow-hidden rounded-3xl shadow-md z-30"
      {...props}
    >
      <Image src="/avatar-logo.jpg" alt="Tanush V - Featured portrait" fill priority sizes="(max-width: 768px) 80vw, 40vw" className="object-cover object-top" />
    </motion.div>
  );
}
