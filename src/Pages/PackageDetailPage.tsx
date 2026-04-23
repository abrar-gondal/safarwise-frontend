import { useState } from 'react';
import BackButton from '../components/BackButton';
import { createBooking, sendContact } from '../api';
import StarRating from '../components/StarRating';
import { useApp } from '../AppContext';
import { SAFARWISE_PHONE } from '../data/constants';

type Tab = 'itinerary' | 'includes' | 'reviews';
const MOCK_REVIEWS = [
  { name: 'Abrar Aziz',    initials: 'AA', color: '#C8862A', rating: 5, text: 'We tested this package during development and the itinerary is well structured. Every detail from accommodation to transport has been carefully planned.', date: 'Nov 2025' },
  { name: 'Atif Gujjar',   initials: 'AG', color: '#3D2B1F', rating: 5, text: 'Coordinating the research for this package gave us a real appreciation for how much Pakistan has to offer. The route and duration are well balanced.', date: 'Dec 2025' },
  { name: 'Moavia Khalid', initials: 'MK', color: '#6B4C3B', rating: 4, text: 'The pricing model for this package reflects genuine market rates for Pakistani travelers. Good value for the experience offered.', date: 'Sep 2025' },
];
const USD_RATE = 279;
const toUSD   = (pkr: number) => Math.round(pkr / USD_RATE);

