import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavLink: React.FC<{
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
  isActive: boolean;
}> = ({ href, onClick, children, isActive }) => (
  <a
    href={href}
    onClick={onClick}
    className="relative group px-3 py-2 font-semibold focus:outline-none focus:text-brand-lime"
  >
    <span
      className={`relative z-10 transition-colors duration-200 ${
        isActive ? 'text-black' : 'text-white'
      }`}
    >
      {children}
    </span>
    <motion.div
      className="absolute inset-0 bg-brand-lime rounded-full"
      initial={false}
      animate={{
        scale: isActive ? 1 : 0,
        opacity: isActive ? 1 : 0,
      }}
      whileHover={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />
  </a>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = ['Home', 'Facilities', 'About Us', 'Membership', 'Classes', 'Contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navLinks.map((link) => {
        const id = link.toLowerCase().replace(' ', '-');
        return document.getElementById(id);
      });

      const scrollPosition = window.scrollY;
      const header = document.querySelector('header');
      const headerHeight = header ? (header as HTMLElement).offsetHeight : 0;
      const offset = headerHeight + 50;

      let currentSectionId = '';

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop - offset;
          if (scrollPosition >= sectionTop) currentSectionId = section.id;
        }
      }

      if (scrollPosition < 200) currentSectionId = 'home';
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentSectionId = 'contact';
      }

      if (currentSectionId) setActiveSection(currentSectionId);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { when: 'beforeChildren', staggerChildren: 0.05 } },
    exit: { opacity: 0, y: -20 },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0 },
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const id = href.substring(1);
    if (!id) return;

    const performScroll = () => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        const header = document.querySelector('header') as HTMLElement | null;
        if (element && header) {
          const headerHeight = header.offsetHeight;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
      history.pushState(null, '', `#${id}`);
    };

    if (isOpen) {
      setIsOpen(false);
      setTimeout(performScroll, 300);
    } else {
      performScroll();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-black/50 backdrop-blur-sm'
      }`}
    >
      <div
        className={`container mx-auto px-6 flex justify-between items-center transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <a href="#home" onClick={handleNavClick} className="flex items-center">
          <img
            src="https://i.imgur.com/4MbdcYs.png"
            alt="IFIT Logo"
            className={`w-auto transition-all duration-300 ${scrolled ? 'h-8' : 'h-10'}`}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => {
            const id = link.toLowerCase().replace(' ', '-');
            return (
              <NavLink key={link} href={`#${id}`} onClick={handleNavClick} isActive={activeSection === id}>
                {link}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="text-white focus:outline-none z-50 relative"
            aria-label="Toggle navigation"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            key="mobile-nav"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="md:hidden mx-4 mt-2 rounded-2xl bg-black/90 border border-white/10 backdrop-blur p-3"
          >
            <ul className="flex flex-col divide-y divide-white/10">
              {navLinks.map((link) => {
                const id = link.toLowerCase().replace(' ', '-');
                return (
                  <motion.li key={id} variants={linkVariants}>
                    <a
                      href={`#${id}`}
                      onClick={handleNavClick}
                      className={`block w-full px-4 py-3 text-base font-semibold ${
                        activeSection === id ? 'text-brand-lime' : 'text-white'
                      }`}
                    >
                      {link}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
