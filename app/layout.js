/**
 * @file app/layout.js
 * Why this code exists:
 * Root layout component configuring Google Inter font variable, site SEO metadata,
 * favicons, and anti-FOUC theme bootstrapping script.
 */

import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600', '700'], display: 'swap' });

export const metadata = {
  title: 'Tanush V | MLOps Engineer & AI Systems Developer',
  description: 'Tanush V is an MLOps Engineer & AI Systems Developer specializing in scalable AI infrastructure, machine learning workflows, and intelligent applications.',
  icons: { icon: '/icon.jpg' }
};

/**
 * Inline IIFE script string executed before initial DOM render to prevent white flash / FOUC
 * by immediately setting data-theme from localStorage.
 */
const themeBootstrap = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

/**
 * RootLayout component wrapping all Next.js App Router pages.
 * 
 * Tricky logic:
 * Injects raw themeBootstrap script synchronously into <head> via dangerouslySetInnerHTML
 * to guarantee theme data-theme is assigned prior to paint.
 * 
 * TODO: Add OpenGraph meta image tags for social sharing previews.
 * 
 * @param {Object} props Component properties
 * @param {React.ReactNode} props.children Page children content
 * @returns {React.ReactElement} Root HTML wrapper structure
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} data-theme="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
