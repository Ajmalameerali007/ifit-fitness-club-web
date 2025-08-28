import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ShineButton from './ShineButton';
import { SparklesIcon } from './icons';
import BackgroundAnimation from './BackgroundAnimation';

const InputField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    {children}
  </div>
);

const AICoach: React.FC = () => {
  const [form, setForm] = useState({
    goal: 'Lose Weight',
    experience: 'Beginner',
    frequency: 4,        // sessions / week
    session_mins: 45,    // minutes
    duration: 8,         // weeks
    notes: ''
  });

  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const planRef = useRef<HTMLDivElement>(null);

  const inputStyles =
    'w-full bg-brand-dark border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-brand-lime focus:border-brand-lime transition';

  const setField = (k: string, v: any) => setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedPlan('');

    setTimeout(() => {
      planRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 150);

    try {
      const res = await fetch('/api/generate-plan-stream-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);

      setGeneratedPlan(data.plan || 'No plan generated.');
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-coach" className="bg-brand-gray py-20 relative overflow-hidden">
      <BackgroundAnimation />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-brand-lime font-bold tracking-wider mb-2">AI-POWERED FITNESS</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">Your Personal AI Coach</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get a workout plan tailored to your needs in seconds. Fill the form and your IFIT AI Coach will craft a week-by-week program.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-brand-dark p-8 rounded-lg border border-gray-800"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <InputField label="Primary Fitness Goal">
              <select
                className={inputStyles}
                value={form.goal}
                onChange={(e) => setField('goal', e.target.value)}
              >
                <option>Lose Weight</option>
                <option>Build Muscle</option>
                <option>Improve Endurance</option>
                <option>General Fitness</option>
              </select>
            </InputField>

            <InputField label="Experience Level">
              <select
                className={inputStyles}
                value={form.experience}
                onChange={(e) => setField('experience', e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </InputField>

            <InputField label="Workouts Per Week">
              <select
                className={inputStyles}
                value={String(form.frequency)}
                onChange={(e) => setField('frequency', Number(e.target.value))}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </InputField>

            <InputField label="Workout Duration (minutes)">
              <select
                className={inputStyles}
                value={String(form.session_mins)}
                onChange={(e) => setField('session_mins', Number(e.target.value))}
              >
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
                <option value="75">75</option>
              </select>
            </InputField>

            <InputField label="Program Length (weeks)">
              <select
                className={inputStyles}
                value={String(form.duration)}
                onChange={(e) => setField('duration', Number(e.target.value))}
              >
                <option value="4">4</option>
                <option value="8">8</option>
                <option value="12">12</option>
              </select>
            </InputField>

            <InputField label="Preferences or Limitations (Optional)">
              <textarea
                rows={3}
                className={inputStyles}
                placeholder="e.g., bad knee; prefer bodyweight; travel often…"
                value={form.notes}
                onChange={(e) => setField('notes', e.target.value)}
              />
            </InputField>

            <ShineButton type="submit" primary disabled={isLoading} className="w-full">
              {isLoading ? 'Generating…' : 'Generate My Plan'}
            </ShineButton>
          </motion.form>

          <motion.div
            ref={planRef}
            className="sticky top-28"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-heading text-2xl font-bold uppercase text-white mb-4 flex items-center">
              <SparklesIcon className="w-6 h-6 mr-3 text-brand-lime" /> Your Personalized Plan
            </h3>
            <div className="bg-brand-dark border border-gray-800 rounded-lg p-6 min-h-[500px] max-h-[70vh] overflow-y-auto text-gray-300 leading-relaxed custom-scrollbar">
              {isLoading && !generatedPlan && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-lime mb-4" />
                  <p className="font-semibold text-white">Our AI coach is crafting your plan…</p>
                  <p className="text-sm">This might take a moment.</p>
                </div>
              )}
              {error && <p className="text-red-400">Error: {error}</p>}
              {!isLoading && !error && !generatedPlan && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <SparklesIcon className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="font-semibold text-white">Your custom fitness plan will appear here.</p>
                  <p className="text-sm">Fill out the form and let our AI create the perfect workout for you!</p>
                </div>
              )}
              {generatedPlan && <pre className="whitespace-pre-wrap font-body text-base">{generatedPlan}</pre>}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; background-color: #18181b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #a3e635; border-radius: 10px; }
      `}</style>
    </section>
  );
};

export default AICoach;
