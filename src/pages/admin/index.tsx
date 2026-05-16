import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import { DollarSign, Users, Mail, Calendar, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stats {
  totalRaised: number;
  totalDonations: number;
  avgDonation: number;
  recentRaised: number;
  recentDonations: number;
  subscribers: number;
  totalUsers: number;
  upcomingEvents: number;
  pastEvents: number;
  topCampaigns: { name: string; amount: number }[];
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => {
        if (r.status === 401) throw new Error('Not authenticated');
        if (r.status === 403) throw new Error('Admin access required');
        return r.json();
      })
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {loading && (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-300">
          {error === 'Admin access required' ? (
            <>
              <p className="font-semibold">Admin access required.</p>
              <p className="mt-1 text-sm">Your account does not have admin privileges.</p>
            </>
          ) : (
            <>
              <p className="font-semibold">Not signed in.</p>
              <p className="mt-1 text-sm">
                <a href="/auth/signin" className="underline">Sign in</a> with an admin account to access this page.
              </p>
            </>
          )}
        </div>
      )}

      {stats && (
        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* KPI cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard label="Total Raised (All Time)" value={fmt(stats.totalRaised)} sub={`${stats.totalDonations} donations`} icon={DollarSign} color="gold" />
            <StatCard label="Last 30 Days" value={fmt(stats.recentRaised)} sub={`${stats.recentDonations} donations`} icon={TrendingUp} color="green" />
            <StatCard label="Average Donation" value={fmt(stats.avgDonation)} icon={Award} color="purple" />
            <StatCard label="Newsletter Subscribers" value={stats.subscribers.toLocaleString()} icon={Mail} color="coral" />
            <StatCard label="Registered Users" value={stats.totalUsers.toLocaleString()} icon={Users} color="green" />
            <StatCard label="Upcoming Events" value={stats.upcomingEvents} sub={`${stats.pastEvents} past`} icon={Calendar} color="gold" />
          </div>

          {/* Top campaigns */}
          {stats.topCampaigns.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <h2 className="mb-4 font-heading text-base font-semibold text-white">Top Campaigns</h2>
              <div className="space-y-3">
                {stats.topCampaigns.map((c, i) => {
                  const pct = stats.totalRaised > 0 ? (c.amount / stats.totalRaised) * 100 : 0;
                  return (
                    <div key={c.name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-white/80">{c.name}</span>
                        <span className="font-semibold text-gold">{fmt(c.amount)}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-gold to-gold/60"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: i * 0.1, duration: 0.6 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {stats.topCampaigns.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-10 text-center text-white/40">
              No donation data yet. Donations will appear here after the first completed payment.
            </div>
          )}
        </motion.div>
      )}
    </AdminLayout>
  );
}