const today       = new Date().toISOString().split('T')[0];
const threeMonths = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export default function PackageDetailPage() {
  const { selectedPkg: pkg, navigate, user } = useApp();
  const [tab, setTab]           = useState<Tab>('itinerary');

  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState(user?.name || '');
  const [formPhone, setFormPhone] = useState(user?.phone || '');
  const [formDate, setFormDate] = useState('');
  const [formTravelers, setFormTravelers] = useState(1);
  const [formMsg, setFormMsg]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState('');
  if (!pkg) {
    navigate('packages');
    return null;
  }
  const totalPKR = pkg.price * formTravelers;

  const submitInquiry = async () => {
    setError('');
    if (!formName)  { setError('Please enter your full name.'); return; }
    if (!formPhone) { setError('Please enter your phone number.'); return; }
    if (!formDate)  { setError('Please select your preferred travel date.'); return; }
    setLoading(true);
    try {
      await createBooking({
        packageName:     pkg.name,
        destination:     pkg.destination,
        duration:        pkg.duration,
        travelDate:      formDate,
        travelers:       formTravelers,
        totalPrice:      pkg.price * formTravelers,
        paymentMethod:   'inquiry',
        specialRequests: `Name: ${formName} | Phone: ${formPhone}${formMsg ? ' | ' + formMsg : ''}`,
      });
      try {
        await sendContact({
          name: formName,
          email: user?.email || 'safarwise32@gmail.com',
          phone: formPhone,
          subject: `Package Booking: ${pkg.name}`,
          message: `Package: ${pkg.name}\nDate: ${formDate}\nTravelers: ${formTravelers}\nTotal: PKR ${(pkg.price * formTravelers).toLocaleString()}\nPhone: ${formPhone}${formMsg ? '\nMessage: ' + formMsg : ''}`,
        });
      } catch {
      setSent(true);}
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to submit. Make sure you are logged in and backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <div style={{ position: 'relative', height: 360, overflow: 'hidden' }}>
        <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,16,8,0.8) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <BackButton />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
              {pkg.tags.map((t: string) => (
                <span key={t} style={{ background: 'var(--amber)', color: 'white', fontSize: '0.68rem', padding: '0.2rem 0.65rem', borderRadius: 50, fontWeight: 600 }}>{t}</span>
              ))}
              {pkg.featured && <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.68rem', padding: '0.2rem 0.65rem', borderRadius: 50 }}>Featured</span>}
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.25rem', color: 'white', fontWeight: 400, lineHeight: 1.2 }}>{pkg.name}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {pkg.destination}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {pkg.duration}
              </span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <StarRating rating={pkg.rating} small />
                <span style={{ marginLeft: 4 }}>({pkg.reviews} reviews)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '0.95rem', color: 'var(--earth-light)', lineHeight: 1.85, marginBottom: '2rem', borderLeft: '3px solid var(--amber)', paddingLeft: '1.25rem' }}>
            {pkg.description}
          </p>
          {pkg.highlights && pkg.highlights.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: 'var(--earth)', marginBottom: '1rem' }}>Highlights</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {pkg.highlights.map((h: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.83rem', color: 'var(--earth-light)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid var(--sand)', marginBottom: '1.5rem' }}>
            {(['itinerary', 'includes', 'reviews'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '0.65rem 1.25rem', fontSize: '0.82rem', fontWeight: tab === t ? 600 : 400,
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: `2px solid ${tab === t ? 'var(--amber)' : 'transparent'}`,
                color: tab === t ? 'var(--amber)' : 'var(--earth-light)',
                marginBottom: -2, textTransform: 'capitalize',
              }}>
                {t}
              </button>
            ))}
          </div>
          {tab === 'itinerary' && (
            <div>
              {pkg.itinerary?.map((day: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--earth)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 700, flexShrink: 0, fontFamily: "'Cormorant Garamond',serif" }}>
                    D{day.day}
                  </div>
                  <div style={{ flex: 1, background: 'var(--sand)', borderRadius: 10, padding: '1rem' }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'var(--earth)', marginBottom: '0.4rem' }}>{day.title}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {day.activities.map((a: string, j: number) => (
                        <span key={j} style={{ fontSize: '0.75rem', background: 'white', color: 'var(--earth-light)', padding: '0.2rem 0.6rem', borderRadius: 50 }}>{a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === 'includes' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(39,174,96,0.05)', border: '1px solid rgba(39,174,96,0.15)', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#27AE60', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>What is Included</h4>
                {pkg.includes?.map((item: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.82rem', color: 'var(--earth-light)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(192,57,43,0.05)', border: '1px solid rgba(192,57,43,0.12)', borderRadius: 12, padding: '1.25rem' }}>
                <h4 style={{ color: '#C0392B', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Not Included</h4>
                {pkg.excludes?.map((item: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.82rem', color: 'var(--earth-light)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'reviews' && (
            <div>
              {MOCK_REVIEWS.map((r, i) => (
                <div key={i} style={{ borderBottom: '1px solid rgba(200,134,42,0.1)', paddingBottom: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: r.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{r.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--earth)', fontSize: '0.9rem' }}>{r.name}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--earth-light)' }}>SafarWise Team</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)' }}>{r.date}</span>
                  </div>
                  <StarRating rating={r.rating} small />
                  <p style={{ fontSize: '0.85rem', color: 'var(--earth-light)', marginTop: '0.5rem', lineHeight: 1.65 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ position: 'sticky', top: 88 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '1.75rem', boxShadow: '0 4px 24px var(--shadow)', border: '1px solid rgba(200,134,42,0.1)' }}>
            <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--sand)' }}>
              {pkg.originalPrice && (
                <div style={{ fontSize: '0.82rem', color: 'var(--earth-light)', textDecoration: 'line-through', marginBottom: '0.1rem' }}>
                  PKR {pkg.originalPrice.toLocaleString()}
                </div>
              )}
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: 'var(--earth)' }}>
                PKR {pkg.price.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--earth-light)' }}>
                approx. ${toUSD(pkg.price).toLocaleString()} USD per person
              </div>
            </div>
            {[
              ['Duration', pkg.duration],
              ['Destination', pkg.destination],
              ['Rating', `${pkg.rating} / 5 (${pkg.reviews} reviews)`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(61,43,31,0.07)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--earth-light)' }}>{l}</span>
                <span style={{ color: 'var(--earth)', fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.25rem', background: 'rgba(200,134,42,0.06)', border: '1px solid rgba(200,134,42,0.2)', borderRadius: 8, padding: '0.75rem', fontSize: '0.78rem', color: 'var(--earth-light)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              No payment required now. Fill your details and our team will call you within 24 hours to confirm.
            </div>
            {!showForm ? (
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => user ? setShowForm(true) : navigate('login')}>
                {!user ? 'Sign In to Book' : user.role === 'admin' ? 'Admin — Cannot Book' : 'Send Booking Inquiry'}
              </button>
            ) : sent ? (
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(39,174,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)', marginBottom: '0.5rem' }}>Inquiry Sent!</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--earth-light)', lineHeight: 1.65, marginBottom: '1rem' }}>
                  Our team will call <strong>{formPhone}</strong> within 24 hours to confirm your booking for <strong>{pkg.name}</strong>.
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--amber)', fontWeight: 600 }}>{SAFARWISE_PHONE}</p>
                <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', fontSize: '0.8rem' }} onClick={() => navigate('profile')}>
                  View My Bookings
                </button>
              </div>
            ) : (
              <div>
                {error && <div style={{ background: 'rgba(192,57,43,0.08)', borderRadius: 8, padding: '0.6rem 0.75rem', color: '#C0392B', fontSize: '0.78rem', marginBottom: '0.75rem' }}>{error}</div>}

                <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Full Name *</label>
                  <input className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} placeholder="Your name" value={formName} onChange={e => setFormName(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Phone *</label>
                  <input className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} placeholder="+92 300 0000000" value={formPhone} onChange={e => setFormPhone(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Preferred Date * (within 3 months)</label>
                  <input className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} type="date" min={today} max={threeMonths} value={formDate} onChange={e => setFormDate(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Travelers</label>
                  <select className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} value={formTravelers} onChange={e => setFormTravelers(Number(e.target.value))}>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'} — PKR {(pkg.price * n).toLocaleString()}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Message (optional)</label>
                  <input className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} placeholder="Any special requests or questions..." value={formMsg} onChange={e => setFormMsg(e.target.value)} />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }} onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }} onClick={submitInquiry} disabled={loading}>
                    {loading ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}