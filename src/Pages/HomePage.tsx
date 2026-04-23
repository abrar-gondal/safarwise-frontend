import { PACKAGES } from '../data';
import { CITY_TOURS } from '../data/cityTours';
import { PackageCard } from '../components';
import { useApp } from '../AppContext';

const MountainIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--earth)" strokeWidth="1.5"><path d="M8 3l4 8 5-5 5 8H2L8 3z"/></svg>;
const HeritageIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--earth)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>;
const RoadIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--earth)" strokeWidth="1.5"><path d="M12 3v18M3 21l9-18 9 18"/><path d="M6 15h12M7 9h10"/></svg>;
const TentIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--earth)" strokeWidth="1.5"><path d="M3.5 21L12 3l8.5 18"/><path d="M12 3l5 10H7z"/></svg>;
const WavesIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--earth)" strokeWidth="1.5"><path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/><path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/></svg>;
const SafariIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--earth)" strokeWidth="1.5"><path d="M20.4 9.6C21 10.9 21 12 21 12c0 4.4-4 8-9 8s-9-3.6-9-8c0-1.1 0-2.1.6-3.4C4.7 6.5 6.5 5 9 5c1.6 0 3 .6 4 1.5C14 5.6 15.4 5 17 5c2.5 0 4.3 1.5 5.4 3.6-.7.3-1.4.6-2 1z"/></svg>;

