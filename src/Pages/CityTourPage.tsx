import { useState } from 'react';
import BackButton from '../components/BackButton';
import CityTourCard from '../components/CityTourCard';
import { useApp } from '../AppContext';
import { CITY_TOURS } from '../data/cityTours';
import { createBooking, sendContact } from '../api';

export default function CityToursPage() {
  const { navigate, setSelectedCityTour } = useApp() as any;
  const [bookingTour, setBookingTour] = useState<typeof CITY_TOURS[0] | null>(null);
  const [name, setName]         = useState('');
  const [phone, setPhone]       = useState('');
  const [date, setDate]         = useState('');
  const [travelers, setTravelers] = useState('1');
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [error, setError]       = useState('');

  const today = new Date().toISOString().split('T')[0];
  const handleView = (tour: typeof CITY_TOURS[0]) => {
    setSelectedCityTour(tour);
    navigate('city-tour-detail');
  };
  const handleBook = (tour: typeof CITY_TOURS[0]) => {
    setBookingTour(tour);
    setSent(false);
    setName(''); setPhone(''); setDate(''); setTravelers('1'); setError('');
  };
  const submit = async () => {
    setError('');
    if (!name || !phone || !date) { setError('Please fill all required fields.'); return; }
    setLoading(true);
    try {
        await createBooking({
          packageName:     `City Tour: ${bookingTour?.name}`,
          destination:     'Lahore, Punjab',
          duration:        bookingTour?.duration || '',
          travelDate:      date,
          travelers:       Number(travelers),
          totalPrice:      (bookingTour?.price || 0) * Number(travelers),
          paymentMethod:   'inquiry',
          specialRequests: `Name: ${name} | Phone: ${phone} | City Tour Inquiry`,
        });
        await sendContact({
          name, email: 'safarwise32@gmail.com', phone,
          subject: `City Tour Inquiry: ${bookingTour?.name}`,
          message: `Tour: ${bookingTour?.name}\nDate: ${date}\nTravelers: ${travelers}\nPhone: ${phone}`,
        });
        setSent(true);
    } catch   
    (err: any) { setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Lahore <em>City Tours</em></h1>
        <p>Discover the Mughal grandeur, vibrant food culture and rich heritage of Pakistan's cultural capital.</p>
      </div>
      <section className="section" style={{ background: 'var(--sand)', paddingBottom: '2rem' }}>
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div className="section-tag">Lahore, Punjab</div>
              <h2 className="section-title" style={{ textAlign: 'left', fontSize: '2.2rem' }}>
                Pakistan's <em>Cultural Heart</em>
              </h2>
              <div className="divider" />
              <p style={{ color: 'var(--earth-light)', lineHeight: 1.85, marginBottom: '1rem', fontSize: '0.92rem' }}>
                Lahore is a city that never sleeps. From the grandeur of Badshahi Mosque to the chaos of the Walled City, from sizzling food streets to world-class museums it is the soul of Pakistan and one of the most historically rich cities in all of South Asia.
              </p>
              <p style={{ color: 'var(--earth-light)', lineHeight: 1.85, fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                Our Lahore city tours are led by expert local guides who bring centuries of Mughal history to life. Whether you have a single evening or two full days, we have a tour that fits your schedule.
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {[['6', 'City Tours'], ['1 Day', 'Min Duration'], ['Expert', 'Local Guides'], ['PKR 1,500', 'Starting From']].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: 'var(--amber)' }}>{n}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--earth-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 40px var(--shadow)' }}>
              <img src="https://images.unsplash.com/photo-1548013146-72479768bada?w=800" alt="Lahore" style={{ width: '100%', height: 380, objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-tag">Available Tours</div>
            <h2 className="section-title">Choose Your <em>Lahore Experience</em></h2>
            <p className="section-desc">From half-day food walks to two-day heritage tours something for every traveler.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.75rem' }}>
            {CITY_TOURS.map(tour => (
              <CityTourCard
                key={tour.id}
                tour={tour}
                onView={() => handleView(tour)}
                onBook={() => handleBook(tour)}
              />
            ))}
          </div>
        </div>
      </section>
      {bookingTour && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setBookingTour(null)}
        >
          <div
            style={{ background: 'white', borderRadius: 16, padding: '2rem', maxWidth: 480, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.4rem', marginBottom: '0.25rem' }}>
              Book: <em style={{ color: 'var(--amber)' }}>{bookingTour.name}</em>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--earth-light)', marginBottom: '1.25rem' }}>
              PKR {bookingTour.price.toLocaleString()} per person · {bookingTour.duration}
            </p>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(39,174,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', marginBottom: '0.5rem' }}>Request Received!</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--earth-light)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  Thank you {name}! Our team will contact you at <strong>{phone}</strong> within 24 hours to confirm your <strong>{bookingTour.name}</strong>.
                </p>
                <button className="btn-primary" onClick={() => setBookingTour(null)}>Close</button>
              </div>
            ) : (
              <div>
                <div style={{ background: 'rgba(200,134,42,0.06)', border: '1px solid rgba(200,134,42,0.2)', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.82rem', color: 'var(--earth-light)', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                  No payment required now. Fill your details and our team will contact you within 24 hours.
                </div>
                {error && <div style={{ background: 'rgba(192,57,43,0.08)', borderRadius: 8, padding: '0.7rem 1rem', color: '#C0392B', fontSize: '0.82rem', marginBottom: '1rem' }}>{error}</div>}
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input className="form-input" placeholder="+92 300 0000000" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Preferred Date *</label>
                    <input className="form-input" type="date" min={today} value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Travelers</label>
                    <select className="form-input" value={travelers} onChange={e => setTravelers(e.target.value)}>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button className="btn-ghost" onClick={() => setBookingTour(null)}>Cancel</button>
                  <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={submit} disabled={loading}>
                    {loading ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <section className="section" style={{ background: 'var(--earth)' }}>
        <div className="section-inner" style={{ textAlign: 'center', maxWidth: 600 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', color: 'var(--sand)', marginBottom: '0.75rem' }}>
            Looking for More <em style={{ color: 'var(--amber)' }}>Adventures?</em>
          </h2>
          <p style={{ color: 'rgba(245,237,214,0.7)', marginBottom: '1.5rem' }}>
            Explore our full range of Pakistan tour packages from the mountains of Gilgit to the coast of Gwadar.
          </p>
          <button className="btn-primary" onClick={() => navigate('packages')}>View All Packages</button>
        </div>
      </section>
    </div>
  );
}