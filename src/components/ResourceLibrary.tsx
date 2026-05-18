import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Video,
  FileText,
  Headphones,
  Heart,
  Brain,
  Users,
  GraduationCap,
  Shield,
  Star,
  Clock,
  Eye
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'mental-health' | 'academic' | 'life-skills' | 'career' | 'trauma-support' | 'legal';
  type: 'video' | 'article' | 'worksheet' | 'podcast' | 'guide';
  duration?: string;
  traumaInformed: boolean;
  ageGroup: string;
  views: number;
  rating: number;
  featured: boolean;
  tags: string[];
  link?: string;
  downloadable: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Understanding Your Emotions: A Teen\'s Guide',
    description: 'Learn healthy ways to identify, process, and express your emotions. Includes practical exercises and coping strategies specifically designed for young people who have experienced trauma.',
    category: 'trauma-support',
    type: 'guide',
    duration: '15 min read',
    traumaInformed: true,
    ageGroup: '13-18',
    views: 1247,
    rating: 4.8,
    featured: true,
    tags: ['Self-awareness', 'Coping skills', 'Emotional regulation'],
    downloadable: true
  },
  {
    id: '2',
    title: 'From Streets to Success: Real Stories',
    description: 'Video series featuring young adults who overcame similar challenges. Hear authentic stories of transformation, resilience, and hope from people who walked in your shoes.',
    category: 'mental-health',
    type: 'video',
    duration: '12 episodes',
    traumaInformed: true,
    ageGroup: '14-24',
    views: 3420,
    rating: 4.9,
    featured: true,
    tags: ['Inspiration', 'Real stories', 'Peer support'],
    link: '#',
    downloadable: false
  },
  {
    id: '3',
    title: 'Building Healthy Relationships',
    description: 'Navigate friendships, family dynamics, and romantic relationships. Learn about boundaries, communication, and recognizing healthy vs. unhealthy patterns.',
    category: 'life-skills',
    type: 'article',
    duration: '20 min read',
    traumaInformed: true,
    ageGroup: '15-19',
    views: 892,
    rating: 4.7,
    featured: false,
    tags: ['Relationships', 'Boundaries', 'Communication'],
    downloadable: true
  },
  {
    id: '4',
    title: 'Your Rights: Dealing with Police & Legal System',
    description: 'Know your rights and how to protect yourself. Created by advocates and attorneys, this guide helps you navigate encounters with law enforcement and understand the juvenile justice system.',
    category: 'legal',
    type: 'guide',
    duration: '25 min read',
    traumaInformed: true,
    ageGroup: '13-21',
    views: 2156,
    rating: 4.9,
    featured: true,
    tags: ['Rights', 'Legal system', 'Self-advocacy'],
    downloadable: true
  },
  {
    id: '5',
    title: 'Study Skills That Actually Work',
    description: 'Practical strategies for improving grades and staying organized. Includes time management, note-taking, test prep, and motivation techniques designed for students with various learning needs.',
    category: 'academic',
    type: 'worksheet',
    duration: '10 exercises',
    traumaInformed: false,
    ageGroup: '13-18',
    views: 1634,
    rating: 4.6,
    featured: false,
    tags: ['Study skills', 'Organization', 'Academic success'],
    downloadable: true
  },
  {
    id: '6',
    title: 'Mindfulness for Tough Times',
    description: 'Audio meditation and breathing exercises to help you manage stress, anxiety, and difficult emotions. Perfect for when you need a moment of calm or help falling asleep.',
    category: 'mental-health',
    type: 'podcast',
    duration: '8 episodes',
    traumaInformed: true,
    ageGroup: '14-24',
    views: 2891,
    rating: 4.8,
    featured: true,
    tags: ['Mindfulness', 'Stress management', 'Self-care'],
    link: '#',
    downloadable: false
  },
  {
    id: '8',
    title: 'Financial Literacy Basics',
    description: 'Money management skills they don\'t teach in school. Budgeting, banking, credit, avoiding scams, and planning for your future. Practical tips you can use right now.',
    category: 'life-skills',
    type: 'video',
    duration: '6 videos',
    traumaInformed: false,
    ageGroup: '16-24',
    views: 2045,
    rating: 4.8,
    featured: true,
    tags: ['Money management', 'Budgeting', 'Financial planning'],
    link: '#',
    downloadable: false
  },
  {
    id: '9',
    title: 'Healing from Trauma: A Youth\'s Journey',
    description: 'Created with trauma specialists, this compassionate guide helps you understand trauma\'s effects and find paths to healing. Includes resources for professional support and peer connection.',
    category: 'trauma-support',
    type: 'guide',
    duration: '35 min read',
    traumaInformed: true,
    ageGroup: '14-21',
    views: 1789,
    rating: 4.9,
    featured: true,
    tags: ['Trauma recovery', 'Healing', 'Professional support'],
    downloadable: true
  },
  {
    id: '10',
    title: 'College Application Roadmap',
    description: 'Step-by-step guide to applying for college, including financial aid, scholarships, essays, and navigating the process as a first-generation student. You CAN do this.',
    category: 'academic',
    type: 'guide',
    duration: '45 min read',
    traumaInformed: false,
    ageGroup: '16-18',
    views: 1345,
    rating: 4.7,
    featured: false,
    tags: ['College prep', 'Financial aid', 'First-generation'],
    downloadable: true
  },
  {
    id: '11',
    title: 'Conflict Resolution Skills',
    description: 'De-escalation techniques, communication strategies, and problem-solving approaches. Learn to handle conflicts without violence or aggression.',
    category: 'life-skills',
    type: 'video',
    duration: '4 videos',
    traumaInformed: true,
    ageGroup: '14-21',
    views: 987,
    rating: 4.6,
    featured: false,
    tags: ['Conflict resolution', 'De-escalation', 'Communication'],
    link: '#',
    downloadable: false
  },
  {
    id: '12',
    title: 'Building Your Support Network',
    description: 'You don\'t have to do this alone. Learn how to identify trustworthy people, ask for help, and create a support system that has your back.',
    category: 'mental-health',
    type: 'article',
    duration: '15 min read',
    traumaInformed: true,
    ageGroup: '13-24',
    views: 1456,
    rating: 4.8,
    featured: false,
    tags: ['Support network', 'Asking for help', 'Community'],
    downloadable: true
  }
];

