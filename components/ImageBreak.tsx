import React from 'react';
import { motion } from 'framer-motion';

const ImageBreak: React.FC = () => {
    return (
        <div className="py-16 bg-brand-dark">
            <div className="container mx-auto px-6 flex items-center justify-center relative">
                <motion.div 
                    className="h-px w-full bg-gradient-to-r from-transparent via-brand-lime/30 to-transparent absolute left-0 right-0"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
                    className="relative z-10 flex items-center justify-center px-6 py-2 bg-brand-gray rounded-full border-2 border-brand-lime/50 shadow-lg shadow-brand-lime/20"
                >
                    <img src="https://i.imgur.com/4MbdcYs.png" alt="IFIT Logo" className="h-8 w-auto" />
                </motion.div>
            </div>
        </div>
    );
};

export default ImageBreak;