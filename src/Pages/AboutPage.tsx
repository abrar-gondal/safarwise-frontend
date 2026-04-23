import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

const TEAM = [
  {
    name: 'Abrar Aziz',
    role: 'Full Stack Developer',
    bio: 'Designed and developed the complete SafarWise platform from backend APIs and database architecture to frontend UI/UX and user authentication.',
    img: '/team/abrar.jpg',
    initials: 'AA',
  },
  {
    name: 'Atif Gujjar',
    role: 'Project Coordinator',
    bio: 'Managed project timelines, team communication, and ensured all deliverables aligned with FYP requirements and supervisor feedback.',
    img: '/team/atif.jpg',
    initials: 'AG',
  },
  {
    name: 'Moavia Khalid',
    role: 'Financial Backer',
    bio: 'Handled project budgeting, resource planning, and provided the financial framework for SafarWise\'s simulated tour pricing and booking system.',
    img: '/team/moavia.jpg',
    initials: 'MK',
  },
];

const SUPERVISOR = {
  name: 'Nagesh Kumar',
  role: 'Project Supervisor',
  dept: 'Department of Software Engineering',
  university: 'Superior University, Lahore',
  initials: 'NK',
};

const FlagIcon  = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>;
const ShieldVIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const HandsIcon  = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const LeafVIcon  = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M11 20A7 7 0 0 1 4 13C4 8 9 3 15 3c0 4.97-3.03 9-4 10"/><path d="M11 20a7 7 0 0 0 5.196-2.804 17 17 0 0 0 3.594-5.796C17 10 12 7 9 9"/></svg>;
const GemVIcon   = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><polygon points="6 3 18 3 22 9 12 22 2 9"/><polyline points="2 9 6 3"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="12" y2="9"/></svg>;
const HeartVIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;

const VALUES = [
  { icon: <FlagIcon />,   title: 'Pakistan First',       desc: 'We are proudly Pakistani. Every rupee spent with SafarWise supports local guides, communities, and businesses across the country.' },
  { icon: <ShieldVIcon />,title: 'Safety Above All',     desc: 'Our certified guides, risk assessments, and 24/7 emergency support ensure your safety on every adventure, from city tours to K2 treks.' },
  { icon: <HandsIcon />,  title: 'Local Expertise',      desc: 'Our team knows every hidden valley, secret viewpoint, and local dish worth trying across Pakistan.' },
  { icon: <LeafVIcon />,  title: 'Responsible Tourism',  desc: 'We practice and promote eco-friendly travel, supporting conservation, minimizing waste, and giving back to the communities we visit.' },
  { icon: <GemVIcon />,   title: 'Curated Excellence',   desc: 'From guesthouses in Hunza to camps on Fairy Meadows, we handpick every detail so you experience only the best of Pakistan.' },
  { icon: <HeartVIcon />, title: 'Genuine Care',         desc: 'You are not a booking reference to us. You are a traveler with a dream and we go the extra mile to make that dream unforgettable.' },
];

const REVIEWS = [
  {
    name: 'Abrar Aziz',
    role: 'Full Stack Developer SafarWise Team',
    text: 'Building SafarWise was an incredible journey. We wanted to create a platform that truly represents Pakistan\'s beauty the result is something we are all genuinely proud of.',
    initials: 'AA',
    color: '#C8862A',
  },
  {
    name: 'Atif Gujjar',
    role: 'Project Coordinator SafarWise Team',
    text: 'Coordinating this project taught me how much Pakistan has to offer as a travel destination. SafarWise captures that spirit from the mountains of Gilgit to the shores of Gwadar.',
    initials: 'AG',
    color: '#3D2B1F',
  },
  {
    name: 'Moavia Khalid',
    role: 'Financial Backer SafarWise Team',
    text: 'The financial planning behind SafarWise reflects real-world tour pricing and PKR-based booking systems. It was designed to be practical, not just a demo.',
    initials: 'MK',
    color: '#6B4C3B',
  },
];