const SERVICES_PREVIEW = [
  { icon: <MountainIcon />, title: 'Mountain Expeditions', desc: 'K2, Nanga Parbat, Fairy Meadows and beyond.' },
  { icon: <HeritageIcon />, title: 'Cultural Heritage Tours', desc: 'Lahore, Mohenjo-daro, Taxila and ancient Indus sites.' },
  { icon: <RoadIcon />,     title: 'Karakoram Highway Tours', desc: 'The legendary KKH from Lahore to Khunjerab Pass.' },
  { icon: <TentIcon />,     title: 'Adventure Camping', desc: 'Deosai Plains, Attabad Lake and Shandur Polo grounds.' },
  { icon: <WavesIcon />,    title: 'Coastal Escapes', desc: 'Gwadar, Makran Highway and the Arabian Sea coastline.' },
  { icon: <SafariIcon />,   title: 'Wildlife Safari', desc: 'Snow Leopards, Markhor and rare birds across Pakistan.' },
];
export default function HomePage() {
  const { navigate, setSelectedPkg, user, favorites, toggleFav } = useApp();
  const featured = PACKAGES.filter(p => p.featured);
  return (
    <div>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">✈️ Pakistan's Premier Travel Experience</div>
          <h1 className="hero-title">
            Discover Pakistan's <em>Hidden Wonders</em>
          </h1>
          <p className="hero-subtitle">
            From the peaks of Karakoram to the shores of the Arabian Sea -
            curated adventures, cultural journeys, and transformative experiences across Pakistan.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('packages')}>View Packages</button>
            <button className="btn-outline" onClick={() => navigate('chatbot')}>Chat with Us</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">12</div>
              <div className="hero-stat-label">Tour Packages</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">6</div>
              <div className="hero-stat-label">City Tours</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">9</div>
              <div className="hero-stat-label">Services</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">2025-26</div>
              <div className="hero-stat-label">FYP Project</div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Our <em>Services</em></h2>
            <p className="section-desc">
              From mountain expeditions to coastal escapes we cover every corner of beautiful Pakistan.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {SERVICES_PREVIEW.map((s, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  border: '1px solid rgba(200,134,42,0.12)',
                  borderRadius: 14,
                  padding: '1.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 12px var(--shadow)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onClick={() => navigate('services')}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px var(--shadow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 12px var(--shadow)';
                }}
              >
                <div style={{ marginBottom: '0.75rem' }}>{s.icon}</div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', color: 'var(--earth)', marginBottom: '0.4rem' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--earth-light)', lineHeight: 1.6 }}>
                  {s.desc}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn-secondary" onClick={() => navigate('services')}>
              View All Services
            </button>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--ivory)' }}>
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">Handpicked for You</div>
            <h2 className="section-title">Featured <em>Packages</em></h2>
            <p className="section-desc">Extraordinary journeys curated by our expert travel designers.</p>
          </div>
          <div className="packages-grid">
            {featured.map(pkg => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onView={() => { setSelectedPkg(pkg); navigate('pkg-detail'); }}
                onBook={() => { setSelectedPkg(pkg); navigate(user ? 'pkg-detail' : 'login'); }}
                isFav={favorites.includes(pkg.id)}
                onFav={() => toggleFav(pkg.id)}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button className="btn-secondary" onClick={() => navigate('packages')}>
              View All Packages
            </button>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">Explore Lahore</div>
            <h2 className="section-title">Lahore <em>City Tours</em></h2>
            <p className="section-desc">Discover the Mughal grandeur, vibrant food culture and rich heritage of Pakistan's cultural capital.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {CITY_TOURS.slice(0, 3).map(tour => (
              <div
                key={tour.id}
                style={{
                  background: 'white', borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0 4px 20px var(--shadow)', border: '1px solid rgba(200,134,42,0.08)',
                  cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onClick={() => navigate('city-tours')}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px var(--shadow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px var(--shadow)';
                }}
              >
                <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                  <img src={tour.image} alt={tour.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'var(--amber)', color: 'white', fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.65rem', borderRadius: 50 }}>
                    {tour.duration}
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: 'var(--earth)', marginBottom: '0.4rem' }}>{tour.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--earth-light)', lineHeight: 1.65, marginBottom: '0.9rem' }}>{tour.desc.slice(0, 100)}...</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)' }}>
                      PKR {tour.price.toLocaleString()}
                    </div>
                    <button className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.35rem 0.85rem' }} onClick={e => { e.stopPropagation(); navigate('city-tours'); }}>
                      View Tour
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button className="btn-secondary" onClick={() => navigate('city-tours')}>
              View All City Tours
            </button>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div className="promo-banner">
            <div className="promo-text">
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Limited Time Offer
              </div>
              <h3>Save up to 20% on <em>Early Bird</em> Bookings</h3>
              <p>Book 60 days in advance and unlock exclusive rates on select Pakistan packages.</p>
            </div>
            <div className="promo-actions">
              <button className="btn-primary" onClick={() => navigate('packages')}>Explore Deals</button>
              <button className="btn-outline" onClick={() => navigate('contact')}>Contact Us</button>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)', paddingTop: '3rem' }}>
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">From Our Travelers</div>
            <h2 className="section-title">What They're <em>Saying</em></h2>
          </div>
          <div className="testimonials">
            {[
              { name: 'Abrar Aziz', trip: 'Full Stack Developer · SafarWise Team', text: 'Building SafarWise was an incredible experience. We designed every feature from OTP login to PKR pricing with real Pakistani travelers in mind.', img: '', initials: 'AA', color: '#C8862A', stars: 5 },
              { name: 'Atif Gujjar', trip: 'Project Coordinator · SafarWise Team', text: 'Coordinating this FYP showed me how much potential Pakistan tourism has. SafarWise brings that potential to life through a complete digital booking platform.', img: '', initials: 'AG', color: '#3D2B1F', stars: 5 },
              { name: 'Moavia Khalid', trip: 'Financial Backer · SafarWise Team', text: 'The real-world pricing model and payment system in SafarWise reflects how a genuine Pakistani travel platform should work practical, clear and trusted.', img: '', initials: 'MK', color: '#6B4C3B', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars" style={{ display: 'flex', gap: 2 }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#C8862A" stroke="#C8862A" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  {t.img ? (
                    <img src={t.img} alt={t.name} className="testimonial-avatar" />
                  ) : (
                    <div className="testimonial-avatar" style={{ background: (t as any).color || 'var(--amber)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                      {(t as any).initials}
                    </div>
                  )}
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-trip">{t.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}