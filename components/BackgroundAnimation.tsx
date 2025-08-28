import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Particle: React.FC<{ x: string; y: string; size: number; delay: number }> = ({ x, y, size, delay }) => {
    return (
        <motion.circle
            cx={x}
            cy={y}
            r={size}
            fill="#a3e635"
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 0.1, 0],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: Math.random() * 6 + 6,
                repeat: Infinity,
                repeatType: "loop",
                delay,
                ease: "easeInOut",
            }}
        />
    );
};


const BackgroundAnimation: React.FC = () => {
    const particles = useMemo(() => {
        const particleCount = 40;
        return Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 0.8 + 0.3,
            delay: Math.random() * 7,
        }));
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-brand-dark">
            <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
                <defs>
                    <radialGradient id="grad-bg">
                        <stop offset="0%" stopColor="#18181b" />
                        <stop offset="100%" stopColor="#111111" />
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grad-bg)" />
                {particles.map(p => (
                     <Particle key={p.id} x={`${p.x}%`} y={`${p.y}%`} size={p.size} delay={p.delay} />
                ))}
            </svg>
        </div>
    );
};

export default BackgroundAnimation;