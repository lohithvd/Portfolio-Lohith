'use client';

import Head from 'next/head';
import React, { useState, useEffect, useCallback } from 'react';
import { Skills } from '@/app/sections/skills';
import { ConnectWithMe } from '@/app/sections/connect';
import { Footer } from '@/app/sections/footer';
import { Home } from '@/app/sections/home';
import { Projects } from '@/app/sections/projects';
import { About } from '@/app/sections/about';
import { MobileNavBar } from '@/app/sections/mobile-navbar';
import { NavBar } from '@/app/sections/navbar';
import { Menu, X } from 'lucide-react';

export default function Page() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';

      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY >= sectionTop - 200) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  const handleSectionNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
      e.preventDefault();
      scrollToSection(sectionId);
      setMenuOpen(false);
    },
    [scrollToSection]
  );

  if (!mounted) return null;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen text-gray-200">
      <Head>
        <title>Praveen Kumar | Portfolio</title>
        <meta
          name="description"
          content="Personal portfolio website showcasing projects and skills"
        />
      </Head>

      <div className="fixed top-3.5 right-6 z-50 lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
          className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-100 shadow-lg border border-gray-700/50"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <NavBar onSectionNav={handleSectionNav} activeSection={activeSection} />

      <MobileNavBar menuOpen={menuOpen} activeSection={activeSection} setMenuOpen={setMenuOpen} />

      <main>
        <Home
          onConnectClick={e => {
            handleSectionNav(e, 'connect');
          }}
        />
        <About />
        <Projects />
        <Skills />
        <ConnectWithMe />
      </main>

      <Footer />
    </div>
  );
}
