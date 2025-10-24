'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeaderProps } from '@/types/components';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/utils/helpers';
import { Menu, X } from 'lucide-react';

const Header: React.FC<HeaderProps> = ({
  variant = 'default',
  navigation,
  actions = [],
  searchEnabled = false,
  mobileMenuEnabled = true,
  className
}) => {
  const { mobileMenuOpen, toggleMobileMenu } = useUIStore();

  const headerClasses = cn(
    'sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800',
    variant === 'transparent' && 'bg-transparent border-transparent',
    variant === 'default' && 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm',
    variant === 'sticky' && 'bg-white dark:bg-neutral-900 shadow-sm',
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
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {navigation.logo ? (
              <Link href="/" className="flex items-center">
                {navigation.logo}
              </Link>
            ) : (
              <Link 
                href="/" 
                className="text-xl font-bold text-neutral-900 dark:text-neutral-100"
              >
                Lead By Example
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  'hover:text-primary-600 dark:hover:text-primary-400',
                  navigation.activeItem === item.id
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300'
                )}
                onClick={() => navigation.onItemClick?.(item)}
              >
                <span className="flex items-center gap-2">
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  {item.label}
                  {item.badge && (
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full">
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
                {action.icon && <span className="w-4 h-4">{action.icon}</span>}
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
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
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
              transition: { duration: 0.3, ease: 'easeOut' }
            },
            closed: {
              opacity: 0,
              height: 0,
              transition: { duration: 0.3, ease: 'easeIn' }
            }
          }}
        >
          <div className="px-4 pt-2 pb-3 space-y-1 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
            {navigation.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  navigation.activeItem === item.id
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-neutral-700 dark:text-neutral-300'
                )}
                onClick={() => {
                  navigation.onItemClick?.(item);
                  toggleMobileMenu();
                }}
              >
                <span className="flex items-center gap-2">
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  {item.label}
                  {item.badge && (
                    <span className="bg-primary-100 text-primary-800 text-xs px-2 py-0.5 rounded-full ml-auto">
                      {item.badge}
                    </span>
                  )}
                </span>
              </Link>
            ))}
            
            {/* Mobile Actions */}
            {actions.length > 0 && (
              <div className="pt-4 space-y-2">
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
                    {action.icon && <span className="w-4 h-4">{action.icon}</span>}
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
