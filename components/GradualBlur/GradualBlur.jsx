/**
 * @file components/GradualBlur/GradualBlur.jsx
 * Why this code exists:
 * Generates layered CSS backdrop-filter blur steps with mask gradients to produce
 * a modern, smooth frosted glass edge transition across page boundaries.
 */

"use client";
import { useEffect, useRef, useState, useMemo, memo } from 'react';
import './GradualBlur.css';

const DEFAULT_CONFIG = {
  position: 'bottom', strength: 2, height: '6rem', divCount: 5,
  exponential: false, zIndex: 1000, animated: false, opacity: 1, curve: 'linear'
};

const CURVE_FUNCTIONS = {
  /**
   * Linear progression curve
   * @param {number} p - Normalized progress between 0 and 1
   * @returns {number} Interpolated value
   */
  linear: p => p,
  /**
   * Cubic bezier easing curve for smooth blur falloff
   * @param {number} p - Normalized progress between 0 and 1
   * @returns {number} Interpolated value
   */
  bezier: p => p * p * (3 - 2 * p),
};

/**
 * GradualBlur component renders stacked mask-gradient div layers to synthesize smooth visual depth.
 * 
 * Tricky logic:
 * Divides the blur region into N discrete step divs, applying progressive CSS mask-image linear gradients
 * and backdrop-filters so GPU compositing renders a single continuous blur gradient without heavy shaders.
 * 
 * TODO: Optimize div count for ultra-high-resolution retina screens if GPU usage increases.
 * 
 * @param {Object} props - Custom blur configuration properties
 * @returns {React.ReactElement} Layered blur container element
 */
function GradualBlur(props) {
  const containerRef = useRef(null);
  const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...props }), [props]);

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;
    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;
    for (let i = 1; i <= config.divCount; i++) {
      let progress = curveFunc(i / config.divCount);
      let blurValue = 0.0625 * (progress * config.divCount + 1) * config.strength;
      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + 2 * increment) * 10) / 10;
      let gradient = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) gradient += `, black ${p3}%`;
      if (p4 <= 100) gradient += `, transparent ${p4}%`;
      const direction = { top: 'to top', bottom: 'to bottom', left: 'to left', right: 'to right' }[config.position] || 'to bottom';
      divs.push(
        <div key={i} style={{
          position: 'absolute', inset: 0,
          maskImage: `linear-gradient(${direction}, ${gradient})`,
          WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
          backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
          WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
          opacity: config.opacity,
        }} />
      );
    }
    return divs;
  }, [config]);

  return (
    <div ref={containerRef} style={{
      position: 'absolute', pointerEvents: 'none',
      height: config.height, width: '100%',
      bottom: config.position === 'bottom' ? 0 : undefined,
      top: config.position === 'top' ? 0 : undefined,
      zIndex: config.zIndex,
    }}>
      <div className="gradual-blur-inner">{blurDivs}</div>
    </div>
  );
}

export default memo(GradualBlur);
