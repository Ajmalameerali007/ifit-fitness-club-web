import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ShineButton from './ShineButton';
import { SparklesIcon } from './icons';
import BackgroundAnimation from './BackgroundAnimation';

type FormState = {
  goal: string;
  experience: string;
  frequency: number;
  session_mins: number;
  duration: number;
  notes: string;
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    {children}
  </div>
);

const AICoach: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    goal: 'Lose Weight',
    experience: 'Beginner',
    frequency: 4,
    session_mins: 45,
    duration: 8,
    notes: ''
  });
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const inputCls =
    'w-full bg-brand-dark border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-brand-lime focus:border-brand-lime transition';

  const setField = (k: keyof FormState, v: any) => setForm(s => ({ ...s, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setPlan('');
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 150);

    try {
      const res = await fetch('/.netlify/functions/generate-plan-stream-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
      setPlan(data.plan || 'No plan generated.');
    } catch (e: any) {
      setErr(e?.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-coach" className="bg-brand-gray py-20 relative overflow-hidden">
      <BackgroundAnimation />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-brand-lime font-bold tracking-wider mb-2">AI-POWERED FITNESS</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold uppercase mb-4">Your Personal AI Coach</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Get a tailored week-by-week program. Fill the form and generate your plan.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <motion.form onSubmit={onSubmit} className="space-y-6 bg-brand-dark p-8 rounded-lg border border-gray-800" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <Field label="Primary Fitness Goal">
              <select className={inputCls} value={form.goal} onChange={(e) => setField('goal', e.target.value)}>
                <option>Lose Weight</option><option>Build Muscle</option><option>Improve Endurance</option><option>General Fitness</option>
              </select>
            </Field>

            <Field label="Experience Level">
              <select className={inputCls} value={form.experience} onChange={(e) => setField('experience', e.target.value)}>
                <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
              </select>
            </Field>

            <Field label="Workouts Per Week">
              <select className={inputCls} value={String(form.frequency)} onChange={(e) => setField('frequency', Number(e.target.value))}>
                <option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>
              </select>
            </Field>

            <Field label="Workout Duration (minutes)">
              <select className={inputCls} value={String(form.session_mins)} onChange={(e) => setField('session_mins', Number(e.target.value))}>
                <option value="30">30</option><option value="45">45</option><option value="60">60</option><option value="75">75</option>
              </select>
            </Field>

            <Field label="Program Length (weeks)">
              <select className={inputCls} value={String(form.duration)} onChange={(e) => setField('duration', Number(e.target.value))}>
                <option value="4">4</option><option value="8">8</option><option value="12">12</option>
              </select>
            </Field>

            <Field label="Preferences or Limitations (Optional)">
              <textarea rows={3} className={inputCls} placeholder="e.g., bad knee; prefer bodyweight; travel often…" value={form.notes} onChange={(e) => setField('notes', e.target.value)} />
            </Field>

            <ShineButton type="submit" disabled={loading} className="w-full">
              {loading ? 'Generating…' : 'Generate My Plan'}
            </ShineButton>
          </motion.form>

          <motion.div ref={resultRef} className="sticky top-28" initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
            <h3 className="font-heading text-2xl font-bold uppercase text-white mb-4 flex items-center">
              <SparklesIcon className="w-6 h-6 mr-3 text-brand-lime" /> Your Personalized Plan
            </h3>
            <div className="bg-brand-dark border border-gray-800 rounded-lg p-6 min-h-[500px] max-h-[70vh] overflow-y-auto text-gray-300 leading-relaxed">
              {loading && !plan && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-lime mb-4" />
                  <p className="font-semibold text-white">Generating your plan…</p>
                </div>
              )}
              {err && <p className="text-red-400">Error: {err}</p>}
              {!loading && !err && !plan && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <SparklesIcon className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="font-semibold text-white">Your plan will appear here.</p>
                </div>
              )}
              {plan && <pre className="whitespace-pre-wrap font-body text-base">{plan}</pre>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AICoach;
