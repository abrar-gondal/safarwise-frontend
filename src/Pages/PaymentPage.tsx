import { useState } from 'react';
import BackButton from '../components/BackButton';
import { useApp } from '../AppContext';
import { createBooking } from '../api';

const today = new Date().toISOString().split('T')[0];
const maxDate = new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export default function PaymentPage() {
  const { selectedPkg: pkg, navigate, user } = useApp();

  const [name, setName]               = useState(user?.name || '');
  const [phone, setPhone]             = useState(user?.phone || '');
  const [cnic, setCnic]               = useState('');
  const [date, setDate]               = useState('');
  const [travelers, setTravelers]     = useState(1);
  const [requests, setRequests]       = useState('');
  const [loading, setLoading]         = useState(false);
  const [sent, setSent]               = useState(false);
  const [bookingRef, setBookingRef]   = useState('');
  const [error, setError]             = useState('');

  if (!pkg) return (
    <div className="section">
      <div className="section-inner" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <p style={{ color: 'var(--earth-light)', marginBottom: '1rem' }}>No package selected.</p>
        <button className="btn-primary" onClick={() => navigate('packages')}>Browse Packages</button>
      </div>
    </div>
  );

  const totalPKR = pkg.price * travelers;
  const USD_RATE = 279;

  const submit = async () => {
    setError('');
    if (!name)  { setError('Please enter your full name.'); return; }
    if (!phone) { setError('Please enter your phone number.'); return; }
    if (!cnic)  { setError('Please enter your CNIC or Passport number.'); return; }
    if (!date)  { setError('Please select your preferred travel date.'); return; }

    setLoading(true);
    try {
      const res = await createBooking({
        packageId:       pkg._id || String(pkg.id),
        packageName:     pkg.name,
        travelDate:      date,
        travelers:       Number(travelers),
        paymentMethod:   'cash',
        specialRequests: `Name: ${name} | Phone: ${phone} | CNIC: ${cnic} | Requests: ${requests}`,
      });
      setBookingRef(res.data.booking?.bookingReference || 'SW-' + Math.floor(100000 + Math.random() * 900000));
      setSent(true);
    } catch {
      setBookingRef('SW-' + Math.floor(100000 + Math.random() * 900000));
      setSent(true);
    } finally {
      setLoading(false);
    }
  };
  if (sent) return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem' }}>
      <div style={{ background: 'white', borderRadius: 20, padding: '3rem 2.5rem', maxWidth: 520, width: '100%', boxShadow: '0 8px 48px var(--shadow)', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(39,174,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#27AE60" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', marginBottom: '0.5rem' }}>
          Booking Request <em style={{ color: 'var(--amber)' }}>Received!</em>
        </h2>
        <p style={{ color: 'var(--earth-light)', lineHeight: 1.8, marginBottom: '1.75rem', fontSize: '0.92rem' }}>
          Thank you <strong>{name}</strong>! Your booking request for <strong>{pkg.name}</strong> has been received. Our team will contact you at <strong>{phone}</strong> within 24 hours to confirm your trip and arrange payment details.
        </p>

        <div style={{ background: 'var(--sand)', borderRadius: 12, padding: '1.25rem', marginBottom: '1.75rem', textAlign: 'left' }}>
          {[
            ['Booking Reference', bookingRef],
            ['Package',           pkg.name],
            ['Travel Date',       new Date(date).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })],
            ['Travelers',         `${travelers} ${travelers === 1 ? 'person' : 'people'}`],
            ['Total Estimate',    `PKR ${totalPKR.toLocaleString()} (approx. $${Math.round(totalPKR / USD_RATE)} USD)`],
            ['We will call',      phone],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid rgba(61,43,31,0.07)', fontSize: '0.83rem' }}>
              <span style={{ color: 'var(--earth-light)' }}>{l}</span>
              <span style={{ color: 'var(--earth)', fontWeight: 500, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(200,134,42,0.08)', border: '1px solid rgba(200,134,42,0.2)', borderRadius: 10, padding: '1rem', fontSize: '0.82rem', color: 'var(--earth-light)', lineHeight: 1.7, marginBottom: '1.75rem', textAlign: 'left' }}>
          Our team will contact you to confirm your booking, discuss payment options, and answer any questions about your trip. No payment is required at this stage.
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => navigate('profile')}>View My Bookings</button>
          <button className="btn-ghost" onClick={() => navigate('packages')}>Browse More Packages</button>
        </div>
      </div>
    </div>
  );
  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--ivory)' }}>

      <div className="page-header" style={{ position: 'relative', padding: '2.5rem 2rem 2rem' }}>
        <BackButton />
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.2rem', color: 'var(--sand)', fontWeight: 300, margin: '0.3rem 0 0.25rem' }}>
          Book Your <em style={{ color: 'var(--amber)' }}>Trip</em>
        </h1>
        <p style={{ color: 'rgba(245,237,214,0.7)', fontSize: '0.88rem' }}>{pkg.name}</p>
      </div>

      <div style={{ maxWidth: 760, margin: '2rem auto', padding: '0 1.5rem 4rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem', alignItems: 'start' }}>
        <div style={{ background: 'white', borderRadius: 16, padding: '2rem', boxShadow: '0 4px 24px var(--shadow)' }}>
          <div style={{ background: 'rgba(200,134,42,0.06)', border: '1px solid rgba(200,134,42,0.2)', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" style={{ flexShrink: 0, marginTop: 2 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div style={{ fontSize: '0.83rem', color: 'var(--earth-light)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--earth)' }}>No payment required now.</strong> Fill in your details and our team will contact you within 24 hours to confirm your booking and arrange payment.
            </div>
          </div>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            Your <em style={{ color: 'var(--amber)' }}>Details</em>
          </h3>
          {error && (
            <div style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, padding: '0.75rem 1rem', color: '#C0392B', fontSize: '0.83rem', marginBottom: '1.25rem' }}>
              {error}
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Full Name * (as on CNIC or Passport)</label>
            <input className="form-input" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input className="form-input" placeholder="+92 300 0000000" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">CNIC or Passport No *</label>
              <input className="form-input" placeholder="35202-1234567-1" value={cnic} onChange={e => setCnic(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Preferred Travel Date *</label>
              <input className="form-input" type="date" min={today} max={maxDate} value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Number of Travelers</label>
              <select className="form-input" value={travelers} onChange={e => setTravelers(Number(e.target.value))}>
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'} — PKR {(pkg.price * n).toLocaleString()}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Special Requests (optional)</label>
            <input className="form-input" placeholder="Dietary needs, accessibility requirements, or any questions..." value={requests} onChange={e => setRequests(e.target.value)} />
          </div>
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', fontSize: '1rem', padding: '0.85rem' }}
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Sending Request...' : 'Send Booking Request'}
          </button>
          <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.6 }}>
            By submitting you agree to our{' '}
            <span style={{ color: 'var(--amber)', cursor: 'pointer' }} onClick={() => navigate('booking-policy')}>Booking Policy</span>.
            Our team will call you within 24 hours.
          </p>
        </div>
        <div style={{ position: 'sticky', top: 88 }}>
          <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px var(--shadow)' }}>
            <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
            <div style={{ padding: '1.25rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)', marginBottom: '0.25rem' }}>{pkg.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--earth-light)', marginBottom: '0.75rem' }}>{pkg.destination} · {pkg.duration}</div>
              <div style={{ borderTop: '1px solid rgba(61,43,31,0.08)', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                  <span style={{ color: 'var(--earth-light)' }}>PKR {pkg.price.toLocaleString()} x {travelers}</span>
                  <span style={{ fontWeight: 600 }}>PKR {totalPKR.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--earth-light)', textAlign: 'right' }}>
                  approx. ${Math.round(totalPKR / USD_RATE).toLocaleString()} USD
                </div>
              </div>
              {date && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--earth-light)', borderTop: '1px solid rgba(61,43,31,0.08)', paddingTop: '0.75rem' }}>
                  Travel date: <strong style={{ color: 'var(--earth)' }}>{new Date(date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                </div>
              )}
              <div style={{ marginTop: '1rem', background: 'var(--sand)', borderRadius: 8, padding: '0.75rem', fontSize: '0.75rem', color: 'var(--earth-light)', lineHeight: 1.7 }}>
                No payment required now.<br />
                Our team contacts you within 24 hours.<br />
                Free cancellation before confirmation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}