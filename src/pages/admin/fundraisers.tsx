import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Trash2, RefreshCw, X, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Fundraiser {
  id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  goalAmount: number;
  raisedAmount: number;
  progress: number;
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function AdminFundraisers() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', startDate: '', endDate: '', location: '', goal: '', description: '', image: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch('/api/admin/fundraisers');
    const data = await r.json();
    setFundraisers(data.fundraisers || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!form.title || !form.slug || !form.startDate || !form.goal) return;
    setSaving(true);
    await fetch('/api/admin/fundraisers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setShowForm(false);
    setForm({ title: '', slug: '', startDate: '', endDate: '', location: '', goal: '', description: '', image: '' });
    load();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/fundraisers/${id}`, { method: 'DELETE' });
    load();
  };

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <AdminLayout title="Fundraisers">
      <div className="space-y-4">
        <div className="flex justify-end">
          <button onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gold/80">
            <Plus size={16} /> New Fundraiser
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div className="rounded-xl border border-gold/30 bg-gold/5 p-5"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-white">New Fundraiser</h2>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className="input-field col-span-2" placeholder="Title *" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })} />
                <input className="input-field" placeholder="Slug *" value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                <input type="number" step="0.01" className="input-field" placeholder="Goal amount ($) *" value={form.goal}
                  onChange={(e) => setForm({ ...form, goal: e.target.value })} />
                <input type="date" className="input-field" placeholder="Start Date *" value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                <input type="date" className="input-field" placeholder="End Date" value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                <input className="input-field" placeholder="Location" value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })} />
                <input className="input-field" placeholder="Image URL (optional)" value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })} />
                <textarea className="input-field col-span-2" rows={3} placeholder="Description"
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleCreate} disabled={saving || !form.title || !form.slug || !form.startDate || !form.goal}
                  className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-gray-900 disabled:opacity-40">
                  {saving ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                  Create Fundraiser
                </button>
                <button onClick={() => setShowForm(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white">
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fundraiser cards */}
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
          </div>
        ) : fundraisers.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/40">
            No fundraisers yet. Create one above to start tracking campaign progress.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fundraisers.map((f, i) => (
              <motion.div key={f.id} className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-semibold text-white">{f.title}</h3>
                    {f.location && <p className="mt-0.5 text-xs text-white/40">{f.location}</p>}
                  </div>
                  <button onClick={() => handleDelete(f.id, f.title)}
                    className="ml-2 flex-shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 p-1.5 text-red-300 hover:bg-red-500/20">
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-semibold text-gold">{fmt(f.raisedAmount)}</span>
                    <span className="text-white/40">of {fmt(f.goalAmount)} goal</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-gradient-to-r from-gold to-gold/60"
                      initial={{ width: 0 }} animate={{ width: `${Math.min(100, f.progress)}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }} />
                  </div>
                  <p className="mt-1 text-right text-xs text-white/40">{Math.min(100, Math.round(f.progress))}% funded</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Target size={12} />
                  <span>Ends: {f.endDate ? new Date(f.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Open-ended'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.3); }
        .input-field:focus { border-color: rgba(255,215,0,0.5); }
        option { background: #111; }
      `}</style>
    </AdminLayout>
  );
}
