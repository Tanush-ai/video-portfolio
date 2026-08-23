import React from 'react'

const SERVICES = [
  {
    title: 'Frontend Development',
    body:
      'React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS for fast, responsive web apps.',
  },
  {
    title: 'Backend & Databases',
    body:
      'Node.js, Express.js, REST APIs, Supabase, and PostgreSQL powering scalable server architecture.',
  },
  {
    title: 'AI & Automation',
    body:
      'OpenAI Integration, AI Chatbots, WhatsApp Automation, AI Agents, AI Workflows, and CRM Automation.',
  },
  {
    title: 'CMS, SaaS & Dashboards',
    body:
      'WordPress, Shopify, custom Admin Dashboards, Authentication systems, and API integrations.',
  },
];

const SubHeader = () => {
  return (
    <div className='w-full flex flex-col items-start text-left px-4 md:px-0'>
      <div className='w-full text-base md:text-lg lg:text-xl flex flex-col gap-3 md:gap-4 leading-relaxed text-left'>
        <p>
          Hi, I&apos;m Devender, a Full-Stack Web Developer and UI/UX-focused Product Builder.
        </p>
        <p>
          I specialize in designing and developing premium websites, SaaS platforms, AI-powered applications, dashboards, and modern digital experiences that solve real business problems.
        </p>
      </div>

      <div className='about-inline-services w-full mt-8 md:mt-12 h-auto'>
        <div className='about-inline-services__head'>
          <span className='about-inline-services__label'>CORE EXPERTISE</span>
        </div>
        <div className='about-inline-services__grid'>
          {SERVICES.map((service) => (
            <article key={service.title} className='about-inline-services__item'>
              <h4>{service.title}</h4>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubHeader
