import { Project } from '../types/types';

export const projects: Project[] = [
  {
    id: 1,
    title: 'Student Super Center',
    description:
      'A full stack web app for managing student insurance, housing listings, discounts, and real-time messaging using role-based access.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'JWT', 'Axios'],
    githubLink: 'https://github.com/lohithvd',
    liveLink: 'https://github.com/lohithvd',
    type: 'Full Stack',
    thumbnail: '/images/placeholders/Thumnail-project1.jpg',
    carouselImages: [],
    carouselConfig: {
      interval: 2500,
      infinite: true,
    },
  },
  {
    id: 2,
    title: 'Insurance Eligibility Chatbot',
    description:
      'A GPT-4-powered chatbot built using Flask and React that suggests insurance plans based on user demographics and eligibility data.',
    tags: ['React', 'Flask', 'GPT-4', 'Redis', 'AWS', 'CloudWatch'],
    githubLink: 'https://github.com/lohithvd',
    liveLink: 'https://github.com/lohithvd',
    type: 'AI + Backend',
    thumbnail: '/images/placeholders/Thumnail-project1.jpg',
    carouselImages: [],
    carouselConfig: {
      interval: 2500,
      infinite: true,
    },
  },
  {
    id: 3,
    title: 'Loan Refinance Rate Analyzer',
    description:
      'A full stack tool for comparing real-time loan refinance rates using external APIs, backend scoring logic, and predictive dashboards.',
    tags: ['Node.js', 'Python', 'MongoDB', 'React', 'JWT', 'GitHub Actions'],
    githubLink: 'https://github.com/lohithvd',
    liveLink: 'https://github.com/lohithvd',
    type: 'Finance Tool',
    thumbnail: '/images/placeholders/Thumnail-project1.jpg',
    carouselImages: [],
    carouselConfig: {
      interval: 2500,
      infinite: true,
    },
  },
  {
    id: 4,
    title: 'Car Service Tracker (Mobile App)',
    description:
      'A cross-platform React Native app for users to log, track, and schedule car maintenance using Firebase for real-time sync.',
    tags: ['React Native', 'Firebase', 'Firestore', 'Mobile', 'Admin Portal'],
    githubLink: 'https://github.com/lohithvd',
    liveLink: 'https://github.com/lohithvd',
    type: 'Mobile App',
    thumbnail: '/images/placeholders/Thumnail-project1.jpg',
    carouselImages: [],
    carouselConfig: {
      interval: 2500,
      infinite: true,
    },
  },
  {
    id: 5,
    title: 'Repair Cost Estimator API',
    description:
      'A Flask microservice that estimates vehicle repair costs using parts/labor databases, deployed with AWS Lambda + DynamoDB.',
    tags: ['Flask', 'AWS Lambda', 'DynamoDB', 'Pytest', 'API'],
    githubLink: 'https://github.com/lohithvd',
    liveLink: 'https://github.com/lohithvd',
    type: 'Backend API',
    thumbnail: '/images/placeholders/Thumnail-project1.jpg',
    carouselImages: [],
    carouselConfig: {
      interval: 2500,
      infinite: true,
    },
  },
];
