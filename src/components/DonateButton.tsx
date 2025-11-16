'use client';

import { DonationButtonProps } from '@/types/donation';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

export default function DonateButton({
  onOpenDonation,
  className = '',
  variant = 'primary',
  size = 'md',
}: DonationButtonProps) {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: `bg-gradient-to-r from-[#FFD700] to-[#E5C100] 
              text-[#4B306A] font-bold shadow-lg hover:shadow-xl`,
    outline: `bg-transparent border-2 border-[#FFD700] 
              text-[#FFD700] font-bold hover:bg-[#FFD700]/10`,
  };

  return (
    <motion.button
      onClick={onOpenDonation}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={` ${sizeClasses[size]} ${variantClasses[variant]} flex items-center justify-center gap-2 rounded-xl transition-all ${className} `}
    >
      <Heart className="h-5 w-5" fill={variant === 'primary' ? 'currentColor' : 'none'} />
      <span>Donate Now</span>
      <ArrowRight className="h-4 w-4" />
    </motion.button>
  );
}
