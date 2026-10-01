/**
 * @file components/Featured/SubHeader.jsx
 * Why this code exists:
 * Displays developer introduction copy and core expertise grid items
 * detailing Frontend, Backend, AI Automation, and CMS/SaaS capabilities.
 */

import React from 'react';

const SERVICES = [
  { title: 'Frontend Development', body: 'React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS.' },
  { title: 'Backend & Databases', body: 'Node.js, Express.js, REST APIs, Supabase, and PostgreSQL powering scalable architectures.' },
  { title: 'AI & Automation', body: 'OpenAI Integration, AI Chatbots, WhatsApp Automation, AI Agents, AI Workflows, and CRM Automation.' },
  { title: 'CMS, SaaS & Dashboards', body: 'WordPress, Shopify, custom Admin Dashboards, Authentication systems, and API integrations.' }
];

/**
 * SubHeader component displaying developer bio and technical skill grid cards.
 * 
 * Tricky logic:
 * Uses border-right and border-bottom CSS rules on alternating grid children to create crisp grid line borders
 * matching design system tokens across both light and dark themes.
 * 
 * TODO: Add interactive skill badges or technology icons inside service items.
 * 
 * @returns {React.ReactElement} SubHeader bio container component
 */
export default function SubHeader() {
  return (
    <div className='w-full flex flex-col items-start text-left px-4 md:px-0'>
      <div className='w-full text-base md:text-lg lg:text-xl flex flex-col gap-3 leading-relaxed'>
        <p>Hi, I'm Tanush V, an AI Systems Developer and MLOps-focused Product Builder.</p>
        <p>I specialize in designing and developing premium websites, SaaS platforms, AI-powered applications, dashboards, and modern digital experiences.</p>
      </div>
      <div className='about-inline-services w-full mt-8 md:mt-12'>
        <div className='about-inline-services__head'>
          <span className='about-inline-services__label'>CORE EXPERTISE</span>
        </div>
        <div className='about-inline-services__grid'>
          {SERVICES.map((s) => (
            <article key={s.title} className='about-inline-services__item'>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
