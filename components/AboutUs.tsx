import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CertificateIcon, StarIcon } from './icons';
import BackgroundAnimation from './BackgroundAnimation';

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const testimonials = [
    { name: "Sarah L.", review: "The best gym in Abu Dhabi! The trainers are knowledgeable, and the community is so welcoming. I've seen amazing results.", rating: 5 },
    { name: "Mohammed K.", review: "IFIT's facilities are top-notch. The variety of classes keeps my routine exciting and challenging.", rating: 5 },
    { name: "Emily R.", review: "A clean, modern, and professional environment. The team truly cares about your personal fitness journey.", rating: 5 },
];

const galleryImages = [
    { src: "https://i.imgur.com/kDLNTIB.jpeg", alt: "Main gym floor with equipment", layout: "md:col-span-2 md:row-span-2" },
    { src: "https://i.imgur.com/3qmn2u4.jpeg", alt: "Cardio machine area", layout: "" },
    { src: "https://i.imgur.com/lyZg57O.jpeg", alt: "Free weights section", layout: "" },
    { src: "https://i.imgur.com/z4RW2lr.jpeg", alt: "Strength training machines", layout: "" },
    { src: "https://i.imgur.com/emzhS5X.jpeg", alt: "Spinning class bikes", layout: "" },
    { src: "https://i.imgur.com/NbVRSLK.jpeg", alt: "Close-up of a barbell", layout: "md:col-span-2" },
    { src: "https://i.imgur.com/BQ3Mlqd.jpeg", alt: "Another view of the gym floor", layout: "" },
    { src: "https://i.imgur.com/8TiRixB.jpeg", alt: "Functional training area", layout: "" },
    { src: "https://i.imgur.com/ArBfMNy.jpeg", alt: "Reception and entrance area", layout: "md:col-span-2" },
];


const AboutUs: React.FC = () => {
    return (
        <section id="about-us" className="py-20 bg-brand-dark relative overflow-hidden">
            <BackgroundAnimation />
            <div className="container mx-auto px-6 relative z-10">
                
                {/* --- Our Story & Credentials --- */}
                <motion.div 
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-brand-lime font-bold tracking-wider mb-2">ABOUT IFIT FITNESS CLUB</p>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">Our Commitment to Excellence</h2>
                    <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
                        Founded in the heart of Abu Dhabi, IFIT Fitness Club was born from a passion for empowering individuals to achieve their peak physical and mental well-being. We are a fully licensed and compliant business dedicated to providing a safe, professional, and high-quality fitness environment.
                    </p>
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex justify-center gap-4 flex-wrap">
                       <motion.div variants={itemVariants} className="flex items-center bg-brand-gray/50 p-3 rounded-lg border border-gray-700/50">
                           <CertificateIcon className="w-6 h-6 text-brand-lime mr-2" /> <span className="font-semibold text-white">Trade License</span>
                       </motion.div>
                       <motion.div variants={itemVariants} className="flex items-center bg-brand-gray/50 p-3 rounded-lg border border-gray-700/50">
                           <CertificateIcon className="w-6 h-6 text-brand-lime mr-2" /> <span className="font-semibold text-white">VAT Registered</span>
                       </motion.div>
                       <motion.div variants={itemVariants} className="flex items-center bg-brand-gray/50 p-3 rounded-lg border border-gray-700/50">
                           <CertificateIcon className="w-6 h-6 text-brand-lime mr-2" /> <span className="font-semibold text-white">Safety Certified</span>
                       </motion.div>
                    </motion.div>
                </motion.div>

                {/* --- Testimonials --- */}
                 <motion.div className="mb-20" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
                    <div className="text-center mb-12">
                         <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase">What Our Members Say</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial) => (
                            <motion.div key={testimonial.name} variants={itemVariants} className="bg-brand-gray p-6 rounded-lg border border-gray-800/50 h-full flex flex-col justify-between">
                                <p className="text-gray-300 italic mb-4">"{testimonial.review}"</p>
                                <div>
                                    <div className="flex items-center mb-2">
                                        {Array(testimonial.rating).fill(0).map((_, i) => <StarIcon key={i} className="w-5 h-5 text-yellow-400" />)}
                                    </div>
                                    <p className="font-bold text-white">{testimonial.name}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                 </motion.div>

                {/* --- Virtual Gallery --- */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase">Virtual Gallery</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4">
                        {galleryImages.map((image, index) => (
                            <motion.div 
                                key={index} 
                                variants={itemVariants} 
                                className={`relative overflow-hidden rounded-lg group ${image.layout}`}
                            >
                                <img src={image.src} alt={image.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-sm font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.alt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutUs;