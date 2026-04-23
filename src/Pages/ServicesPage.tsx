import type { JSX } from 'react';
import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

const SvgIcon = ({ d, size = 28 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{d}</svg>
);
const SERVICE_ICONS: Record<string, JSX.Element> = {
  mountain: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 3l4 8 5-5 5 8H2L8 3z"/></svg>,
  tent:     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3.5 21L12 3l8.5 18"/><path d="M12 3l5 10H7z"/></svg>,
  heritage: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>,
  road:     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 21l9-18 9 18"/><path d="M6 15h12M7 9h10"/></svg>,
  waves:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/><path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0"/></svg>,
  safari:   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  food:     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>,
  camera:   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  family:   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
};
const SERVICES = [
  {
    icon: 'mountain',
    title: 'Mountain Expeditions',
    desc: 'Conquer the mighty peaks of Karakoram and Hindukush. From K2 base camp treks to Nanga Parbat expeditions, we guide you safely through some of the most breathtaking mountains on Earth.',
    features: ['K2 and Broad Peak Base Camp', 'Nanga Parbat Trekking', 'Fairy Meadows Camping', 'Expert Mountain Guides'],
    color: '#3d6b5e',
  },
  {
    icon: 'tent',
    title: 'Adventure Camping',
    desc: 'Sleep under a sky full of stars in Pakistan\'s most dramatic landscapes. From the Deosai Plateau to the shores of Attabad Lake, our camps are designed to balance adventure with comfort.',
    features: ['Deosai Plains Camping', 'Attabad Lake Glamping', 'Shandur Polo Festival Camp', 'Desert Camping in Thar'],
    color: '#8b6914',
  },
  {
    icon: 'heritage',
    title: 'Cultural Heritage Tours',
    desc: 'Explore thousands of years of civilization along the ancient Indus Valley. Walk through Mohenjo-daro, the walled city of Lahore, and the Buddhist ruins of Taxila.',
    features: ['Mohenjo-daro and Harappa', 'Lahore Walled City Tour', 'Taxila Buddhist Sites', 'Peshawar Old Bazaars'],
    color: '#7a3b2e',
  },
  {
    icon: 'road',
    title: 'Karakoram Highway Tours',
    desc: 'Journey along one of the world\'s greatest roads the legendary KKH. Travel through Gilgit-Baltistan all the way to the Khunjerab Pass on the Pakistan-China border.',
    features: ['Full KKH Road Trip', 'Hunza Valley Stops', 'Khunjerab Pass Border', 'Photography Tours'],
    color: '#4a5568',
  },
  {
    icon: 'waves',
    title: 'Coastal and Beach Escapes',
    desc: 'Discover Pakistan\'s stunning Arabian Sea coastline. From the golden beaches of Gwadar to the scenic Makran Coastal Highway, experience a Pakistan most people have never seen.',
    features: ['Gwadar Beach Resort', 'Makran Coastal Drive', 'Kund Malir Beach Camp', 'Ormara Island Day Trip'],
    color: '#2b6cb0',
  },
  {
    icon: 'safari',
    title: 'Wildlife Safari',
    desc: 'Discover Pakistan\'s incredible biodiversity. Spot Snow Leopards in Chitral, Markhor in Gilgit-Baltistan, and rare migratory birds in the wetlands of Sindh.',
    features: ['Snow Leopard Tracking', 'Markhor Safari Chitral', 'Keenjhar Lake Bird Watching', 'Lal Suhanra National Park'],
    color: '#276749',
  },
  {
    icon: 'food',
    title: 'Food and Culinary Tours',
    desc: 'Taste your way through Pakistan\'s rich and diverse cuisine. From Lahori Paye and Karachi Biryani to Peshawar\'s famous Chapli Kebab and Hunza\'s dried apricots.',
    features: ['Lahore Food Street Tour', 'Karachi Seafood Trail', 'Peshawar Food Walk', 'Cooking Classes with Locals'],
    color: '#c05621',
  },
  {
    icon: 'camera',
    title: 'Photography Expeditions',
    desc: 'Pakistan is one of the most photogenic countries on Earth. Our photography tours take you to breathtaking viewpoints with expert guidance on timing and composition.',
    features: ['Fairy Meadows Sunrise Shoot', 'Hunza Cherry Blossom Season', 'Badshahi Mosque Night Photography', 'Thar Desert Golden Hour'],
    color: '#553c9a',
  },
  {
    icon: 'family',
    title: 'Family Holiday Packages',
    desc: 'Create unforgettable memories with your loved ones. Our family packages are designed for all ages safe, comfortable, and filled with activities that both kids and adults will enjoy.',
    features: ['Murree and Nathiagali Getaways', 'Swat Valley Family Tours', 'Lahore City Explorer', 'Neelum Valley Retreat'],
    color: '#b7791f',
  },
];
const BADGES = [
  { label: 'Safety Certified Guides' },
  { label: 'Custom Itineraries' },
  { label: 'Local Expertise' },
  { label: 'Premium Quality' },
  { label: '24/7 Support' },
  { label: 'Responsible Tourism' },
];
const ShieldIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const TargetIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const UsersIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const GemIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><polygon points="6 3 18 3 22 9 12 22 2 9"/><polyline points="2 9 6 3"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="12" y2="9"/></svg>;
const PhoneSupportIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l1.27-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const LeafIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 4 13C4 8 9 3 15 3c0 4.97-3.03 9-4 10"/><path d="M11 20a7 7 0 0 0 5.196-2.804 17 17 0 0 0 3.594-5.796C17 10 12 7 9 9"/></svg>;
const WHY_US = [
  { icon: <ShieldIcon />,       title: 'Safety First',          desc: 'All tours are fully risk-assessed with certified guides and 24/7 emergency support throughout your journey.' },
  { icon: <TargetIcon />,       title: 'Tailored Itineraries',  desc: 'Every trip is customized to your interests, fitness level, and budget. No two SafarWise tours are the same.' },
  { icon: <UsersIcon />,        title: 'Local Expertise',       desc: 'Our guides are born and raised across Pakistan. They know every hidden gem, every shortcut, every story.' },
  { icon: <GemIcon />,          title: 'Premium Quality',       desc: 'From transport to accommodation, we handpick every detail so your experience is nothing short of exceptional.' },
  { icon: <PhoneSupportIcon />, title: '24/7 Support',          desc: 'We are with you every step of the journey, before departure, during your tour, and after you return home.' },
  { icon: <LeafIcon />,         title: 'Responsible Tourism',   desc: 'We support local communities and follow eco-friendly travel practices on every single tour we operate.' },
];

export default function ServicesPage() {
  const { navigate } = useApp();
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Our <em>Services</em></h1>
        <p>Everything you need for the perfect Pakistan adventure expertly crafted and locally guided.</p>
      </div>
      <section style={{ background: 'var(--earth)', padding: '2rem 0' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
            {BADGES.map(b => (
              <div key={b.label} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.08)', borderRadius: 50,
                padding: '0.5rem 1.25rem', border: '1px solid rgba(200,134,42,0.3)',
              }}>
                <span style={{ fontSize: '0.8rem', color: 'rgba(245,237,214,0.85)', letterSpacing: '0.04em' }}>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Explore Our <em>Services</em></h2>
            <p className="section-desc">From mountain expeditions to cultural heritage tours we cover every corner of beautiful Pakistan.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                style={{
                  background: 'white', borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0 4px 24px var(--shadow)', border: '1px solid rgba(200,134,42,0.08)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px var(--shadow)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px var(--shadow)';
                }}
              >
                <div style={{ height: 5, background: s.color }} />
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>
                      {SERVICE_ICONS[s.icon]}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: 'var(--earth)', lineHeight: 1.2 }}>
                      {s.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--earth-light)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                    {s.desc}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.5rem' }}>
                    {s.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ color: s.color, fontWeight: 700, fontSize: '0.85rem' }}>✓</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--earth-light)' }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn-ghost"
                    style={{ width: '100%', borderColor: s.color, color: s.color }}
                    onClick={() => navigate('packages')}
                  >
                    View Packages
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">The SafarWise Difference</div>
            <h2 className="section-title">Why Choose <em>Us</em></h2>
            <p className="section-desc">We do not just plan trips. We craft experiences that stay with you long after you return home.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {WHY_US.map((w, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 14, padding: '1.5rem', boxShadow: '0 2px 16px var(--shadow)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>{w.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: 'var(--earth)', marginBottom: '0.35rem' }}>{w.title}</div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--earth-light)', lineHeight: 1.65 }}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div className="promo-banner">
            <div className="promo-text">
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Ready to Explore Pakistan?
              </div>
              <h3>Let Us Plan Your <em>Dream Trip</em></h3>
              <p>Talk to our travel experts and get a free customized itinerary for your perfect Pakistan adventure.</p>
            </div>
            <div className="promo-actions">
              <button className="btn-primary" onClick={() => navigate('packages')}>Browse Packages</button>
              <button className="btn-outline" onClick={() => navigate('contact')}>Free Consultation</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}