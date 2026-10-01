/**
 * @file components/Navbar/TrailText.jsx
 * Why this code exists:
 * Provides a React Spring staggered animation wrapper for navbar elements,
 * creating smooth entrance animations when the page loads.
 */

import React from 'react';
import { useTrail, a } from '@react-spring/web';

/**
 * Staggered trail animation container component for list children.
 * 
 * Tricky logic:
 * Converts React children into an array and maps over React Spring trail styles,
 * applying subtle initial rotation and Y offset that spring back to 0.
 * 
 * TODO: Support configurable spring tension and friction values as optional props.
 * 
 * @param {Object} props Component properties
 * @param {boolean} props.open Controls animation open/close target state
 * @param {React.ReactNode} props.children Child nodes to animate sequentially
 * @returns {React.ReactElement} Animated container wrapper
 */
export const Trail = ({ open, children, ...props }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    opacity: open ? 1 : 0,
    transform: `rotate(0deg)`,
    y: 0,
    from: { opacity: 0, y: 20, transform: `rotate(4deg)` },
  });

  return (
    <div {...props}>
      {trail.map(({ ...style }, index) => (
        <a.div key={index} style={style}>
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};
