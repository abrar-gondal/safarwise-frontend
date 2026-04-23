import { useEffect, useState } from 'react';
import logoImg from '../assets/logo.png';
import { useApp } from '../AppContext';

const NAV_LINKS = [
  { id: 'home',         label: 'Home' },
  { id: 'services',     label: 'Services' },
  { id: 'packages',     label: 'Packages' },
  { id: 'city-tours', label: 'City Tours' },
  { id: 'about',        label: 'About Us' },
  { id: 'blog',         label: 'Blog' },
  { id: 'contact',      label: 'Contact' },
];
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
export default function Navbar() {
  const { page, navigate, user, mobileOpen, setMobileOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="logo" onClick={() => navigate('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={logoImg} alt="SafarWise" style={{ height: 48, width: 48, objectFit: 'contain' }} />
          <span className="logo-text">Safar<span>Wise</span></span>
        </div>

        <div className="nav-links">
          {NAV_LINKS.map(l => (
            <button key={l.id} className={`nav-link${page === l.id ? ' active' : ''}`} onClick={() => navigate(l.id)}>
              {l.label}
            </button>
          ))}
          <button className="nav-link" onClick={() => navigate('chatbot')} style={{ display: 'flex', alignItems: 'center' }} title="Live Chat">
            <ChatIcon />
          </button>
          {user ? (
            <button className="btn-nav" onClick={() => navigate('profile')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <UserIcon /> {user.name.split(' ')[0]}
            </button>
          ) : (
            <button className="btn-nav" onClick={() => navigate('login')}>Sign In</button>
          )}
        </div>

        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(l => (
            <button key={l.id} className={`nav-link${page === l.id ? ' active' : ''}`} onClick={() => { navigate(l.id); setMobileOpen(false); }}>
              {l.label}
            </button>
          ))}
          <button className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => { navigate('chatbot'); setMobileOpen(false); }}>
            <ChatIcon /> Chat
          </button>
          {user ? (
            <button className="btn-nav" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={() => { navigate('profile'); setMobileOpen(false); }}>
              <UserIcon /> My Profile
            </button>
          ) : (
            <button className="btn-nav" style={{ alignSelf: 'flex-start' }} onClick={() => { navigate('login'); setMobileOpen(false); }}>
              Sign In
            </button>
          )}
        </div>
      )}
    </>
  );
}