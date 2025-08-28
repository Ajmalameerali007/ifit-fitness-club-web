import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Facilities from './components/Facilities';
import ImageBreak from './components/ImageBreak';
import Membership, { Plan } from './components/Membership';
import Classes from './components/Classes';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import AboutUs from './components/AboutUs';
import AICoach from './components/AICoach'; // ⬅️ NEW

const App: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="bg-brand-dark text-white font-body">
      <Header />
      <main>
        <Hero />
        <Facilities />
        <ImageBreak />
        <AboutUs />
        {/* ⬇️ NEW: AI Coach section mounted on the page */}
        <AICoach />
        <Membership onSelectPlan={handleSelectPlan} />
        <Classes />
      </main>
      <Footer />
      <CheckoutModal
        plan={selectedPlan}
        isOpen={!!selectedPlan}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;
