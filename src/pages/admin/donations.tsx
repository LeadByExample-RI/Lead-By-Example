import { useEffect, useState, useCallback } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, RefreshCw, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface Donation {
  id: string;
  donorName: string | null;
  donorEmail: string | null;
  amount: number;
  currency: string;
  status: string;
  campaign: string | null;
  stripePaymentIntentId: string;
  createdAt: string;
  refundedAmount: number | null;
}

const STATUS_COLORS: Record<string, string> = {
  completed: 'bg-green-500/20 text-green-300',
  refunded: 'bg-yellow-500/20 text-yellow-300',
  failed: 'bg-red-500/20 text-red-300',
  // Cape Verde palette: Jade background, Gold text for visibility
  pending: 'bg-[#01514C]/20 text-[#FFD700]',
};

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export default function AdminDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [refunding, setRefunding] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20' });
    if (search) params.set('search', search);
    if (statusFilter) params.set('status', statusFilter);

    const r = await fetch(`/api/admin/donations?${params}`);
    const data = await r.json();
    setDonations(data.donations || []);
    setTotal(data.pagination?.total || 0);
    setTotalPages(data.pagination?.totalPages || 1);
    setLoading(false);
  }, [page, search, statusFilter]);

  useEffect(() => { load(); }, [load]);

  const handleRefund = async (id: string) => {
    if (!confirm('Issue a full refund for this donation?')) return;
    setRefunding(id);
    await fetch(`/api/admin/donations/${id}/refund`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({}) });
    setRefunding(null);
    load();
  };

  return (
    <AdminLayout title="Donations">
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-4 text-sm text-white placeholder-white/30 focus:border-gold/50 focus:outline-none"
              placeholder="Search by name, email, or payment ID…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <select
            className="rounded-lg border border-white/10 bg-white/5 py-2 pl-3 pr-8 text-sm text-white focus:border-gold/50 focus:outline-none"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          >
            <option value="">All statuses</option>
            <option value="completed">Completed</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
          <button onClick={load} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60 hover:text-white">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>

        <p className="text-sm text-white/40">{total} total donations</p>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            </div>
          ) : donations.length === 0 ? (
            <div className="p-10 text-center text-white/40">No donations found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs font-medium uppercase tracking-wider text-white/40">
                    <th className="px-4 py-3">Donor</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Campaign</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((d, i) => (
                    <motion.tr
                      key={d.id}
                      className="border-b border-white/5 hover:bg-white/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{d.donorName || 'Anonymous'}</p>
                        {d.donorEmail && <p className="text-xs text-white/40">{d.donorEmail}</p>}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gold">
                        {fmt(Number(d.amount))}
                        {d.refundedAmount && (
                          <p className="text-xs text-yellow-400">−{fmt(Number(d.refundedAmount))} refunded</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white/60">{d.campaign || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[d.status] || 'bg-white/10 text-white/60'}`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/50">
                        {new Date(d.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3">
                        {d.status === 'completed' && (
                          <button
                            onClick={() => handleRefund(d.id)}
                            disabled={refunding === d.id}
                            className="flex items-center gap-1 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-300 hover:bg-yellow-500/20 disabled:opacity-50"
                          >
                            {refunding === d.id ? <RefreshCw size={12} className="animate-spin" /> : <RotateCcw size={12} />}
                            Refund
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/60 hover:text-white disabled:opacity-30"
            >
              Previous
            </button>
            <span className="text-sm text-white/40">Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/60 hover:text-white disabled:opacity-30"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
