/**
 * siteContent.tsx
 * Single source of truth for all static data arrays used across the site.
 * Interfaces, data, and JSX icon values live here so component files stay lean.
 */

import React from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  Brain,
  Clock,
  FileText,
  GraduationCap,
  Headphones,
  Heart,
  HelpingHand,
  Shield,
  Star,
  Target,
  Users,
  Video,
} from 'lucide-react';

// ─── SaturnCarousel ───────────────────────────────────────────────────────────

export type GemTheme = 'amethyst' | 'jade';

export interface ResourceItem {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  theme: GemTheme;
  rating: string;
  views: string;
  url: string;
}

export const carouselItems: ResourceItem[] = [
  {
    id: 1,
    title: 'Understanding Your Emotions',
    category: 'Trauma Support',
    description: 'Practical tools for emotional regulation and resilience designed for youth facing systemic challenges.',
    icon: <Heart className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.8★',
    views: '1,247 views',
    url: '/resources/1',
  },
  {
    id: 2,
    title: 'From Streets to Success',
    category: 'Inspiration',
    description: 'Real transformation stories from people who walked your path and found their way forward.',
    icon: <Video className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.9★',
    views: '3,420 views',
    url: '/resources/2',
  },
  {
    id: 3,
    title: 'Building Healthy Relationships',
    category: 'Life Skills',
    description: 'Navigate trust, boundaries, and authentic communication with lasting confidence.',
    icon: <Users className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.7★',
    views: '892 views',
    url: '/resources/3',
  },
  {
    id: 4,
    title: 'Know Your Legal Rights',
    category: 'Legal Guide',
    description: 'A youth-focused guide to protecting yourself when interacting with law enforcement and the justice system.',
    icon: <Shield className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.9★',
    views: '2,156 views',
    url: '/resources/4',
  },
  {
    id: 5,
    title: 'Study Skills That Work',
    category: 'Academic',
    description: 'Evidence-based strategies for improving grades, focus, and academic self-confidence.',
    icon: <BookOpen className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.6★',
    views: '1,634 views',
    url: '/resources/5',
  },
  {
    id: 6,
    title: 'Mindfulness for Tough Times',
    category: 'Mental Health',
    description: 'Breathing exercises and guided meditation practices that work when life feels overwhelming.',
    icon: <Brain className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.8★',
    views: '2,891 views',
    url: '/resources/6',
  },
  {
    id: 7,
    title: 'Financial Literacy Basics',
    category: 'Life Skills',
    description: "Money management, budgeting, and credit — the skills they don't teach in school.",
    icon: <Star className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.8★',
    views: '2,045 views',
    url: '/resources/7',
  },
  {
    id: 8,
    title: 'Healing from Trauma',
    category: 'Trauma Support',
    description: 'A compassionate, specialist-informed guide to understanding and recovering from trauma.',
    icon: <Clock className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.9★',
    views: '1,789 views',
    url: '/resources/8',
  },
  {
    id: 9,
    title: 'College Application Roadmap',
    category: 'Academic',
    description: 'Step-by-step guidance through applications, financial aid, and scholarships — especially for first-generation students.',
    icon: <GraduationCap className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.7★',
    views: '1,345 views',
    url: '/resources/9',
  },
  {
    id: 10,
    title: 'Conflict Resolution Skills',
    category: 'Life Skills',
    description: 'De-escalation techniques and communication strategies to handle conflict without violence or aggression.',
    icon: <Users className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.6★',
    views: '987 views',
    url: '/resources/10',
  },
  {
    id: 11,
    title: 'Building Your Support Network',
    category: 'Mental Health',
    description: "You don't have to do this alone. Learn how to identify trustworthy people and create a community that has your back.",
    icon: <Heart className="w-9 h-9" />,
    theme: 'amethyst',
    rating: '4.8★',
    views: '1,456 views',
    url: '/resources/11',
  },
  {
    id: 12,
    title: 'Career Pathways in Providence',
    category: 'Career',
    description: 'Local trade programs, apprenticeships, and employer partnerships that open doors without requiring a four-year degree.',
    icon: <Star className="w-9 h-9" />,
    theme: 'jade',
    rating: '4.7★',
    views: '1,102 views',
    url: '/resources/12',
  },
];

