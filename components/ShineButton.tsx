import React from 'react';

type CommonProps = {
    children: React.ReactNode;
    primary?: boolean;
    className?: string;
    disabled?: boolean;
};

type ButtonProps = CommonProps & {
    as?: 'button';
    type?: 'button' | 'submit' | 'reset';
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

type AnchorProps = CommonProps & {
    as: 'a';
    href: string;
    target?: string;
    rel?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

type Props = ButtonProps | AnchorProps;

const ShineButton: React.FC<Props> = (props) => {
    const { children, primary = false, className = '', disabled = false } = props;

    const baseClasses = "relative group overflow-hidden inline-block font-bold py-3 px-8 uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:shadow-brand-lime/30 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-lime/50 active:translate-y-0 active:shadow-none disabled:bg-gray-500 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:-translate-y-0";
    const colorClasses = primary 
        ? "bg-brand-lime text-black hover:bg-white" 
        : "border-2 border-brand-lime text-white hover:bg-brand-lime hover:text-black [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]";

    const commonContent = (
        <>
            {!disabled && <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10" />}
            {!disabled && <span className="absolute top-0 left-[-150%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:left-[150%]" />}
            <span className="relative">{children}</span>
        </>
    );

    if (props.as === 'a') {
        const { as, href, target, rel, onClick } = props;
        return (
            <a href={href} target={target} rel={rel} onClick={onClick} className={`${baseClasses} ${colorClasses} ${className}`}>
                {commonContent}
            </a>
        );
    }

    const { as, type = 'button', onClick } = props;
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${colorClasses} ${className}`}>
            {commonContent}
        </button>
    );
};

export default ShineButton;