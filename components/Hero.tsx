import React, { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { ChevronDownIcon } from './icons';
import ShineButton from './ShineButton';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ScrollIndicator: React.FC = () => (
    <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
    >
        <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
            <ChevronDownIcon className="w-8 h-8 text-white/70" />
        </motion.div>
    </motion.div>
);


const Hero: React.FC = () => {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href || href === '#') return;

        const id = href.substring(1);
        const element = document.getElementById(id);
        const header = document.querySelector('header');

        if (element) {
            const headerHeight = header ? header.offsetHeight : 0;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section ref={heroRef} id="home" className="relative h-screen flex items-end justify-center text-center text-white pb-24 sm:pb-32 overflow-hidden bg-black">
            <motion.video 
              style={{ y: videoY }}
              className="absolute top-0 left-0 w-full h-full object-cover" 
              src="https://i.imgur.com/da7ERow.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
            >
              Your browser does not support the video tag.
            </motion.video>
            <div className="absolute inset-0 bg-black/30"></div>
            <div 
                className="absolute inset-0 bg-[url('https://res.cloudinary.com/dfhpk8hgs/image/upload/v1692735732/noise_x2.png')] opacity-20"
                style={{ backgroundSize: '100px' }}
            ></div>
            
            <motion.div
                className="relative z-10 p-6 flex flex-col items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <ShineButton as="a" href="#membership" onClick={handleScrollTo} primary>Get Started</ShineButton>
                    <ShineButton as="a" href="#facilities" onClick={handleScrollTo}>Learn More</ShineButton>
                </motion.div>
            </motion.div>
            <ScrollIndicator />
        </section>
    );
};

export default Hero;