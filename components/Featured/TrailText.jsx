/**
 * @file components/Featured/TrailText.jsx
 * Why this code exists:
 * Uses React Intersection Observer with React Spring to trigger staggered reveal animations
 * as the user scrolls into the Featured Header section.
 */

import React from "react";
import { useTrail, a } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

/**
 * Scroll-triggered Trail animation wrapper for header elements.
 * 
 * Tricky logic:
 * Combines react-intersection-observer rootMargin trigger with spring physics onRest callbacks
 * to coordinate horizontal translation shifts after text becomes visible.
 * 
 * TODO: Optimize rootMargin threshold for different screen orientations.
 * 
 * @param {Object} props Component properties
 * @param {React.ReactNode} props.children Child elements to animate
 * @param {Function} props.callback OnRest state completion callback
 * @returns {React.ReactElement} Animated wrapper element
 */
export const Trail = ({ children, callback, ...props }) => {
  const items = React.Children.toArray(children);
  const [ref, open] = useInView({ rootMargin: "-50px 0px" });
  const trail = useTrail(items.length, {
    config: { mass: 4, tension: 800, friction: 180 },
    opacity: open ? 1 : 0,
    y: open ? 0 : 40,
    from: { opacity: 0, y: 40 },
    onRest: () => callback && callback(open),
  });

  return (
    <div {...props} ref={ref}>
      {trail.map((style, index) => (
        <a.div key={index} style={style} className="w-full">
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};
