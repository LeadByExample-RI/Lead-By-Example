'use client';

import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/ui-store';
import { HeaderProps } from '@/types/components';
import { cn } from '@/utils/helpers';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Header: React.FC<HeaderProps> = ({
  variant = 'default',
  navigation,
  actions = [],
  searchEnabled = false,
  mobileMenuEnabled = true,
  className,
}) => {
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();

  const headerClasses = cn(
    'sticky top-0 z-50 w-full',
    variant === 'transparent' && 'bg-transparent border-transparent',
    variant === 'default' && 'glass-effect-dark',
    variant === 'sticky' && 'glass-effect-dark border-b border-white/10',
    className
  );

  return (
    <motion.header
      className={headerClasses}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            {navigation.logo ? (
              <Link href="/" className="flex items-center">
                {navigation.logo}
              </Link>
            ) : (
              <Link
                href="/"
                className="text-xl font-bold text-gold transition-colors duration-200 hover:text-gold-light"
              >
                Lead By Example
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {navigation.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  'hover:text-gold',
                  navigation.activeItem === item.id ? 'text-gold' : 'text-white/90'
                )}
                onClick={() => navigation.onItemClick?.(item)}
              >
                <span className="flex items-center gap-2">
                  {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-semibold text-primary-900">
                      {item.badge}
                    </span>
                  )}
                </span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            {searchEnabled && (
              <Button variant="ghost" size="sm">
                <span className="sr-only">Search</span>
                🔍
              </Button>
            )}

            {/* Action Buttons */}
            {actions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant || 'primary'}
                size="sm"
                onClick={action.onClick}
                className="hidden sm:inline-flex"
              >
                {action.icon && <span className="h-4 w-4">{action.icon}</span>}
                {action.label}
              </Button>
            ))}

            {/* Mobile Menu Toggle */}
            {mobileMenuEnabled && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="md:hidden"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuEnabled && (
        <motion.div
          className="md:hidden"
          initial={false}
          animate={mobileMenuOpen ? 'open' : 'closed'}
          variants={{
            open: {
              opacity: 1,
              height: 'auto',
              transition: { duration: 0.3, ease: 'easeOut' },
            },
            closed: {
              opacity: 0,
              height: 0,
              transition: { duration: 0.3, ease: 'easeIn' },
            },
          }}
        >
          <div className="space-y-1 border-t border-white/10 glass-effect-dark px-4 pb-3 pt-2">
            {navigation.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200',
                  'hover:bg-white/10',
                  navigation.activeItem === item.id
                    ? 'bg-white/10 text-gold'
                    : 'text-white/90'
                )}
                onClick={() => {
                  navigation.onItemClick?.(item);
                  toggleMobileMenu();
                }}
              >
                <span className="flex items-center gap-2">
                  {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto rounded-full bg-gold px-2 py-0.5 text-xs text-primary-900 font-semibold">
                      {item.badge}
                    </span>
                  )}
                </span>
              </Link>
            ))}

            {/* Mobile Actions */}
            {actions.length > 0 && (
              <div className="space-y-2 pt-4">
                {actions.map((action) => (
                  <Button
                    key={action.id}
                    variant={action.variant || 'primary'}
                    size="sm"
                    onClick={() => {
                      action.onClick();
                      toggleMobileMenu();
                    }}
                    fullWidth
                  >
                    {action.icon && <span className="h-4 w-4">{action.icon}</span>}
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export { Header };
export type { HeaderProps };
