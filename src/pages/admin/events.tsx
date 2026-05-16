import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Trash2, Users, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  slug: string;
  startDate: string;
  endDate: string | null;
  location: string | null;
  eventType: string;
  maxAttendees: number | null;
  registeredCount: number;
  _count: { registrations: number; donations: number };
}

const EVENT_TYPES = ['community', 'fundraiser', 'mentorship', 'workshop'];

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', slug: '', startDate: '', endDate: '', location: '', eventType: 'community', maxAttendees: '', description: '',
  });

  const load = useCallback(async () => {
    setLoading(true);
    const r = await fetch('/api/admin/events');
    const data = await r.json();
    setEvents(data.events || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!form.title || !form.slug || !form.startDate) return;
    setSaving(true);
    await fetch('/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        maxAttendees: form.maxAttendees ? parseInt(form.maxAttendees) : null,
      }),
    });
    setSaving(false);
    setShowForm(false);
    setForm({ title: '', slug: '', startDate: '', endDate: '', location: '', eventType: 'community', maxAttendees: '', description: '' });
    load();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
    load();
  };

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return (
    <AdminLayout title="Events">
      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gold/80"
          >
            <Plus size={16} /> New Event
          </button>
        </div>

        {/* Create form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="rounded-xl border border-gold/30 bg-gold/5 p-5"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-heading text-base font-semibold text-white">New Event</h2>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input className="input-field col-span-2" placeholder="Title *" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: autoSlug(e.target.value) })} />
                <input className="input-field" placeholder="Slug *" value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                <select className="input-field" value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
                  {EVENT_TYPES.map((t) => <option key={t} value={t} className="bg-gray-900 capitalize">{t}</option>)}
                </select>
                <input type="datetime-local" className="input-field" placeholder="Start Date *" value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                <input type="datetime-local" className="input-field" placeholder="End Date" value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                <input className="input-field" placeholder="Location" value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })} />
                <input type="number" className="input-field" placeholder="Max Attendees (leave blank for unlimited)" value={form.maxAttendees}
                  onChange={(e) => setForm({ ...form, maxAttendees: e.target.value })} />
                <textarea className="input-field col-span-2" rows={3} placeholder="Description"
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={handleCreate} disabled={saving || !form.title || !form.slug || !form.startDate}
                  className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-gray-900 disabled:opacity-40">
                  {saving ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
                  Create Event
                </button>
                <button onClick={() => setShowForm(false)} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white/60 hover:text-white">
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events list */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            </div>
          ) : events.length === 0 ? (
            <div className="p-10 text-center text-white/40">No events yet. Create one above.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Registrations</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e, i) => {
                    const isPast = new Date(e.startDate) < new Date();
                    return (
                      <motion.tr key={e.id} className="border-b border-white/5 hover:bg-white/5"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}>
                        <td className="px-4 py-3">
                          <p className="font-medium text-white">{e.title}</p>
                          <p className="text-xs text-white/40">{e.location || 'No location'}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-verdean-500/20 px-2.5 py-0.5 text-xs font-medium capitalize text-verdean-300">
                            {e.eventType}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white/60">
                          <span className={isPast ? 'text-white/30' : ''}>
                            {new Date(e.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          {isPast && <span className="ml-1.5 text-xs text-white/30">(past)</span>}
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-white/60">
                            <Users size={13} />
                            {e._count.registrations}
                            {e.maxAttendees && ` / ${e.maxAttendees}`}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleDelete(e.id, e.title)}
                            className="flex items-center gap-1 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs text-red-300 hover:bg-red-500/20">
                            <Trash2 size={12} /> Delete
                          </button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