// ─── Resource Library ─────────────────────────────────────────────────────────

export interface Resource {
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

export const resources: Resource[] = [
  {
    id: '1',
    title: "Understanding Your Emotions: A Teen's Guide",
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
    downloadable: true,
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
    downloadable: false,
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
    downloadable: true,
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
    downloadable: true,
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
    downloadable: true,
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
    downloadable: false,
  },
  {
    id: '8',
    title: 'Financial Literacy Basics',
    description: "Money management skills they don't teach in school. Budgeting, banking, credit, avoiding scams, and planning for your future. Practical tips you can use right now.",
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
    downloadable: false,
  },
  {
    id: '9',
    title: "Healing from Trauma: A Youth's Journey",
    description: "Created with trauma specialists, this compassionate guide helps you understand trauma's effects and find paths to healing. Includes resources for professional support and peer connection.",
    category: 'trauma-support',
    type: 'guide',
    duration: '35 min read',
    traumaInformed: true,
    ageGroup: '14-21',
    views: 1789,
    rating: 4.9,
    featured: true,
    tags: ['Trauma recovery', 'Healing', 'Professional support'],
    downloadable: true,
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
    downloadable: true,
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
    downloadable: false,
  },
  {
    id: '12',
    title: 'Building Your Support Network',
    description: "You don't have to do this alone. Learn how to identify trustworthy people, ask for help, and create a support system that has your back.",
    category: 'mental-health',
    type: 'article',
    duration: '15 min read',
    traumaInformed: true,
    ageGroup: '13-24',
    views: 1456,
    rating: 4.8,
    featured: false,
    tags: ['Support network', 'Asking for help', 'Community'],
    downloadable: true,
  },
];

export const categories = [
  { id: 'all', name: 'All Resources', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'trauma-support', name: 'Trauma Support', icon: <Heart className="w-5 h-5" /> },
  { id: 'mental-health', name: 'Mental Health', icon: <Brain className="w-5 h-5" /> },
  { id: 'academic', name: 'Academic', icon: <GraduationCap className="w-5 h-5" /> },
  { id: 'life-skills', name: 'Life Skills', icon: <Users className="w-5 h-5" /> },
  { id: 'legal', name: 'Legal Rights', icon: <Shield className="w-5 h-5" /> },
];

export const typeIcons: Record<Resource['type'], React.ReactNode> = {
  video:     <Video className="w-5 h-5" />,
  article:   <FileText className="w-5 h-5" />,
  worksheet: <FileText className="w-5 h-5" />,
  podcast:   <Headphones className="w-5 h-5" />,
  guide:     <BookOpen className="w-5 h-5" />,
};

export const crisisResources = [
  { emoji: '🆘', name: 'National Suicide Prevention Lifeline',                     contact: 'Call or Text: 988',                          hours: 'Available 24/7',                        tel: '988' },
  { emoji: '📞', name: 'Crisis Text Line',                                          contact: 'Text HOME to 741741',                        hours: 'Available 24/7',                        tel: null },
  { emoji: '🚨', name: 'National Domestic Violence Hotline',                        contact: '1-800-799-7233 | Text START to 88788',        hours: 'Available 24/7',                        tel: '18007997233' },
  { emoji: '🧠', name: 'SAMHSA National Helpline (Mental Health & Substance Use)',  contact: '1-800-662-4357',                             hours: 'Free, confidential, 24/7',              tel: '18006624357' },
  { emoji: '👶', name: 'Childhelp National Child Abuse Hotline',                   contact: '1-800-422-4453',                             hours: 'Available 24/7',                        tel: '18004224453' },
  { emoji: '🏠', name: 'National Alliance on Mental Illness (NAMI) Helpline',      contact: '1-800-950-6264',                             hours: 'Mon–Fri, 10am–10pm ET',                 tel: '18009506264' },
  { emoji: '❤️', name: 'Trevor Project (LGBTQ+ Youth)',                             contact: '1-866-488-7386 | Text START to 678-678',     hours: 'Available 24/7',                        tel: '18664887386' },
  { emoji: '🍽️', name: 'National Eating Disorder Helpline',                        contact: '1-800-931-2237',                             hours: 'Mon–Thu 9am–9pm, Fri 9am–5pm ET',       tel: '18009312237' },
  { emoji: '🚔', name: 'National Human Trafficking Hotline',                       contact: '1-888-373-7888 | Text HELP to 233733',       hours: 'Available 24/7',                        tel: '18883737888' },
];

// ─── Mentor Matching ──────────────────────────────────────────────────────────

export interface Mentor {
  id: string;
  name: string;
  photo: string;
  role: string;
  expertise: string[];
  availability: string;
  location: string;
  matchesCompleted: number;
  successRate: number;
  bio: string;
  livedExperience: string;
  interests: string[];
  verified: boolean;
  featured: boolean;
}

export const mentors: Mentor[] = [
  {
    id: '1',
    name: 'Robert McKinney Sr.',
    photo: 'RM',
    role: 'Founder & Lead Mentor',
    expertise: ['Life Skills', 'Career Guidance', 'Leadership Development'],
    availability: 'Flexible - Call to Schedule',
    location: 'Providence, RI',
    matchesCompleted: 12,
    successRate: 100,
    bio: "Founder of Lead By Example. I've dedicated my life to interrupting the school-to-prison pipeline using my lived experience to guide our youth toward better futures.",
    livedExperience: 'Overcame personal challenges, now leading community change',
    interests: ['Community Building', 'Youth Advocacy', 'Mentorship'],
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Ronald Hopkins',
    photo: 'RH',
    role: 'Community Mentor',
    expertise: ['Life Skills', 'Youth Advocacy', 'Community Support'],
    availability: 'Flexible - Call to Schedule',
    location: 'Providence, RI',
    matchesCompleted: 8,
    successRate: 100,
    bio: 'Ronald is a dedicated community leader and mentor committed to breaking the school-to-prison pipeline and empowering youth in Providence.',
    livedExperience: 'Community leader with lived experience guiding youth toward positive futures',
    interests: ['Community Building', 'Youth Development', 'Mentorship'],
    verified: true,
    featured: false,
  },
];

// ─── Evolution Journey ────────────────────────────────────────────────────────

export interface JourneyStage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  symbols: string[];
  stats?: { label: string; value: string }[];
  interventions: string[];
}

