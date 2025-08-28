import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Plan } from './Membership';
import { CloseIcon, SuccessIcon } from './icons';

declare var MamoPay: any;

type CheckoutModalProps = {
    isOpen: boolean;
    onClose: () => void;
    plan: Plan | null;
};

const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.2 } },
};

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, plan }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [paymentLink, setPaymentLink] = useState<string | null>(null);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const [isIframeLoaded, setIsIframeLoaded] = useState(false);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);
    
    useEffect(() => {
        if (isOpen && plan && !isPaymentComplete) {
            const createPaymentLink = async () => {
                setIsLoading(true);
                setError(null);
                setPaymentLink(null);
                setIsIframeLoaded(false);
                try {
                    const response = await fetch('/api/create-payment-link', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(plan),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Could not create payment link.');
                    }
                    
                    const data = await response.json();
                    setPaymentLink(data.paymentLinkUrl);

                } catch (err: any) {
                    setError(err.message || 'An unexpected error occurred.');
                } finally {
                    setIsLoading(false);
                }
            };
            createPaymentLink();
        }

        if (!isOpen) {
            setTimeout(() => {
                setPaymentLink(null);
                setIsLoading(false);
                setError(null);
                setIsPaymentComplete(false);
                setIsIframeLoaded(false);
            }, 300);
        }

    }, [isOpen, plan, isPaymentComplete]);

    useEffect(() => {
        if (paymentLink) {
            try {
                const mamoPay = new MamoPay();
                mamoPay.addIframeToWebsite("mamo-checkout-element", paymentLink);
                
                // Simulate iframe loading delay
                const timer = setTimeout(() => setIsIframeLoaded(true), 2000);
                return () => clearTimeout(timer);

            } catch (e) {
                console.error("MamoPay SDK error:", e);
                setError("Could not load the payment gateway.");
            }
        }
    }, [paymentLink]);
    
    const renderContent = () => {
        if (isPaymentComplete) {
            return (
                 <motion.div 
                     className="text-center"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5, ease: 'backOut' }}
                 >
                     <div className="mx-auto mb-4 bg-brand-lime/20 rounded-full w-20 h-20 flex items-center justify-center">
                        <SuccessIcon className="w-12 h-12 text-brand-lime" />
                     </div>
                     <h2 className="font-heading text-3xl font-bold uppercase text-brand-lime mb-3">Payment Successful!</h2>
                     <p className="text-lg text-gray-200 mb-4">Your <span className="font-bold text-white">{plan?.name}</span> plan is now active.</p>
                     <p className="text-gray-400">Welcome to the IFIT family! A confirmation receipt has been sent to your email.</p>
                     <button onClick={onClose} className="mt-8 w-full bg-brand-lime text-black font-bold py-3 px-8 uppercase tracking-wider transition-all duration-300 hover:bg-white">
                         Awesome!
                     </button>
                 </motion.div>
            )
        }
        
        return (
             <>
                <h2 className="font-heading text-3xl font-bold uppercase text-brand-lime mb-2">Checkout</h2>
                <p className="text-gray-300 mb-6">Finalize your payment for the <span className="font-bold text-white">{plan?.name}</span> plan.</p>
                
                <div className="bg-brand-dark rounded-md min-h-[400px] flex items-center justify-center relative">
                    {isLoading && <p>Creating secure payment link...</p>}
                    {error && <p className="text-red-400 text-center px-4">{error}</p>}
                    <AnimatePresence>
                    {paymentLink && (
                        <motion.div 
                            id="mamo-checkout-element" 
                            className="w-full h-[400px]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    )}
                    </AnimatePresence>
                </div>
                <AnimatePresence>
                    {isIframeLoaded && (
                         <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ delay: 0.5 }}
                         >
                            <button
                                onClick={() => setIsPaymentComplete(true)}
                                className="mt-6 w-full bg-brand-lime text-black font-bold py-3 px-8 uppercase tracking-wider transition-all duration-300 hover:bg-white"
                            >
                                Confirm Purchase (Simulated)
                            </button>
                         </motion.div>
                    )}
                </AnimatePresence>
            </>
        )
    }

    if (!plan && !isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="relative bg-brand-gray w-full max-w-md p-8 rounded-lg shadow-2xl border border-gray-700"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-lime rounded-full z-10">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                        {renderContent()}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CheckoutModal;