import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FacebookIcon, InstagramIcon, TwitterIcon, EnvelopeIcon, SuccessIcon } from './icons';
import ShineButton from './ShineButton';

const footerContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
};

const footerItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const SocialIcon: React.FC<{ href: string; children: React.ReactNode; }> = ({ href, children }) => (
    <motion.a 
        href={href} 
        target="_blank"
        rel="noopener noreferrer"
        className="relative group overflow-hidden text-gray-400 hover:text-brand-lime" 
        whileHover={{ scale: 1.2, y: -2 }}
    >
        <span className="absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out group-hover:left-[150%]" />
        {children}
    </motion.a>
);

const Footer: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formState, setFormState] = useState<{ status: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ status: 'idle', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setFormState({ status: 'loading', message: '' });
        try {
            const response = await fetch('/api/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong.');
            }
            setFormState({ status: 'success', message: data.success });
            setFormData({ name: '', email: '', message: '' });

        } catch (err: any) {
            setFormState({ status: 'error', message: err.message });
        }
    };


    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (!href || href === '#') return;

        const id = href.replace('#', '');
        
        if (id === 'home') {
             window.scrollTo({ top: 0, behavior: 'smooth' });
             return;
        }

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
    
    const inputClasses = "w-full bg-black border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-brand-lime focus:border-brand-lime transition placeholder-gray-500";

    return (
        <footer id="contact" className="bg-black text-gray-400 py-20">
            <motion.div 
                className="container mx-auto px-6"
                variants={footerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                <div className="text-center mb-16">
                    <p className="text-brand-lime font-bold tracking-wider mb-2">CONTACT US</p>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase text-white">Get In Touch</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        Have a question or ready to start your fitness journey? Send us a message or visit us at our prime location in Abu Dhabi.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
                    {/* INFO COLUMN */}
                    <motion.div className="lg:col-span-2" variants={footerItemVariants}>
                        <div className="flex items-center mb-6">
                            <img src="https://i.imgur.com/4MbdcYs.png" alt="IFIT Logo" className="h-10 w-auto" />
                        </div>
                        <p className="mb-8">Your ultimate destination for health, strength, and well-being in Abu Dhabi. Join our family today!</p>
                        
                        <h4 className="font-bold text-white mb-4 uppercase font-heading tracking-wider">Contact Details</h4>
                        <p className="mb-2">Sheikh Zayed Bin Sultan St - Al Zahiyah - E16 - Abu Dhabi, UAE</p>
                        <p className="mb-2">Phone: <a href="tel:+971581514436" className="hover:text-brand-lime transition-colors">+971 58 151 4436</a></p>
                        <p className="mb-4">Email: <a href="mailto:ifc.fitness.ae@gmail.com" className="hover:text-brand-lime transition-colors">ifc.fitness.ae@gmail.com</a></p>
                        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lime transition-colors font-semibold">View on Google Maps</a>

                        <h4 className="font-bold text-white mb-4 uppercase font-heading tracking-wider mt-10">Follow Us</h4>
                        <div className="flex space-x-4">
                           <SocialIcon href="https://instagram.com"><InstagramIcon className="w-6 h-6" /></SocialIcon>
                           <SocialIcon href="https://facebook.com"><FacebookIcon className="w-6 h-6" /></SocialIcon>
                           <SocialIcon href="https://twitter.com"><TwitterIcon className="w-6 h-6" /></SocialIcon>
                        </div>
                    </motion.div>
                    
                    {/* FORM COLUMN */}
                    <motion.div className="lg:col-span-3" variants={footerItemVariants}>
                         <h4 className="font-bold text-white mb-4 uppercase font-heading tracking-wider">Send a Message</h4>
                         <div className="bg-brand-gray p-8 rounded-lg border border-gray-800/50">
                            <AnimatePresence mode="wait">
                                {formState.status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center flex flex-col items-center justify-center min-h-[290px]"
                                    >
                                        <SuccessIcon className="w-16 h-16 text-brand-lime mb-4" />
                                        <p className="font-semibold text-lg text-white">{formState.message}</p>
                                    </motion.div>
                                ) : (
                                    <motion.form 
                                        key="form"
                                        onSubmit={handleSubmit} 
                                        className="space-y-6"
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <div>
                                            <label htmlFor="name" className="sr-only">Name</label>
                                            <input type="text" name="name" id="name" placeholder="Your Name" required className={inputClasses} value={formData.name} onChange={handleInputChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="sr-only">Email</label>
                                            <input type="email" name="email" id="email" placeholder="Your Email" required className={inputClasses} value={formData.email} onChange={handleInputChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="sr-only">Message</label>
                                            <textarea name="message" id="message" rows={4} placeholder="Your Message" required className={inputClasses} value={formData.message} onChange={handleInputChange}></textarea>
                                        </div>
                                        <div className="flex flex-col items-center">
                                             <ShineButton type="submit" primary disabled={formState.status === 'loading'} className="w-full">
                                                {formState.status === 'loading' ? 'Sending...' : 'Send Message'}
                                            </ShineButton>
                                            <AnimatePresence>
                                                {formState.status === 'error' && (
                                                    <motion.p 
                                                        className="mt-4 text-red-400 text-sm"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                    >
                                                        {formState.message}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                         </div>
                    </motion.div>
                </div>

                <motion.div 
                    className="border-t border-gray-800 pt-8 text-center text-sm"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <p>&copy; {new Date().getFullYear()} IFIT Fitness Club. All Rights Reserved.</p>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;