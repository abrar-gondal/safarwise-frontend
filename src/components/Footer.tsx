import { useApp } from '../AppContext';
import logoImg from '../assets/logo.png';

export default function Footer() {
  const { navigate } = useApp();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => navigate('home')}>
              <img src={logoImg} alt="SafarWise" style={{ height: 48, width: 48, objectFit: 'contain' }} />
              <span className="logo-text" style={{ color: 'var(--sand)' }}>Safar<span>Wise</span></span>
            </div>
            <p>Pakistan's premier travel experience from the peaks of Karakoram to the shores of the Arabian Sea. Your adventure begins here.</p>
            <div className="social-links" style={{ marginTop: '1.5rem' }}>
              <a href="https://facebook.com/safarwise" target="_blank" rel="noreferrer" className="social-link" title="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://instagram.com/safarwise" target="_blank" rel="noreferrer" className="social-link" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com/@safarwise" target="_blank" rel="noreferrer" className="social-link" title="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>
          <div>
            <div className="footer-heading">Explore</div>
            <ul className="footer-links">
              {(
                [['All Packages', 'packages'], ['Services', 'services'], ['City Tours', 'city-tours'], ['Adventure Treks', 'packages'], ['Blog', 'blog']] as [string, string][]
              ).map(([label, path]) => (
                <li key={label} style={{ cursor: 'pointer' }} onClick={() => navigate(path)}>{label}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Company</div>
            <ul className="footer-links">
              {([['About Us', 'about'], ['Our Team', 'about'], ['Contact', 'contact'], ['Live Chat', 'chatbot']] as [string, string][]).map(([label, path]) => (
                <li key={label} style={{ cursor: 'pointer' }} onClick={() => navigate(path)}>{label}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Support</div>
            <ul className="footer-links">
              {([['FAQs', 'faqs'], ['Travel Insurance', 'travel-insurance'], ['Booking Policy', 'booking-policy'], ['Privacy Policy', 'privacy-policy']] as [string, string][]).map(([label, path]) => (
                <li key={label} style={{ cursor: 'pointer' }} onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(path); }}>{label}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>2026 SafarWise. All rights reserved.</p>
          <p>Built for Pakistani adventurers - FYP</p>
        </div>
      </div>
    </footer>
  );
}