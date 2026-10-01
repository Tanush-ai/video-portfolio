/**
 * @file components/SiteFooter/SiteFooter.jsx
 * Why this code exists:
 * Displays site footer containing developer brand statement, social media profiles (GitHub, LinkedIn, Instagram),
 * project links, client work references, and dynamic copyright year.
 */

"use client";
import React from "react";

/**
 * Reusable Icon helper component for SVG social media symbols.
 * @param {Object} props Component properties
 * @param {React.ReactNode} props.children SVG path child elements
 * @returns {React.ReactElement} SVG icon wrapper
 */
const Icon = ({ children }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

/**
 * SiteFooter component rendering page footer navigation and copyright line.
 * 
 * Tricky logic:
 * Uses high z-index (100000) so footer elements stack cleanly above gradual blur overlays when scrolled.
 * 
 * TODO: Add dynamic back-to-top button trigger link.
 * 
 * @returns {React.ReactElement} Main footer component
 */
export default function SiteFooter() {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h1 className="f-logo">TANUSH V</h1>
          <p className="f-desc">
            AI Systems Developer & MLOps Engineer. <br />
            Transforming ideas into production-ready applications.
          </p>
          <div className="f-socials">
            <a href="https://github.com/Tanush-ai" target="_blank" rel="noreferrer" aria-label="GitHub Profile"><Icon><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2"/></Icon></a>
            <a href="https://www.linkedin.com/in/tanush-v" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile"><Icon><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></Icon></a>
            <a href="https://www.instagram.com/er.tanush" target="_blank" rel="noreferrer" aria-label="Instagram Profile"><Icon><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></Icon></a>
          </div>
        </div>
        <div className="footer-links">
          <div className="f-col">
            <h3>EXPLORE PROJECTS</h3>
            <a href="https://devendhargopagoni.netlify.app/" target="_blank" rel="noreferrer">Personal Portfolio</a>
            <a href="https://nomoredms.vercel.app/" target="_blank" rel="noreferrer">NoMoreDMS</a>
            <a href="https://educalc-expert0509.vercel.app/" target="_blank" rel="noreferrer">EduCalc</a>
            <a href="https://postlearn-lake.vercel.app/" target="_blank" rel="noreferrer">PostLearn</a>
          </div>
          <div className="f-col">
            <h3>CLIENT WORK</h3>
            <a href="https://maatoori-akshith.netlify.app/" target="_blank" rel="noreferrer">Maatoori Akshith Portfolio</a>
            <a href="https://teamz09.netlify.app/" target="_blank" rel="noreferrer">TeamZ Business Site</a>
            <a href="#contact-section">Get in touch</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Tanush V. All rights reserved.</p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