const categories = [
  { id: 'all', name: 'All Resources', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'trauma-support', name: 'Trauma Support', icon: <Heart className="w-5 h-5" /> },
  { id: 'mental-health', name: 'Mental Health', icon: <Brain className="w-5 h-5" /> },
  { id: 'academic', name: 'Academic', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'life-skills', name: 'Life Skills', icon: <Users className="w-5 h-5" /> },
  { id: 'legal', name: 'Legal Rights', icon: <Shield className="w-5 h-5" /> },
];

const typeIcons = {
  video: <Video className="w-5 h-5" />,
  article: <FileText className="w-5 h-5" />,
  worksheet: <FileText className="w-5 h-5" />,
  podcast: <Headphones className="w-5 h-5" />,
  guide: <BookOpen className="w-5 h-5" />
};

// --- Connect with a Mentor Modal ---
interface ConnectFormData { firstName: string; lastName: string; reason: string; phone: string; email: string; }
interface ConnectErrors { firstName?: string; lastName?: string; reason?: string; phone?: string; email?: string; }

function ConnectMentorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<ConnectFormData>({ firstName: '', lastName: '', reason: '', phone: '', email: '' });
  const [errors, setErrors] = useState<ConnectErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: ConnectErrors = {};
    if (!form.firstName.trim()) e.firstName = 'This field is required';
    if (!form.lastName.trim()) e.lastName = 'This field is required';
    if (!form.reason.trim()) e.reason = 'This field is required';
    if (!form.phone.trim()) e.phone = 'This field is required';
    if (!form.email.trim()) e.email = 'This field is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const body = [
      'This person is looking to connect with a mentor.',
      `First Name: ${form.firstName}`,
      `Last Name: ${form.lastName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Reason: ${form.reason}`,
    ].join('%0A');
    window.location.href = `mailto:robertleadbyexample@gmail.com,ronaldleadbyexample@gmail.com?subject=Connect%20with%20a%20Mentor%20Request%20%E2%80%94%20Lead%20By%20Example&body=${body}`;
    setSubmitted(true);
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-lg rounded-2xl border border-white/20 bg-[#4B306A]/95 backdrop-blur-xl p-8 max-h-[90vh] overflow-y-auto z-[101]"
        onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white text-xl font-bold mb-4">Your request has been submitted! We&apos;ll connect you with a mentor soon.</h3>
            <button type="button" onClick={onClose} className="px-8 py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-600 transition-all">Close</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-2xl font-bold">Connect with a Mentor</h3>
              <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><input type="text" placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />{errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}</div>
              <div><input type="text" placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />{errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}</div>
              <div><textarea placeholder="Tell us why you're looking for a mentor..." rows={4} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className={inputClass} />{errors.reason && <p className="text-red-400 text-sm mt-1">{errors.reason}</p>}</div>
              <div><input type="tel" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />{errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}</div>
              <div><input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />{errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
              <button type="submit" className="w-full py-3 bg-gold-500 text-black font-semibold rounded-xl hover:bg-gold-600 transition-all mt-2">Submit</button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// --- Crisis Resources Modal ---
const crisisResources = [
  { emoji: '🆘', name: 'National Suicide Prevention Lifeline', contact: 'Call or Text: 988', hours: 'Available 24/7', tel: '988' },
  { emoji: '📞', name: 'Crisis Text Line', contact: 'Text HOME to 741741', hours: 'Available 24/7', tel: null },
  { emoji: '🚨', name: 'National Domestic Violence Hotline', contact: '1-800-799-7233 | Text START to 88788', hours: 'Available 24/7', tel: '18007997233' },
  { emoji: '🧠', name: 'SAMHSA National Helpline (Mental Health & Substance Use)', contact: '1-800-662-4357', hours: 'Free, confidential, 24/7', tel: '18006624357' },
  { emoji: '👶', name: 'Childhelp National Child Abuse Hotline', contact: '1-800-422-4453', hours: 'Available 24/7', tel: '18004224453' },
  { emoji: '🏠', name: 'National Alliance on Mental Illness (NAMI) Helpline', contact: '1-800-950-6264', hours: 'Mon–Fri, 10am–10pm ET', tel: '18009506264' },
  { emoji: '❤️', name: 'Trevor Project (LGBTQ+ Youth)', contact: '1-866-488-7386 | Text START to 678-678', hours: 'Available 24/7', tel: '18664887386' },
  { emoji: '🍽️', name: 'National Eating Disorder Helpline', contact: '1-800-931-2237', hours: 'Mon–Thu 9am–9pm, Fri 9am–5pm ET', tel: '18009312237' },
  { emoji: '🚔', name: 'National Human Trafficking Hotline', contact: '1-888-373-7888 | Text HELP to 233733', hours: 'Available 24/7', tel: '18883737888' },
];

function CrisisResourcesModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-xl rounded-2xl border border-white/20 bg-[#4B306A]/95 backdrop-blur-xl p-8 max-h-[90vh] overflow-y-auto z-[101]"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-2xl font-bold">Crisis Resources</h3>
          <button type="button" onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all">✕</button>
        </div>
        <div className="space-y-4">
          {crisisResources.map((r, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{r.emoji}</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">{r.name}</h4>
                  {r.tel ? (
                    <a href={`tel:${r.tel}`} className="text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors">{r.contact}</a>
                  ) : (
                    <p className="text-gold-400 text-sm font-medium">{r.contact}</p>
                  )}
                  <p className="text-white/60 text-xs mt-1">{r.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  const filteredResources = resources.filter(resource => {
    return selectedCategory === 'all' || resource.category === selectedCategory;
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  return (
    <section className="py-20 px-4 relative overflow-hidden z-0 bg-gradient-to-b from-primary-900 via-primary-950 to-primary-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-md mb-4 gradient-text">
            Resource Library
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
            Trauma-informed resources designed to support your journey. All content created with care, understanding, and respect for your experiences.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-button text-white border border-white/20 rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 fill-verdean-600" />
            Many resources are trauma-informed and culturally responsive
          </div>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                            ? 'glass-button text-white shadow-lg shadow-verdean-500/30'
                            : 'glass-button text-white/80 bg-white/5 hover:bg-white/10 shadow-md'
                }`}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white drop-shadow-md mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-gold-500 fill-gold-500" />
              Featured Resources
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        {regularResources.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white drop-shadow-md mb-6">
              {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          </div>
        )}

        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white/80 mb-2">No resources found</h3>
            <p className="text-white/60 mb-6">Try selecting a different category</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-3 glass-button text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              View All
            </button>
          </div>
        )}

        {/* Need More Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden z-0 rounded-3xl p-8 md:p-12 text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Need More Support?</h3>
          <p className="text-xl mb-8 opacity-90">
            These resources are here to help, but sometimes you need to talk to someone. We&apos;re here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowConnectModal(true)}
              className="px-8 py-4 glass-button text-white border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all transform hover:scale-105"
            >
              Connect with a Mentor
            </button>
            <button
              type="button"
              onClick={() => setShowCrisisModal(true)}
              className="px-8 py-4 glass-button text-white border border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Crisis Resources
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showConnectModal && <ConnectMentorModal onClose={() => setShowConnectModal(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {showCrisisModal && <CrisisResourcesModal onClose={() => setShowCrisisModal(false)} />}
      </AnimatePresence>
    </section>
  );
}

function ResourceCard({ resource, index, featured = false }: { resource: Resource; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl p-6 glass-effect-dark shadow-glass-dark hover-lift border border-white/10 transition-all duration-300 group cursor-pointer ${featured ? 'ring-2 ring-gold-500' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4B306A] to-[#01514C] flex items-center justify-center text-white">
            {typeIcons[resource.type]}
          </div>
          <div>
            <div className="text-xs font-semibold text-white/60 uppercase tracking-wide">{resource.type}</div>
            {resource.traumaInformed && (
              <div className="flex items-center gap-1 text-xs text-white/70 font-medium">
                <Heart className="w-3 h-3 fill-verdean-500" />
                Trauma-Informed
              </div>
            )}
          </div>
        </div>
        {featured && <Star className="w-5 h-5 text-gold-500 fill-gold-500" />}
      </div>

      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">{resource.title}</h4>
      <p className="text-sm text-white/80 mb-4 line-clamp-3">{resource.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.slice(0, 3).map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-white/5 text-white/70 text-xs rounded-full">{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm text-white/60 mb-4 pb-4 border-b border-white/10">
        {resource.duration && (
          <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{resource.duration}</div>
        )}
        <div className="flex items-center gap-1"><Eye className="w-4 h-4" />{resource.views.toLocaleString()}</div>
        <div className="flex items-center gap-1"><Star className="w-4 h-4 text-gold-500 fill-gold-500" />{resource.rating}</div>
      </div>

      <div className="mb-4">
        <span className="text-xs text-white/60">Age Group:</span>
        <span className="ml-2 text-sm font-medium text-white/80">{resource.ageGroup}</span>
      </div>

    </motion.div>
  );
}