export const journeyStages: JourneyStage[] = [
  {
    id: 1,
    title: 'At-Risk Youth',
    subtitle: 'Facing Systemic Challenges',
    description:
      'Urban youth facing negative influences, limited opportunities, and the school-to-prison pipeline risk. Without intervention, many face incarceration, dropout, or worse.',
    icon: <AlertTriangle className="h-12 w-12" />,
    color: '#DC2626',
    gradientFrom: '#7F1D1D',
    gradientTo: '#DC2626',
    symbols: [
      '🚫 Broken chains representing trapped potential',
      '🌆 Urban landscape with barriers',
      '📉 Declining path',
    ],
    stats: [
      { label: 'Youth at Risk in RI', value: '15,000+' },
      { label: 'School Dropout Rate', value: '18%' },
      { label: 'Without Mentorship', value: '3x Risk' },
    ],
    interventions: [],
  },
  {
    id: 2,
    title: 'Struggle & Crossroads',
    subtitle: 'Critical Decision Point',
    description:
      'A moment of choice. Negative influences vs. positive pathways. This is where intervention makes all the difference between falling through the cracks or finding support.',
    icon: <Target className="h-12 w-12" />,
    color: '#EA580C',
    gradientFrom: '#9A3412',
    gradientTo: '#EA580C',
    symbols: [
      '⚖️ Scale representing choices',
      '🔀 Diverging paths',
      '💭 Questions and uncertainty',
    ],
    stats: [
      { label: 'Critical Age Range', value: '11-24' },
      { label: 'First Contact with Justice', value: '76% teens' },
      { label: 'Need Positive Role Model', value: '89%' },
    ],
    interventions: [
      'Street-level outreach and initial contact',
      'Crisis intervention and same-day support',
      'Trust-building through consistent presence',
      'Connection to peer mentors with lived experience',
      'Needs assessment — identifying barriers',
      'Introduction to program resources and community',
      'Safe space to be heard without judgment',
    ],
  },
  {
    id: 3,
    title: 'Lead By Example Intervention',
    subtitle: 'Hope Through Mentorship',
    description:
      'Men and women with lived experience step in as mentors. Trauma-informed support, educational resources, and community connection break the cycle.',
    icon: <HelpingHand className="h-12 w-12" />,
    color: '#01514C',
    gradientFrom: '#01514C',
    gradientTo: '#059669',
    symbols: [
      '🤝 Guiding hands - mentorship',
      '🌅 Rising sun - hope & new beginnings',
      '🚪 Open doors - opportunities',
      '💚 Hearts - trauma-informed care',
      '📚 Books - education as liberation',
    ],
    stats: [
      { label: 'Active Mentors', value: '12+' },
      { label: 'Youth Served', value: '125+' },
      { label: 'Success Rate', value: '100%' },
    ],
    interventions: [
      'One-on-one mentorship from those with lived experience',
      'Academic support and tutoring',
      'Life skills workshops',
      'Trauma-informed counseling',
      'Community events (cookouts, sports)',
      'Career exploration programs',
      'Restorative justice circles',
    ],
  },
  {
    id: 4,
    title: 'Growth & Learning',
    subtitle: 'Building Skills & Confidence',
    description:
      'Through consistent support and positive reinforcement, youth develop resilience, academic skills, and life competencies. Trust is built, trauma is addressed.',
    icon: <BookOpen className="h-12 w-12" />,
    color: '#4B306A',
    gradientFrom: '#4B306A',
    gradientTo: '#7C3AED',
    symbols: [
      '🌱 Growing plant - resilience',
      '📖 Open books - learning',
      '🎨 Art supplies - creative expression',
      '🏀 Sports equipment - healthy outlets',
      '🔄 Circular shapes - restorative practices',
    ],
    stats: [
      { label: 'Improved Grades', value: '82%' },
      { label: 'Increased Attendance', value: '91%' },
      { label: 'Reduced Disciplinary Issues', value: '73%' },
    ],
    interventions: [
      'Weekly mentorship check-ins',
      'Group workshops and activities',
      'Academic tutoring',
      'Social-emotional learning',
      'Leadership development',
    ],
  },
  {
    id: 5,
    title: 'Achievement & Leadership',
    subtitle: 'Breaking the Pipeline',
    description:
      'Youth graduate, pursue higher education or careers, and become community leaders themselves. The cycle is broken, and a new generation of mentors emerges.',
    icon: <Award className="h-12 w-12" />,
    color: '#FFD700',
    gradientFrom: '#CA8A04',
    gradientTo: '#FFD700',
    symbols: [
      '🎓 Graduation cap - education achievement',
      '🏆 Trophy - success',
      '🌟 Stars - reaching potential',
      '🌉 Bridges - connecting to opportunities',
      '👥 Community circle - giving back',
    ],
    stats: [
      { label: 'High School Graduation', value: '87%' },
      { label: 'College/Career Bound', value: '74%' },
      { label: 'Become Mentors Themselves', value: '45%' },
    ],
    interventions: [
      'College application support',
      'Job placement assistance',
      'Leadership training',
      'Public speaking opportunities',
      'Mentor-to-mentor pipeline',
    ],
  },
];
