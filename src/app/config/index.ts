import { PortfolioConfig } from '@/app/types/config';
import { socials } from '@/app/config/socials';
import { projects } from '@/app/config/projects';
import { skills } from '@/app/config/skills';

export const portfolioConfig: PortfolioConfig = {
  siteMetadata: {
    title: 'Lohith Varma Dommaraju',
    description: 'Full Stack Developer actively seeking opportunities in United States.',
    author: 'Lohith Varma Dommaraju',
  },

  navigation: {
    logo: {
      text: 'LVD',
    },
    links: [
      { href: 'home', label: 'Home' },
      { href: 'about', label: 'About' },
      { href: 'projects', label: 'Projects' },
      { href: 'skills', label: 'Skills' },
      { href: 'connect', label: 'Connect' },
    ],
  },

  sections: {
    home: {
      greeting: "Hi, I'm",
      name: 'Lohith Varma Dommaraju',
      typingTexts: [
        'Full Stack Developer',
        'Open to Software Engineering Roles',
        'Building Scalable Cloud Apps',
      ],
      description:
        "I'm a passionate software engineer actively seeking full-time opportunities in full stack development, cloud systems, or backend engineering. I build impactful apps using React, Node.js, TypeScript, and AWS.",
      scrollIndicatorText: 'Explore My Work Below',
    },

    about: {
      title: 'About',
      subtitle: 'Me',
      bio: [
        "I'm Lohith Varma Dommaraju, a results-driven Software Engineer eager to contribute to innovative teams. I specialize in full stack development, cloud-native apps, and backend automation.",
        'My technical strengths include React, Node.js, TypeScript, Python, PostgreSQL, and AWS. I’ve independently built platforms for student services, chatbot automation, and financial analysis.',
        'Currently seeking software engineering roles where I can grow, solve real-world problems, and make meaningful contributions to high-impact teams.',
      ],
      details: [
        { label: 'Location', value: 'Warrensburg, MO, USA' },
        { label: 'Open To', value: 'Full-Time Software Engineering Roles' },
        { label: 'Experience', value: '1+ Years' },
        { label: 'Education', value: 'MS in CIS & IT' },
      ],
      qualities: [
        {
          icon: 'Code',
          title: 'Clean Code & Architecture',
          description:
            'I write scalable, maintainable code and design modular systems using best practices.',
          gradient: 'from-emerald-400 to-blue-500',
        },
        {
          icon: 'Rocket',
          title: 'Hire-Ready Mindset',
          description: 'Committed to continuous learning and delivering results from day one.',
          gradient: 'from-purple-400 to-pink-500',
        },
        {
          icon: 'BarChart3',
          title: 'Cloud & DevOps',
          description:
            'Deploy apps using AWS, Docker, CI/CD pipelines, and monitor performance in production.',
          gradient: 'from-yellow-400 to-orange-500',
        },
        {
          icon: 'Lightbulb',
          title: 'Fast Learner',
          description: 'Quickly adapt to new stacks and workflows in fast-paced environments.',
          gradient: 'from-cyan-400 to-teal-500',
        },
      ],
    },

    projects: {
      title: 'My',
      subtitle: 'Projects',
      description:
        "Below are real-world projects that showcase my skills in full stack engineering, problem solving, and cloud deployment. I built these to solve actual problems—and I'm excited to bring this same energy to a full-time role.",
      projects: projects,
      viewMoreButton: {
        label: 'View More Projects',
        url: 'https://github.com/lohithvd',
      },
    },

    skills: {
      title: 'Technical',
      subtitle: 'Skills',
      description:
        "These are the tools and technologies I’ve used in professional and personal projects. I'm ready to apply them immediately in any development team.",
      categories: skills,
    },

    connect: {
      title: 'Let’s',
      subtitle: 'Work Together',
      description:
        "I'm actively seeking full-time opportunities in United States. Reach out via LinkedIn or email to connect—I'd love to contribute to your team and discuss how I can help build great products.",
      socials: socials,
    },
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Lohith Varma Dommaraju. All rights reserved.`,
    tagline: 'Actively seeking software roles · Let’s connect!',
  },
};

export default portfolioConfig;
