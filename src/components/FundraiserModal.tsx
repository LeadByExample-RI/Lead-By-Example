import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { XMarkIcon, ShareIcon, HeartIcon } from '@heroicons/react/24/outline';

interface FundraiserModalProps {
  fundraiser: {
    id: number;
    title: string;
    shortDescription: string;
    fullDescription?: string;
    image: string;
    raised: number;
    goal: number;
    percentage: number;
    donors: number;
    daysLeft: number;
    status: 'active' | 'completed';
    category: string;
  } | null;
  isOpen: boolean;
  closeModal: () => void;
}

export default function FundraiserModal({ fundraiser, isOpen, closeModal }: FundraiserModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!fundraiser) return null;

  const percentageRaised = Math.round((fundraiser.raised / fundraiser.goal) * 100);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden transform transition-all">
                
                {/* Modal Header with Gradient */}
                <div className="relative bg-gradient-to-r from-royal-purple via-cape-verde to-royal-purple-dark p-8">
                  
                  {/* Close Button */}
                  <button 
                    onClick={closeModal}
                    className="absolute top-6 right-6 text-off-white hover:text-gold transition-colors 
                              bg-black/20 hover:bg-black/40 rounded-full p-2
                              focus-visible:ring-2 focus-visible:ring-gold"
                    aria-label="Close modal"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>

                  {/* Title */}
                  <Dialog.Title className="text-3xl md:text-4xl font-heading font-bold text-off-white pr-12 mb-2">
                    {fundraiser.title}
                  </Dialog.Title>

                  {/* Status Badge */}
                  {fundraiser.status === 'completed' && (
                    <span className="inline-block bg-green-500 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                      ✓ Completed
                    </span>
                  )}
                  
                  {/* Category Badge */}
                  <p className="text-gold-light mt-2 text-sm font-semibold">
                    {fundraiser.category}
                  </p>
                </div>

                {/* Modal Content */}
                <div className="p-8 max-h-[70vh] overflow-y-auto">
                  
                  {/* Hero Image */}
                  <img 
                    src={fundraiser.image}
                    alt={fundraiser.title}
                    className="w-full h-72 object-cover rounded-2xl mb-8 shadow-lg"
                  />

                  {/* Full Description */}
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {fundraiser.fullDescription || fundraiser.shortDescription}
                    </p>
                  </div>

                  {/* Impact Statistics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-cape-verde/10 border-2 border-cape-verde rounded-xl p-5 text-center">
                      <p className="text-3xl font-bold text-cape-verde mb-1">
                        ${fundraiser.raised.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 uppercase tracking-wide">Amount Raised</p>
                    </div>
                    
                    <div className="bg-royal-purple/10 border-2 border-royal-purple rounded-xl p-5 text-center">
                      <p className="text-3xl font-bold text-royal-purple mb-1">
                        {fundraiser.donors}
                      </p>
                      <p className="text-sm text-gray-600 uppercase tracking-wide">Total Donors</p>
                    </div>
                    
                    <div className="bg-gold/20 border-2 border-gold rounded-xl p-5 text-center">
                      <p className="text-3xl font-bold text-gold-dark mb-1">
                        {percentageRaised}%
                      </p>
                      <p className="text-sm text-gray-600 uppercase tracking-wide">Goal Achieved</p>
                    </div>

                    <div className="bg-green-100 border-2 border-green-500 rounded-xl p-5 text-center">
                      <p className="text-3xl font-bold text-green-700 mb-1">
                        {fundraiser.daysLeft}
                      </p>
                      <p className="text-sm text-gray-600 uppercase tracking-wide">
                        {fundraiser.status === 'completed' ? 'Completed' : 'Days Left'}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Section (if completed) */}
                  {fundraiser.status === 'completed' && (
                    <div className="bg-gradient-to-br from-gold/10 to-royal-purple/10 rounded-2xl p-6 mb-8 border-l-4 border-gold">
                      <h3 className="text-xl font-heading font-bold text-royal-purple mb-3">
                        Community Impact
                      </h3>
                      <p className="text-gray-700 italic">
                        "This fundraiser changed lives in our community. The support we received was overwhelming 
                        and will benefit families for years to come."
                      </p>
                      <p className="text-sm text-gray-600 mt-2">— Community Leader</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                    <button className="flex-1 bg-gold hover:bg-gold-dark text-black font-bold text-lg 
                                     py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                                     transition-all duration-300 flex items-center justify-center gap-2
                                     focus-visible:ring-4 focus-visible:ring-gold focus-visible:ring-offset-2">
                      <HeartIcon className="w-6 h-6" />
                      Donate Now
                    </button>
                    
                    <button className="flex-1 bg-royal-purple hover:bg-royal-purple-dark text-off-white font-bold 
                                     text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                                     transition-all duration-300 flex items-center justify-center gap-2
                                     focus-visible:ring-4 focus-visible:ring-royal-purple focus-visible:ring-offset-2">
                      <ShareIcon className="w-6 h-6" />
                      Share
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
