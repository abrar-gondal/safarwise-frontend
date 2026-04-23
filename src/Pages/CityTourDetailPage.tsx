import { useState } from 'react';
import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';
import type { CityTour } from '../types';
import { createBooking, sendContact } from '../api';

const USD_RATE = 279;
export default function CityTourDetailPage() {
  const { selectedCityTour, navigate } = useApp() as any;
  const tour: CityTour | null = selectedCityTour;

  const [showForm, setShowForm]   = useState(false);
  const [name, setName]           = useState('');
  const [phone, setPhone]         = useState('');
  const [date, setDate]           = useState('');
  const [travelers, setTravelers] = useState('1');
  const [loading, setLoading]     = useState(false);
  const [sent, setSent]           = useState(false);
  const [error, setError]         = useState('');

  const today = new Date().toISOString().split('T')[0];
  if (!tour) {
    navigate('city-tours');
    return null;
  }
  const submit = async () => {
    setError('');
    if (!name || !phone || !date) { setError('Please fill all required fields.'); return; }
    setLoading(true);
    try {
        await createBooking({
          packageName:     `City Tour: ${tour.name}`,
          destination:     'Lahore, Punjab',
          duration:        tour.duration || '',
          travelDate:      date,
          travelers:       Number(travelers),
          totalPrice:      (tour.price || 0) * Number(travelers),
          paymentMethod:   'inquiry',
          specialRequests: `Name: ${name} | Phone: ${phone} | City Tour`,
        });
        await sendContact({
          name, email: 'safarwise32@gmail.com', phone,
          subject: `City Tour Inquiry: ${tour.name}`,
          message: `Tour: ${tour.name}\nDate: ${date}\nTravelers: ${travelers}\nPhone: ${phone}`,
        });
        setSent(true);
    } catch 
    (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }; 
  return (
    <div style={{ paddingTop: 68 }}>
      <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <img src={tour.image} alt={tour.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,16,8,0.9) 0%, rgba(30,16,8,0.3) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <BackButton />
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--amber)', color: 'white', fontSize: '0.72rem', padding: '0.25rem 0.8rem', borderRadius: 50, fontWeight: 600 }}>Lahore City Tour</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.72rem', padding: '0.25rem 0.8rem', borderRadius: 50 }}>{tour.duration}</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.72rem', padding: '0.25rem 0.8rem', borderRadius: 50 }}>{tour.difficulty}</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.72rem', padding: '0.25rem 0.8rem', borderRadius: 50 }}>{tour.groupSize}</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: 'white', fontWeight: 400, lineHeight: 1.25 }}>
              {tour.name}
            </h1>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '1rem', color: 'var(--earth-light)', lineHeight: 1.85, marginBottom: '2.5rem', borderLeft: '3px solid var(--amber)', paddingLeft: '1.25rem', fontStyle: 'italic' }}>
            {tour.overview}
          </p>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', color: 'var(--earth)', marginBottom: '1rem' }}>Tour Highlights</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {tour.highlights.map(h => (
                <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--sand)', borderRadius: 8, padding: '0.5rem 0.9rem' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--earth)' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.6rem', color: 'var(--earth)', marginBottom: '1.5rem' }}>Itinerary</h2>
            <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: 'rgba(200,134,42,0.2)' }} />
              {tour.itinerary.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: '1.5rem', paddingLeft: '1.25rem' }}>
                  <div style={{ position: 'absolute', left: -22, top: 4, width: 12, height: 12, borderRadius: '50%', background: 'var(--amber)', border: '2px solid white', boxShadow: '0 0 0 2px var(--amber)' }} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--amber)', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>{item.time}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'var(--earth)', marginBottom: '0.35rem' }}>{item.activity}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--earth-light)', lineHeight: 1.7 }}>{item.detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(39,174,96,0.05)', border: '1px solid rgba(39,174,96,0.15)', borderRadius: 12, padding: '1.25rem' }}>
              <h4 style={{ color: '#27AE60', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>What is Included</h4>
              {tour.includes.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.82rem', color: 'var(--earth-light)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(192,57,43,0.05)', border: '1px solid rgba(192,57,43,0.12)', borderRadius: 12, padding: '1.25rem' }}>
              <h4 style={{ color: '#C0392B', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem' }}>Not Included</h4>
              {tour.excludes.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', fontSize: '0.82rem', color: 'var(--earth-light)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--sand)', borderRadius: 12, padding: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--amber)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Meeting Point</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--earth)' }}>{tour.meetingPoint}</div>
            </div>
          </div>
        </div>
        <div style={{ position: 'sticky', top: 88 }}>
          <div style={{ background: 'white', borderRadius: 16, padding: '1.5rem', boxShadow: '0 4px 20px var(--shadow)', border: '1px solid rgba(200,134,42,0.1)' }}>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: 'var(--earth)', marginBottom: '0.1rem' }}>
              PKR {tour.price.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--earth-light)', marginBottom: '1.25rem' }}>
              approx. ${Math.round(tour.price / USD_RATE)} USD per person
            </div>

            {[['Duration', tour.duration], ['Difficulty', tour.difficulty], ['Group Size', tour.groupSize]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(61,43,31,0.07)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--earth-light)' }}>{l}</span>
                <span style={{ color: 'var(--earth)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: '1.25rem', background: 'rgba(200,134,42,0.06)', border: '1px solid rgba(200,134,42,0.15)', borderRadius: 8, padding: '0.75rem', fontSize: '0.78rem', color: 'var(--earth-light)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
              No payment required now. Fill your details and our team contacts you within 24 hours.
            </div>
            {!showForm ? (
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setShowForm(true)}>
                Book This Tour
              </button>
            ) : sent ? (
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(39,174,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)', marginBottom: '0.4rem' }}>Request Sent!</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--earth-light)', lineHeight: 1.6 }}>
                  Our team will contact {name} at {phone} within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                {error && <div style={{ background: 'rgba(192,57,43,0.08)', borderRadius: 8, padding: '0.6rem 0.75rem', color: '#C0392B', fontSize: '0.78rem', marginBottom: '0.75rem' }}>{error}</div>}
                <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Full Name *</label>
                  <input className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Phone *</label>
                  <input className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} placeholder="+92 300 0000000" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '0.65rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Preferred Date *</label>
                  <input className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '1rem' }}>
                  <label className="form-label" style={{ fontSize: '0.75rem' }}>Travelers</label>
                  <select className="form-input" style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem' }} value={travelers} onChange={e => setTravelers(e.target.value)}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }} onClick={() => setShowForm(false)}>Cancel</button>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem' }} onClick={submit} disabled={loading}>
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