const Avatar = ({ img, initials, color, size = 200 }: { img: string; initials: string; color: string; size?: number }) => {
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <img
        src={img}
        alt={initials}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={e => {
          const el = e.currentTarget as HTMLImageElement;
          el.style.display = 'none';
          const fallback = el.nextSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div style={{
        display: 'none', width: '100%', height: '100%',
        background: color, color: 'white',
        alignItems: 'center', justifyContent: 'center',
        fontSize: size > 80 ? '3rem' : '1.5rem',
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 600, letterSpacing: 2,
        position: 'absolute', top: 0, left: 0,
      }}>
        {initials}
      </div>
    </div>
  );
};

export default function AboutPage() {
  const { navigate } = useApp();

  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>About <em>SafarWise</em></h1>
        <p>A Final Year Project by Software Engineering students at Superior University, Lahore. Built to showcase Pakistan's beauty through technology.</p>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="about-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(61,43,31,0.18)' }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', display: 'block', maxHeight: 300, objectFit: 'cover' }}
                >
                  <source src="/videos/safarwise.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="about-images" style={{ position: 'relative', height: 260 }}>
                <img
                  className="about-img-main"
                  src="https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800"
                  alt="Hunza Valley Pakistan"
                  loading="lazy"
                />
                <img
                  className="about-img-sec"
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400"
                  alt="K2 Pakistan"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="about-content">
              <div className="section-tag">Our Story</div>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                Built for Pakistan,<br /><em>By Pakistanis</em>
              </h2>
              <div className="divider" />
              <p style={{ color: 'var(--earth-light)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.95rem' }}>
                SafarWise is a Final Year Project developed by a team of Software Engineering students at Superior University, Lahore. The idea was born from a simple observation Pakistan is one of the most breathtaking countries on Earth, yet it lacks a modern, well-designed digital platform for local tourism.
              </p>
              <p style={{ color: 'var(--earth-light)', lineHeight: 1.85, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
                From the soaring peaks of the Karakoram to the golden shores of the Makran Coast, from the ancient Mughal grandeur of Lahore to the wildflower meadows of Fairy Meadows SafarWise is designed to connect travelers with the real, extraordinary Pakistan. The platform features a complete booking system, real authentication, OTP-based security, and a PKR-first pricing model built for Pakistani travelers.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--sand)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem', border: '1px solid rgba(200,134,42,0.15)' }}>
                <img
                  src="cdn.brandfetch.io/idaM6PZcRV/w/200/h/200/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1747750909538"
                  alt="Superior University"
                  style={{ height: 52, objectFit: 'contain' }}
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)', fontWeight: 600 }}>Superior University</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--earth-light)' }}>Department of Software Engineering, Lahore</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--amber)', fontWeight: 600, marginTop: 2 }}>Final Year Project - 2025-26</div>
                </div>
              </div>
              <div className="about-values">
                {VALUES.map(v => (
                  <div key={v.title} className="value-card">
                    <div className="value-icon" style={{ display: "flex", alignItems: "center" }}>{v.icon}</div>
                    <div className="value-title">{v.title}</div>
                    <div className="value-desc">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">The Team</div>
            <h2 className="section-title">Meet the <em>Developers</em></h2>
            <p className="section-desc">The students behind SafarWise - Superior University, Software Engineering.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {TEAM.map(m => (
              <div key={m.name}
                style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px var(--shadow)', border: '1px solid rgba(200,134,42,0.08)', transition: 'transform 0.3s', cursor: 'default' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
              >
                <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                  <Avatar img={m.img} initials={m.initials} color={m.name === 'Abrar Aziz' ? '#C8862A' : m.name === 'Atif Gujjar' ? '#3D2B1F' : '#6B4C3B'} size={200} />
                </div>
                <div style={{ padding: '1.25rem 1.4rem' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.25rem', color: 'var(--earth)', marginBottom: '0.2rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--amber)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>{m.role}</div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--earth-light)', lineHeight: 1.7, margin: 0 }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 480, margin: '0 auto' }}>
            <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px var(--shadow)', border: '2px solid rgba(200,134,42,0.2)' }}>
              <div style={{ background: 'var(--earth)', padding: '0.6rem 1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Project Supervisor</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.5rem' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--earth)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, flexShrink: 0 }}>
                  {SUPERVISOR.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.35rem', color: 'var(--earth)' }}>{SUPERVISOR.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--amber)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>{SUPERVISOR.role}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--earth-light)' }}>{SUPERVISOR.dept}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--earth-light)' }}>{SUPERVISOR.university}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">From the Team</div>
            <h2 className="section-title">Words from the <em>Developers</em></h2>
            <p className="section-desc">What the SafarWise team has to say about building this platform.</p>
          </div>
          <div className="testimonials">
            {REVIEWS.map((r, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars" style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#C8862A"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
              </div>
                <p className="testimonial-text">"{r.text}"</p>
                <div className="testimonial-author">
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: r.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, flexShrink: 0 }}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="testimonial-name">{r.name}</div>
                    <div className="testimonial-trip">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="section-inner" style={{ maxWidth: 800, textAlign: 'center' }}>
          <div className="section-tag">Our Mission</div>
          <h2 className="section-title">To Show Pakistan<br />to the <em>World</em></h2>
          <div className="divider center" />
          <p style={{ color: 'var(--earth-light)', lineHeight: 1.9, fontSize: '1.05rem' }}>
            Pakistan is home to five of the world's fourteen 8,000m peaks, the ancient Indus civilization, 1,000 kilometres of Arabian Sea coastline, and some of the most welcoming people on Earth. SafarWise was built to create a platform that connects travelers with all of this through modern technology, a seamless booking experience, and a genuine love for Pakistan.
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              ['8', 'Tour Packages'],
              ['6', 'Destinations'],
              ['3', 'Team Members'],
              ['2025', 'FYP Year'],
            ].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: 'var(--amber)', fontWeight: 300 }}>{n}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--earth-light)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('packages')}>Explore Packages</button>
            <button className="btn-ghost" onClick={() => navigate('contact')}>Get in Touch</button>
          </div>
        </div>
      </section>
    </div>
  );
}