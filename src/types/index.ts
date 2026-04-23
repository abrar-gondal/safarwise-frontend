export interface Package {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  featured?: boolean;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; activities: string[] }[];
  includes: string[];
  excludes: string[];
}

export interface User {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  avatar: string;
  bookings: number[];
  favorites: number[];
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

export interface Blog {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  desc: string;
  tags: string[];
  author: string;
  authorRole: string;
  intro: string;
  sections: { heading: string; content: string }[];
  tips: string[];
}

export interface CityTour {
  id: number;
  name: string;
  duration: string;
  price: number;
  image: string;
  desc: string;
  highlights: string[];
  difficulty: string;
  groupSize: string;
  overview: string;
  itinerary: { time: string; activity: string; detail: string }[];
  includes: string[];
  excludes: string[];
  meetingPoint: string;
}