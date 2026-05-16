import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  color?: 'gold' | 'green' | 'purple' | 'coral';
}

const colorMap = {
  gold: 'from-gold/20 to-gold/5 border-gold/30 text-gold',
  green: 'from-verdean-500/20 to-verdean-500/5 border-verdean-500/30 text-verdean-300',
  purple: 'from-royal-500/20 to-royal-500/5 border-royal-500/30 text-royal-300',
  coral: 'from-coral-accent/20 to-coral-accent/5 border-coral-accent/30 text-coral-accent',
};

export default function StatCard({ label, value, sub, icon: Icon, color = 'gold' }: Props) {
  return (
    <motion.div
      className={`rounded-xl border bg-gradient-to-br p-5 backdrop-blur-sm ${colorMap[color]}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-white/50">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-white/40">{sub}</p>}
        </div>
        <div className={`rounded-lg p-2.5 ${colorMap[color].split(' ').slice(0, 2).join(' ')}`}>
          <Icon size={20} className={colorMap[color].split(' ').at(-1)} />
        </div>
      </div>
    </motion.div>
  );
}
