import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from './icons';
import ShineButton from './ShineButton';
import BackgroundAnimation from './BackgroundAnimation';
import { startCheckout } from './payments';

export type Plan = {
  name: string;
  price: string;
  subtitle: string;
  term: string;
};

const planData = {
  'All-Inclusive': [
    { name: 'GYM, POOL & SAUNA 1 MONTH', price: '262.500', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'GYM, POOL & STEAM 1 MONTH', price: '262.500', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
  ],
  'Facility Combos': [
    { name: 'GYM & POOL 1 MONTH', price: '210.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'GYM & POOL 3 MONTHS', price: '525.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'GYM & SAUNA 1 MONTH', price: '210.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'GYM & SAUNA 3 MONTHS', price: '525.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'GYM & STEAM 1 MONTH', price: '210.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'GYM & STEAM 3 MONTHS', price: '525.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'POOL & STEAM 1 MONTH', price: '210.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'POOL & STEAM 3 MONTHS', price: '525.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
  ],
  'Single Facility': [
    { name: 'GYM ONLY 1 MONTH', price: '157.500', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'GYM ONLY 3 MONTHS', price: '420.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: '6 MONTH GYM ONLY', price: '787.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'POOL ONLY 1 MONTH', price: '157.500', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'POOL 3 MONTHS', price: '420.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'SAUNA ONLY 1 MONTH', price: '157.500', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'STEAM ONLY 1 MONTH', price: '157.500', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
  ],
  'Special Offers': [
    { name: '4 MONTHS - GYM-STEAM-SAUNA/POOL', price: '600.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term', isFeatured: true },
    { name: '6 MONTHS GYM, POOL, SAUNA & STEAM', price: '900.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
  ],
  'Classes & Sessions': [
    { name: 'FAT BURN CLASS', price: '200.000', subtitle: 'Group Class', term: '' },
    { name: 'ZUMBA', price: '300.000', subtitle: 'Group Class', term: '' },
    { name: 'SWIMMING 12 SESSIONS', price: '630.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
    { name: 'SWIMMING 15 SESSIONS - OFFER', price: '700.000', subtitle: 'No Signup Fee', term: 'Full Cost by Billing, Fixed Term' },
  ],
  'Special Memberships': [
    { name: 'BUILDING TENANT', price: '105.000', subtitle: 'Special Rate', term: 'For building flat owners with valid tenancy contract.' },
  ]
} as const;

const categories = Object.keys(planData);

const PlanCard: React.FC<{ plan: Plan; onSelect: () => void; isFeatured?: boolean; }> = ({ plan, onSelect }) => {
  return (
    <motion.div
      className="bg-brand-gray border border-gray-800/50 rounded-lg p-6 flex flex-col justify-between transition-all duration-300 hover:border-brand-lime/50 hover:-translate-y-1 h-full"
      layout
    >
      <div>
        <h3 className="font-heading text-lg md:text-xl font-bold uppercase text-white mb-1">{plan.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{plan.subtitle}</p>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-brand-lime mb-1">
          {plan.price} <span className="text-lg font-normal text-gray-300">AED</span>
        </p>
        <p className="text-gray-500 text-xs">{plan.term}</p>
      </div>
      <ShineButton as="button" type="button" onClick={onSelect} className="mt-6 w-full">
        Choose Plan
      </ShineButton>
    </motion.div>
  );
};

type MembershipProps = {
  onSelectPlan?: (plan: Plan) => void; // optional, falls back to direct checkout
};

const Membership: React.FC<MembershipProps> = ({ onSelectPlan }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  return (
    <section id="membership" className="bg-brand-dark py-20 relative">
      <BackgroundAnimation />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-brand-lime font-bold tracking-wider mb-2">MEMBERSHIP PLANS</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">Find the Perfect Plan for You</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Select a category to view our tailored membership options. From all-inclusive access to single-facility plans, find what fits your lifestyle.
          </p>
        </motion.div>

        <div className="relative max-w-sm mx-auto mb-12">
          <button onClick={() => setIsOpen(!isOpen)} className="w-full bg-brand-gray border border-gray-700 rounded-md p-4 text-white text-lg font-semibold flex justify-between items-center">
            {selectedCategory}
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
              <ChevronDownIcon className="w-6 h-6" />
            </motion.div>
          </button>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 bg-brand-gray border border-gray-700 rounded-md z-20 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleSelectCategory(category)}
                    className="w-full text-left p-4 hover:bg-brand-dark text-white font-semibold"
                  >
                    {category}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }}
            exit={{ opacity: 0, y: -20 }}
          >
            {planData[selectedCategory as keyof typeof planData].map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan as Plan}
                onSelect={() => {
                  if (onSelectPlan) onSelectPlan(plan as Plan);
                  else startCheckout((plan as Plan).name, (plan as Plan).price);
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Membership;