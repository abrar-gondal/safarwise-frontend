import { createContext, useContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import type { Package, User } from './types';

const PAGE_TO_URL: Record<string, string> = {
  home: '/',
  services: '/services',
  packages: '/packages',
  'city-tours': '/city-tours',
  about: '/about',
  contact: '/contact',
  chatbot: '/chat',
  'pkg-detail': '/package',
  login: '/login',
  profile: '/profile',
  faqs: '/faqs',
  'travel-insurance': '/travel-insurance',
  'booking-policy': '/booking-policy',
  'privacy-policy': '/privacy-policy',
  'payment': '/payment',
  'blog': '/blog',
  'admin': '/admin',
  'blog-detail': '/blog-detail',
  'city-tour-detail': '/city-tour-detail',
  'forgot-password': '/forgot-password',
  'reset-password': '/reset-password',
};

const URL_TO_PAGE: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_TO_URL).map(([k, v]) => [v, k])
);

interface AppContextType {
  page: string;
  navigate: (p: string) => void;
  goBack: () => void;
  selectedPkg: Package | null;
  setSelectedPkg: (pkg: Package | null) => void;
  selectedBlog: any;
  setSelectedBlog: (blog: any) => void;
  selectedCityTour: any;
  setSelectedCityTour: (tour: any) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  favorites: number[];
  toggleFav: (id: number) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {

  const getInitialPage = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    const params = new URLSearchParams(window.location.search);

    if (
      (hash === '#reset-password' || path === '/reset-password') &&
      params.get('token') &&
      params.get('email')
    ) {
      return 'reset-password';
    }
    if (path === '/forgot-password') {
      return 'forgot-password';
    }

    return URL_TO_PAGE[path] || 'home';
  };
  const [page, setPage] = useState(getInitialPage);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [selectedCityTour, setSelectedCityTour] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const url = PAGE_TO_URL[page] || '/';
    window.history.pushState({ page }, '', url);
    document.title = `SafarWise${page !== 'home' ? ' | ' + page.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : ''}`;
  }, [page]);
  useEffect(() => {
    const handler = (e: PopStateEvent) => {
      if (e.state?.page) {
        setPage(e.state.page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
  const navigate = (p: string) => {
    setHistory(h => [...h, page]);
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setPage(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const toggleFav = (id: number) =>
    setFavorites(f => (f.includes(id) ? f.filter(x => x !== id) : [...f, id]));

  return (
    <AppContext.Provider
      value={{
        page, navigate, goBack,
        selectedPkg, setSelectedPkg,
        selectedBlog, setSelectedBlog,
        selectedCityTour, setSelectedCityTour,
        user, setUser,
        favorites, toggleFav,
        chatOpen, setChatOpen,
        mobileOpen, setMobileOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}