import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Video,
  FileText,
  Headphones,
  Heart,
  Brain,
  Users,
  Briefcase,
  GraduationCap,
  Shield,
  Download,
  ExternalLink,
  Search,
  Filter,
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
    id: '7',
    title: 'Career Pathways Explorer',
    description: 'Discover careers you never knew existed. Interactive guide with salary info, required education, and real stories from people in various fields - including those who started where you are.',
    category: 'career',
    type: 'guide',
    duration: '30 min interactive',
    traumaInformed: false,
    ageGroup: '16-24',
    views: 1523,
    rating: 4.7,
    featured: false,
    tags: ['Career planning', 'Future goals', 'Inspiration'],
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
  { id: 'all', name: 'All Resources', icon: <BookOpen className="w-5 h-5" />, color: 'gray' },
  { id: 'trauma-support', name: 'Trauma Support', icon: <Heart className="w-5 h-5" />, color: 'red' },
  { id: 'mental-health', name: 'Mental Health', icon: <Brain className="w-5 h-5" />, color: 'purple' },
  { id: 'academic', name: 'Academic', icon: <GraduationCap className="w-5 h-5" />, color: 'blue' },
  { id: 'life-skills', name: 'Life Skills', icon: <Users className="w-5 h-5" />, color: 'green' },
  { id: 'career', name: 'Career', icon: <Briefcase className="w-5 h-5" />, color: 'yellow' },
  { id: 'legal', name: 'Legal Rights', icon: <Shield className="w-5 h-5" />, color: 'orange' }
];

const typeIcons = {
  video: <Video className="w-5 h-5" />,
  article: <FileText className="w-5 h-5" />,
  worksheet: <FileText className="w-5 h-5" />,
  podcast: <Headphones className="w-5 h-5" />,
  guide: <BookOpen className="w-5 h-5" />
};

export default function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTraumaInformedOnly, setShowTraumaInformedOnly] = useState(false);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTraumaFilter = !showTraumaInformedOnly || resource.traumaInformed;
    return matchesCategory && matchesSearch && matchesTraumaFilter;
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resource Library
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Trauma-informed resources designed to support your journey. All content created with care, understanding, and respect for your experiences.
          </p>

          {/* Trauma-Informed Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-verdean-100 text-verdean-800 rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 fill-verdean-600" />
            Many resources are trauma-informed and culturally responsive
          </div>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources, topics, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-300 focus:border-verdean-500 focus:ring-2 focus:ring-verdean-500/20 outline-none transition-all shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-verdean-500 text-white shadow-lg shadow-verdean-500/30'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Trauma-Informed Toggle */}
          <div className="flex justify-center">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showTraumaInformedOnly}
                onChange={(e) => setShowTraumaInformedOnly(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-verdean-500 focus:ring-verdean-500"
              />
              <span className="text-gray-700 font-medium">
                Show only trauma-informed resources
              </span>
            </label>
          </div>
        </div>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
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
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setShowTraumaInformedOnly(false);
              }}
              className="px-6 py-3 bg-verdean-500 text-white rounded-full font-semibold hover:bg-verdean-600 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Need More Support?</h3>
          <p className="text-xl mb-8 opacity-90">
            These resources are here to help, but sometimes you need to talk to someone. We're here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              Connect with a Mentor
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-all">
              Crisis Resources
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Resource Card Component
function ResourceCard({ resource, index, featured = false }: { resource: Resource; index: number; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group cursor-pointer ${
        featured ? 'ring-2 ring-gold-500' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-verdean-500 to-purple-500 flex items-center justify-center text-white">
            {typeIcons[resource.type]}
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {resource.type}
            </div>
            {resource.traumaInformed && (
              <div className="flex items-center gap-1 text-xs text-verdean-600 font-medium">
                <Heart className="w-3 h-3 fill-verdean-500" />
                Trauma-Informed
              </div>
            )}
          </div>
        </div>
        {featured && (
          <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
        )}
      </div>

      {/* Title & Description */}
      <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-verdean-600 transition-colors">
        {resource.title}
      </h4>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {resource.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
        {resource.duration && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {resource.duration}
          </div>
        )}
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4" />
          {resource.views.toLocaleString()}
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
          {resource.rating}
        </div>
      </div>

      {/* Age Group */}
      <div className="mb-4">
        <span className="text-xs text-gray-500">Age Group:</span>
        <span className="ml-2 text-sm font-medium text-gray-700">{resource.ageGroup}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {resource.downloadable && (
          <button className="flex-1 py-2 px-4 bg-verdean-500 text-white rounded-lg font-medium hover:bg-verdean-600 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-verdean-500/30">
            <Download className="w-4 h-4" />
            Download
          </button>
        )}
        {resource.link && (
          <button className="flex-1 py-2 px-4 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-purple-500/30">
            <ExternalLink className="w-4 h-4" />
            Access
          </button>
        )}
        {!resource.downloadable && !resource.link && (
          <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
            View Details
          </button>
        )}
      </div>
    </motion.div>
  );
}
