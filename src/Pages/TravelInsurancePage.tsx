import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

const PLANS = [
  {
    name: 'Basic Cover',
    price: 'PKR 2,500',
    per: 'per person / trip',
    color: '#4a5568',
    features: [
      'Trip cancellation (up to PKR 50,000)',
      'Emergency medical (up to PKR 200,000)',
      'Lost baggage (up to PKR 20,000)',
      'Flight delay cover (6+ hours)',
      '24/7 emergency helpline',
    ],
    notIncluded: ['Adventure sports', 'Pre-existing conditions', 'Evacuation cover'],
  },
  {
    name: 'Adventure Cover',
    price: 'PKR 5,500',
    per: 'per person / trip',
    color: '#c05621',
    badge: 'Most Popular',
    features: [
      'Trip cancellation (up to PKR 150,000)',
      'Emergency medical (up to PKR 1,000,000)',
      'Mountain rescue & evacuation',
      'Trekking & adventure sports',
      'Lost baggage (up to PKR 50,000)',
      'Flight delay & missed connection',
      '24/7 emergency helpline',
    ],
    notIncluded: ['Pre-existing conditions', 'Extreme mountaineering above 7,000m'],
  },
  {
    name: 'Premium Cover',
    price: 'PKR 9,000',
    per: 'per person / trip',
    color: '#276749',
    features: [
      'Trip cancellation (up to PKR 300,000)',
      'Emergency medical (up to PKR 5,000,000)',
      'Full mountain rescue & helicopter evacuation',
      'All adventure sports including high-altitude climbing',
      'Pre-existing conditions (declared)',
      'Lost baggage (up to PKR 100,000)',
      'Travel delay & missed connection',
      'Personal liability cover',
      '24/7 priority emergency helpline',
    ],
    notIncluded: [],
  },
];
const WHAT_COVERED = [
  { icon: '🏥', title: 'Emergency Medical', desc: 'Covers hospital stays, emergency surgery, doctor fees, and prescribed medication during your trip.' },
  { icon: '✈️', title: 'Trip Cancellation', desc: 'Reimburses non-refundable costs if you must cancel due to illness, family emergency, or natural disaster.' },
  { icon: '🧳', title: 'Baggage & Belongings', desc: 'Covers lost, stolen, or damaged luggage and personal items during your journey.' },
  { icon: '⏰', title: 'Travel Delay', desc: 'Compensates for additional accommodation and meals caused by significant travel delays.' },
  { icon: '🧗', title: 'Adventure Sports', desc: 'Covers trekking, mountaineering, white-water rafting, paragliding, and other adventure activities.' },
];

export default function TravelInsurancePage() {
  const { navigate } = useApp();
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Travel <em>Insurance</em></h1>
        <p>Travel with confidence across Pakistan fully protected for every adventure.</p>
      </div>
      <section style={{ background: 'var(--earth)', padding: '3rem 0' }}>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ color: 'var(--ivory)' }}>
              <div className="section-tag" style={{ color: 'var(--amber)' }}>✦ Why It Matters</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', margin: '0.5rem 0 1rem' }}>
                Don't Travel Without <em style={{ color: 'var(--amber)' }}>Protection</em>
              </h2>
              <p style={{ color: 'rgba(245,237,214,0.75)', lineHeight: 1.8, fontSize: '0.92rem' }}>
                Pakistan's northern mountains are breathtakingly beautiful, but they are also remote and unpredictable. A helicopter evacuation from K2 base camp can cost over PKR 500,000. A single hospital stay in an emergency can wipe out your savings. Travel insurance gives you peace of mind so you can focus on the adventure.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { num: 'PKR 500K+', label: 'Avg. helicopter rescue cost' },
                { num: '24/7', label: 'Emergency assistance' },
                { num: '100%', label: 'Required for treks' },
                { num: '3 Plans', label: 'To suit every traveler' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(245,237,214,0.07)', borderRadius: 12, padding: '1.25rem', textAlign: 'center', border: '1px solid rgba(200,134,42,0.2)' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.8rem', color: 'var(--amber)' }}>{s.num}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(245,237,214,0.6)', marginTop: '0.25rem' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">✦ Coverage Areas</div>
            <h2 className="section-title">What's <em>Covered?</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {WHAT_COVERED.map((w, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 14, padding: '1.5rem', boxShadow: '0 2px 16px var(--shadow)', display: 'flex', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{w.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)', marginBottom: '0.35rem' }}>{w.title}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--earth-light)', lineHeight: 1.65 }}>{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">✦ Choose Your Plan</div>
            <h2 className="section-title">Insurance <em>Plans</em></h2>
            <p className="section-desc">All plans are arranged through SafarWise's certified insurance partners.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {PLANS.map((plan, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 24px var(--shadow)', position: 'relative' }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--amber)', color: 'white', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.25rem 0.75rem', borderRadius: 100 }}>
                    {plan.badge}
                  </div>
                )}
                <div style={{ height: 6, background: plan.color }} />
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', color: 'var(--earth)', marginBottom: '0.5rem' }}>{plan.name}</div>
                  <div style={{ fontSize: '1.75rem', color: plan.color, fontWeight: 700, marginBottom: '0.2rem' }}>{plan.price}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--earth-light)', marginBottom: '1.5rem' }}>{plan.per}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--earth-light)' }}>
                        <span style={{ color: plan.color, fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                      </div>
                    ))}
                    {plan.notIncluded.map((f, j) => (
                      <div key={j} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.82rem', color: '#a0aec0' }}>
                        <span style={{ flexShrink: 0 }}>✕</span> {f}
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: plan.color, borderColor: plan.color }} onClick={() => navigate('contact')}>
                    Get This Plan
                  </button>
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
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Need help choosing?</div>
              <h3>Talk to Our <em>Insurance Experts</em></h3>
              <p>Our team will recommend the right plan based on your destinations, activities, and budget.</p>
            </div>
            <div className="promo-actions">
              <button className="btn-primary" onClick={() => navigate('contact')}>Get Advice</button>
              <button className="btn-outline" onClick={() => navigate('faqs')}>View FAQs</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}