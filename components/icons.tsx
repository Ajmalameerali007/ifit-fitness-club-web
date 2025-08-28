import React from 'react';

type IconProps = {
    className?: string;
};

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export const SuccessIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const DumbbellIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2.5a2 2 0 012 2v14a2 2 0 01-2 2H3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 3h-2.5a2 2 0 00-2 2v14a2 2 0 002 2H21" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12h9" />
    </svg>
);

export const PoolIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 9.925l.345-6.897m3.81.011l.346-6.897m3.81.011l.346-6.897M12 21a9 9 0 110-18 9 9 0 010 18z" />
    </svg>
);

export const SaunaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10s5 2 7 0 2.657-2.657 2.657-2.657zM12 6V4M4.222 11.222l-1.414 1.414M19.778 11.222l1.414 1.414M12 20v2" />
    </svg>
);

export const StudioIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4v16" />
    </svg>
);

export const PersonalTrainingIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

export const LockerIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h2v-4h1.5m0-4H10m0 0V8m0 4h1.5m0-4H10m0 0V8m3 12h2a2 2 0 002-2V6a2 2 0 00-2-2h-2v4h-1.5m0 4H12m0 0v4m0-4h-1.5m0 4H12m0 0v4" />
    </svg>
);

export const FacebookIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.258.056 2.105.248 2.855.546.82.327 1.5.77 2.18 1.452.678.68 1.125 1.362 1.452 2.18.3.75.49 1.597.546 2.855.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.258-.248 2.105-.546 2.855-.327.82-.77 1.5-1.452 2.18-.68.678-1.362 1.125-2.18 1.452-.75.3-1.597.49-2.855.546-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.258-.056-2.105-.248-2.855-.546-.82-.327-1.5-.77-2.18-1.452-.678-.68-1.125-1.362-1.452-2.18-.3-.75-.49-1.597-.546-2.855-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.258.248 2.105.546 2.855.327-.82.77-1.5 1.452-2.18.68-.678 1.362-1.125 2.18-1.452.75-.3 1.597.49 2.855-.546C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.14 0-3.5.01-4.722.066-1.19.054-1.92.234-2.484.444-.616.23-1.08.51-1.562.99-.48.48-.76.946-.99 1.563-.21.564-.39 1.293-.444 2.484C2.175 8.5 2.163 8.86 2.163 12s.012 3.5.066 4.722c.054 1.19.234 1.92.444 2.484.23.616.51 1.08.99 1.562.48.48.946.76 1.563.99.564.21 1.293.39 2.484.444C8.5 21.825 8.86 21.837 12 21.837s3.5-.012 4.722-.066c1.19-.054 1.92-.234 2.484-.444.616-.23 1.08-.51 1.562-.99.48-.48.76.946.99-1.563.21-.564.39-1.293.444-2.484C21.825 15.5 21.837 15.14 21.837 12s-.012-3.5-.066-4.722c-.054-1.19-.234-1.92-.444-2.484-.23-.616-.51-1.08-.99-1.562-.48-.48-.946-.76-1.563-.99-.564-.21-1.293.39-2.484-.444C15.5 3.975 15.14 3.965 12 3.965zm0 2.88c-2.84 0-5.153 2.313-5.153 5.153s2.313 5.153 5.153 5.153 5.153-2.313 5.153-5.153-2.313-5.153-5.153-5.153zm0 8.413c-1.8 0-3.26-1.46-3.26-3.26s1.46-3.26 3.26-3.26 3.26 1.46 3.26 3.26-1.46 3.26-3.26 3.26zm6.34-8.62c-.74 0-1.34.6-1.34 1.34s.6 1.34 1.34 1.34 1.34-.6 1.34-1.34-.6-1.34-1.34-1.34z" />
    </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.92 4.92 0 004.6 3.419A9.9 9.9 0 010 17.54a13.94 13.94 0 007.544 2.212c9.142 0 14.307-7.447 14.307-14.307 0-.218-.005-.436-.013-.652a10.186 10.186 0 002.502-2.583z" />
    </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

export const CertificateIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 21a6 6 0 006-6v-1a3 3 0 00-3-3H6a3 3 0 00-3 3v1a6 6 0 006 6z" />
    </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

export const YogaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c-3.73 0-6.75 1.52-6.75 3.375S8.27 19.5 12 19.5s6.75-1.52 6.75-3.375S15.73 12.75 12 12.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c-1.865 0-3.375-1.52-3.375-3.375S10.135 6 12 6s3.375 1.52 3.375 3.375-1.51 3.375-3.375 3.375z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const GymIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 6v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 6v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 12h4" />
    </svg>
);

export const EnvelopeIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

export const HiitIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M57 16L40 28.5L10 32.5" />
            <path d="M40 28.5L32 38" />
            <path d="M10 32.5L19 38" />
            <circle cx="51.5" cy="8.5" r="6.5" />
        </g>
    </svg>
);

export const MeditationIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M32 5C45.25 5 56 16.75 56 30S45.25 55 32 55 8 43.25 8 30 18.75 5 32 5Z" strokeDasharray="4 4" />
            <circle cx="32" cy="21" r="5" />
            <path d="M24 32v-2c0-4.4 3.6-8 8-8s8 3.6 8 8v2" />
            <path d="M22 46c-6.8-1-10-6-6-11" />
            <path d="M42 46c6.8-1 10-6 6-11" />
            <path d="M16 54c0-8.8 6-12 16-12s16 3.2 16 12" />
        </g>
    </svg>
);


export const AquaAerobicsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M46 13c3.3-3.3 3.3-8.7 0-12" />
            <path d="M39 12L46 5" />
            <path d="M39 29V20" />
            <circle cx="32" cy="20" r="5" />
            <path d="M25 29V20" />
            <path d="M5 40c4-1 8 2 12 2s8-3 12-2 8 3 12 2 8-3 12-2" />
            <path d="M5 48c4-1 8 2 12 2s8-3 12-2 8 3 12 2 8-3 12-2" />
        </g>
    </svg>
);

export const ZumbaIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 44 58" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="22" cy="6" r="5" />
            <path d="M34 9c4-2 7 2 5 6" />
            <path d="M22 11v16" />
            <path d="M22 27L8 23" />
            <path d="M22 27l-5 20" />
            <path d="M22 27l12 18" />
        </g>
    </svg>
);

export const BodyPumpIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="8" width="12" height="8" rx="2" />
            <rect x="48" y="8" width="12" height="8" rx="2" />
            <path d="M16 12h32" />
            <circle cx="32" cy="28" r="4" />
            <path d="M32 32v14" />
            <path d="M24 20l8 4" />
            <path d="M40 20l-8 4" />
            <path d="M32 46L24 56" />
            <path d="M32 46l8 10" />
        </g>
    </svg>
);