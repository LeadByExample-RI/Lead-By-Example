import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  DollarSign,
  Mail,
  Calendar,
  Target,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/donations', label: 'Donations', icon: DollarSign },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Mail },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/fundraisers', label: 'Fundraisers', icon: Target },
];

interface Props {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: Props) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = () => (
    <nav className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <Link href="/" className="font-heading text-xl font-bold text-gold">
          Lead By Example
        </Link>
        <button onClick={() => setSidebarOpen(false)} className="text-white/60 hover:text-white lg:hidden">
          <X size={20} />
        </button>
      </div>

      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white/40 mt-4 mb-1 px-6">
        Admin Panel
      </div>

      <div className="flex-1 space-y-1 px-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = router.pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gold/20 text-gold'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-gold' : 'text-white/50 group-hover:text-white'} />
              {label}
              {isActive && <ChevronRight size={14} className="ml-auto text-gold" />}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-white/10 px-3 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} />
          Back to Site
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-950 via-verdean-900 to-royal-900">
      {/* Desktop sidebar */}
      <div className="hidden w-64 flex-shrink-0 border-r border-white/10 bg-black/30 backdrop-blur-xl lg:flex lg:flex-col">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 z-50 h-full w-64 border-r border-white/10 bg-gray-950/95 backdrop-blur-xl lg:hidden"
              initial={{ x: -264 }}
              animate={{ x: 0 }}
              exit={{ x: -264 }}
              transition={{ type: 'tween', duration: 0.25 }}
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-white/10 bg-black/20 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="font-heading text-lg font-semibold text-white">{title}</h1>
          </div>
          <div className="text-sm text-white/40">Admin</div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
