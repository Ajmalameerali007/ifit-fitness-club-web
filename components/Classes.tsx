import React from 'react';
import { motion, Variants } from 'framer-motion';
import { HiitIcon, MeditationIcon, AquaAerobicsIcon, ZumbaIcon, BodyPumpIcon } from './icons'; 
import ShineButton from './ShineButton';

const classesData = [
    { name: "HIIT & Functional Training", icon: HiitIcon },
    { name: "Yoga & Meditation", icon: MeditationIcon },
    { name: "Aqua Aerobics (Pool-based)", icon: AquaAerobicsIcon },
    { name: "Zumba", icon: ZumbaIcon },
    { name: "Body Pump", icon: BodyPumpIcon },
];

const containerVariants: Variants = {
  hidden: { },
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } }
};


const Classes: React.FC = () => {
    return (
        <section id="classes" className="bg-brand-gray py-20 relative">
            <motion.div 
                className="container mx-auto px-6 flex flex-col items-center relative z-10"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="max-w-3xl text-center">
                    <p className="text-brand-lime font-bold tracking-wider mb-2">CLASSES & PERSONAL TRAINING</p>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">Achieve Your Goals With Us</h2>

                    <p className="text-lg text-gray-300 leading-relaxed mb-12">
                        Whether you prefer the energy of group classes or the focused attention of a personal trainer, we have you covered. Our certified trainers and motivating instructors are here to guide you.
                    </p>
                    
                    <motion.div 
                      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                        {classesData.map((cls) => (
                            <motion.div 
                                key={cls.name} 
                                className="text-center p-4 bg-brand-dark/50 rounded-lg border border-gray-700/50"
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                            >
                                <cls.icon className="w-16 h-16 text-brand-lime mx-auto mb-3" />
                                <h3 className="font-semibold text-white text-sm md:text-base">{cls.name}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                    
                    <p className="text-gray-400 mb-8">
                        For the latest weekly class schedule, contact us or visit our Instagram page.
                    </p>

                    <ShineButton as="a" href="https://wa.me/971581514436" target="_blank" rel="noopener noreferrer">
                        Contact For Schedule
                    </ShineButton>
                </div>
            </motion.div>
        </section>
    );
};

export default Classes;