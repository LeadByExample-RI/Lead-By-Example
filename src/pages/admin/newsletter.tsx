import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import { Mail, Users, Send, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Subscriber {
  id: string;
  email: string;
  subscribed: boolean;
  frequency: string;
  subscribedAt: string;
  user: { name: string } | null;
}

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState({ active: 0, inactive: 0 });
  const [filterActive, setFilterActive] = useState<string>('true');
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ subscribed: filterActive, limit: '100' });
    const r = await fetch(`/api/admin/newsletter?${params}`);
    const data = await r.json();
    setSubscribers(data.subscribers || []);
    if (data.stats) setStats(data.stats);
    setLoading(false);
  }, [filterActive]);

  useEffect(() => { load(); }, [load]);

  const handleSend = async () => {
    if (!subject.trim() || !html.trim()) return;
    if (!confirm(`Send newsletter to all ${stats.active} active subscribers?`)) return;

    setSending(true);
    setSendResult(null);
    const r = await fetch('/api/admin/newsletter/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, html }),
    });
    const data = await r.json();
    setSendResult({
      success: data.success,
      message: data.success
        ? `Sent to ${data.successCount} of ${data.totalSent} subscribers.`
        : data.error || 'Send failed.',
    });
    setSending(false);
  };

  return (
    <AdminLayout title="Newsletter">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <StatCard label="Active Subscribers" value={stats.active.toLocaleString()} icon={Users} color="green" />
          <StatCard label="Unsubscribed" value={stats.inactive.toLocaleString()} icon={Mail} color="purple" />
          <StatCard label="Total List" value={(stats.active + stats.inactive).toLocaleString()} icon={Mail} color="gold" />
        </div>

        {/* Compose newsletter */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <h2 className="mb-4 font-heading text-base font-semibold text-white">Send Newsletter</h2>
          <div className="space-y-3">
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none"
              placeholder="Subject line…"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none"
              placeholder="HTML content… (paste full HTML email body)"
              rows={8}
              value={html}
              onChange={(e) => setHtml(e.target.value)}
            />
            {sendResult && (
              <div className={`rounded-lg p-3 text-sm ${sendResult.success ? 'bg-green-500/10 text-green-300' : 'bg-red-500/10 text-red-300'}`}>
                {sendResult.message}
              </div>
            )}
            <button
              onClick={handleSend}
              disabled={sending || !subject.trim() || !html.trim()}
              className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-gray-900 transition hover:bg-gold/80 disabled:opacity-40"
            >
              {sending ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
              {sending ? 'Sending…' : `Send to ${stats.active} subscribers`}
            </button>
          </div>
        </div>

        {/* Subscriber list */}
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <h2 className="font-heading text-base font-semibold text-white">Subscribers</h2>
            <div className="flex items-center gap-2">
              <select
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white focus:outline-none"
                value={filterActive}
                onChange={(e) => setFilterActive(e.target.value)}
              >
                <option value="true">Active</option>
                <option value="false">Unsubscribed</option>
              </select>
              <button onClick={load} className="rounded-lg border border-white/10 p-1.5 text-white/40 hover:text-white">
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            </div>
          ) : subscribers.length === 0 ? (
            <div className="p-10 text-center text-white/40">No subscribers found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-medium uppercase tracking-wider text-white/40">
                    <th className="px-5 py-3">Email</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Frequency</th>
                    <th className="px-5 py-3">Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s, i) => (
                    <motion.tr
                      key={s.id}
                      className="border-t border-white/5 hover:bg-white/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <td className="px-5 py-3 text-white">{s.email}</td>
                      <td className="px-5 py-3 text-white/60">{s.user?.name || '—'}</td>
                      <td className="px-5 py-3 text-white/50 capitalize">{s.frequency}</td>
                      <td className="px-5 py-3 text-white/50">
                        {new Date(s.subscribedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
