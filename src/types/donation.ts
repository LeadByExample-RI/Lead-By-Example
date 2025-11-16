export interface DonationFormData {
  amount: number;
  customAmount?: string;
  donorName: string;
  donorEmail: string;
  isAnonymous: boolean;
  newsletter: boolean;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
}

export interface DonationButtonProps {
  onOpenDonation: () => void;
  className?: string;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialAmount?: number;
}

export interface StripeProviderProps {
  children: React.ReactNode;
}
