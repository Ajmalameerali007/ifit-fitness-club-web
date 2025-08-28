import React from 'react';
import { motion, Variants } from 'framer-motion';
import { GymIcon, PoolIcon, SaunaIcon, StudioIcon, PersonalTrainingIcon, LockerIcon } from './icons';
import BackgroundAnimation from './BackgroundAnimation';

type IconProps = {
    className?: string;
};

type Facility = {
    name: string;
    description: string;
    icon: React.FC<IconProps>;
    imageUrl: string;
    videoUrl?: string;
};

const facilitiesData: Facility[] = [
    {
        name: "State-of-the-Art Gym",
        description: "Experience the pinnacle of fitness with our cutting-edge equipment. From high-performance cardio machines to a comprehensive range of strength training gear, we have everything you need to crush your goals.",
        icon: GymIcon,
        videoUrl: "https://i.imgur.com/IrNCamQ.mp4",
        imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2669&auto=format=fit=crop",
    },
    {
        name: "Swimming Pool",
        description: "Perfect for laps or a relaxing dip, our temperature-controlled pool offers a refreshing workout experience.",
        icon: PoolIcon,
        imageUrl: "https://images.unsplash.com/photo-1559124119-9b936d8c5545?q=80&w=2670&auto=format=fit=crop",
        videoUrl: "https://i.imgur.com/dGLRvy9.mp4",
    },
    {
        name: "Sauna & Steam Rooms",
        description: "Unwind and detoxify after your workout in our luxurious sauna and steam rooms, designed for ultimate relaxation.",
        icon: SaunaIcon,
        imageUrl: "https://images.unsplash.com/photo-1610419992323-535193498956?q=80&w=2670&auto=format=fit=crop",
        videoUrl: "https://i.imgur.com/6KQuC7S.mp4",
    },
    {
        name: "Professional Swim Training",
        description: "Dive into our professional swimming programs. Led by certified instructors, we offer classes for all ages and skill levels.",
        icon: PoolIcon,
        imageUrl: "https://images.unsplash.com/photo-1558214227-158a56c402a3?q=80&w=2670&auto=format=fit=crop",
        videoUrl: "https://i.imgur.com/AIjUseI.mp4",
    },
    {
        name: "Personal Training Area",
        description: "A dedicated zone for one-on-one coaching with our expert trainers, focusing on your personal fitness goals.",
        icon: PersonalTrainingIcon,
        imageUrl: "https://images.unsplash.com/photo-1596357395217-e7458444c10a?q=80&w=2670&auto=format=fit=crop",
        videoUrl: "https://i.imgur.com/SInMqjm.mp4",
    },
    {
        name: "Group Exercise Studios",
        description: "Spacious and fully equipped studios host our wide range of classes, from high-energy HIIT to calming Yoga.",
        icon: StudioIcon,
        imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2720&auto=format=fit=crop",
        videoUrl: "https://i.imgur.com/kKEWP5O.mp4",
    },
    {
        name: "Locker Rooms & Showers",
        description: "Clean, secure, and modern locker rooms with private showers provide comfort and convenience.",
        icon: LockerIcon,
        imageUrl: "https://images.unsplash.com/photo-1581009137054-1a287951a84c?q=80&w=2670&auto=format=fit=crop",
        videoUrl: "https://i.imgur.com/hl9KQRM.mp4",
    }
];

const containerVariants: Variants = {
    hidden: { },
    visible: { transition: { staggerChildren: 0.1 } }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const FeaturedFacilityCard: React.FC<Facility> = ({ name, description, icon: Icon, imageUrl, videoUrl }) => (
    <motion.div
        className="mb-12 rounded-lg border border-gray-800/50 group overflow-hidden bg-brand-gray"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <div className="lg:flex">
            <div className="lg:w-3/5 overflow-hidden">
                <motion.video
                    src={videoUrl}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    autoPlay loop muted playsInline poster={imageUrl}
                />
            </div>
            <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                 <div className="flex items-center mb-4">
                    <Icon className="w-10 h-10 text-brand-lime mr-4 flex-shrink-0" />
                    <h3 className="text-3xl font-heading font-bold uppercase text-white">{name}</h3>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
            </div>
        </div>
    </motion.div>
);

const FacilityCard: React.FC<Facility> = ({ name, description, icon: Icon, imageUrl, videoUrl }) => (
    <motion.div
        className="bg-brand-gray rounded-lg overflow-hidden border border-gray-800/50 group h-full flex flex-col"
        variants={cardVariants}
        whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }}
    >
        <div className="relative aspect-[16/10] overflow-hidden">
            {videoUrl ? (
                <motion.video
                    src={videoUrl}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={imageUrl}
                />
            ) : (
                <motion.img 
                    src={imageUrl} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            )}
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <div className="flex items-center mb-3">
                <Icon className="w-8 h-8 text-brand-lime mr-4 flex-shrink-0" />
                <h3 className="text-2xl font-heading font-bold uppercase text-white">{name}</h3>
            </div>
            <p className="text-gray-400">{description}</p>
        </div>
    </motion.div>
);

const Facilities: React.FC = () => {
    const featuredFacility = facilitiesData[0];
    const otherFacilities = facilitiesData.slice(1);

    return (
        <section id="facilities" className="bg-brand-dark py-20 relative">
            <BackgroundAnimation />
            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-brand-lime font-bold tracking-wider mb-2">OUR FACILITIES</p>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase">World-Class Amenities</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                        Enjoy top-tier amenities designed for a complete fitness experience. At IFIT Fitness Club, you’ll find everything you need under one roof.
                    </p>
                </motion.div>
                
                <FeaturedFacilityCard {...featuredFacility} />

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {otherFacilities.map((facility) => (
                        <FacilityCard key={facility.name} {...facility} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Facilities;