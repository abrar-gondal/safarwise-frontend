import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../AppContext';
import { getAllBookings, updateBookingStatus } from '../api';

type AdminTab = 'bookings' | 'stats';
type StatusFilter = 'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed';

interface Booking {
  _id: string;
  bookingReference: string;
  packageName: string;
  travelDate: string;
  travelers: number;
  totalPrice: number;
  bookingStatus: string;
  paymentStatus: string;
  user?: { name: string; email: string; phone: string };
}
export default function AdminPage() {
  const { user, navigate } = useApp();
  const [tab, setTab]         = useState<AdminTab>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(false);
  const [filter, setFilter]     = useState<StatusFilter>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [msg, setMsg]           = useState('');
  const [msgType, setMsgType]   = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (!user) { navigate('login'); return; }
    if (user.role !== 'admin') { navigate('home'); return; }
  }, [user]);
  const showMsg = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg(text); setMsgType(type);
    setTimeout(() => setMsg(''), 3500);
  };
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllBookings();
      const data = res.data.bookings || res.data.data || [];
      setBookings(data);
    } catch (err: any) {
      showMsg(err?.response?.data?.message || 'Failed to load bookings. Check server connection.', 'error');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      await updateBookingStatus(id, status);
      setBookings(prev =>
        prev.map(b => b._id === id ? { ...b, bookingStatus: status } : b)
      );
      showMsg(`Booking ${status} successfully`);
    } catch (err: any) {
      showMsg(err?.response?.data?.message || 'Update failed. Make sure backend is running.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };
  if (!user || user.role !== 'admin') return null;

  const statusColor = (s: string) =>
    s === 'confirmed' ? '#27AE60'
    : s === 'cancelled' ? '#C0392B'
    : s === 'completed' ? '#2980B9'
    : '#C8862A';

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.bookingStatus === filter);
  const counts = {
    all:       bookings.length,
    pending:   bookings.filter(b => b.bookingStatus === 'pending').length,
    confirmed: bookings.filter(b => b.bookingStatus === 'confirmed').length,
    cancelled: bookings.filter(b => b.bookingStatus === 'cancelled').length,
    completed: bookings.filter(b => b.bookingStatus === 'completed').length,
  };
  return (
    <div style={{ paddingTop: 68, minHeight: '100vh', background: 'var(--ivory)' }}>

      <div style={{ background: 'var(--earth)', padding: '2.5rem 2rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', color: 'white' }}>
          <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            Admin Panel
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300 }}>
            SafarWise <em style={{ color: 'var(--amber)' }}>Dashboard</em>
          </h1>
          <p style={{ color: 'rgba(245,237,214,0.6)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Logged in as {user.name} (Admin)
          </p>
        </div>
      </div>
      <div style={{ background: 'white', borderBottom: '1px solid rgba(61,43,31,0.08)', padding: '0 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex' }}>
          {([
            { id: 'bookings', label: 'Booking Requests' },
            { id: 'stats',    label: 'Overview'         },
          ] as { id: AdminTab; label: string }[]).map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '1rem 1.5rem', fontSize: '0.83rem',
              fontWeight: tab === t.id ? 700 : 400,
              background: 'none', border: 'none', cursor: 'pointer',
              borderBottom: `2px solid ${tab === t.id ? 'var(--amber)' : 'transparent'}`,
              color: tab === t.id ? 'var(--amber)' : 'var(--earth-light)',
              marginBottom: -1, transition: 'all 0.2s',
            }}>
              {t.label}
              {t.id === 'bookings' && counts.pending > 0 && (
                <span style={{ marginLeft: '0.5rem', background: '#C0392B', color: 'white', borderRadius: 50, fontSize: '0.65rem', padding: '0.1rem 0.5rem', fontWeight: 700 }}>
                  {counts.pending}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '2rem auto', padding: '0 2rem 4rem' }}>
        {msg && (
          <div style={{
            background: msgType === 'success' ? 'rgba(39,174,96,0.1)' : 'rgba(192,57,43,0.1)',
            border: `1px solid ${msgType === 'success' ? 'rgba(39,174,96,0.25)' : 'rgba(192,57,43,0.25)'}`,
            borderRadius: 8, padding: '0.75rem 1rem',
            color: msgType === 'success' ? '#27AE60' : '#C0392B',
            fontSize: '0.83rem', marginBottom: '1.25rem',
          }}>
            {msg}
          </div>
        )}
        {tab === 'bookings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {(['all', 'pending', 'confirmed', 'cancelled', 'completed'] as StatusFilter[]).map(f => (
                  <button key={f} onClick={() => setFilter(f)} style={{
                    padding: '0.3rem 0.9rem', borderRadius: 50, fontSize: '0.72rem',
                    cursor: 'pointer', fontWeight: filter === f ? 700 : 400, textTransform: 'capitalize',
                    background: filter === f ? 'var(--earth)' : 'white',
                    color: filter === f ? 'white' : 'var(--earth-light)',
                    border: '1px solid rgba(61,43,31,0.15)', transition: 'all 0.2s',
                  }}>
                    {f} ({counts[f]})
                  </button>
                ))}
              </div>
              <button
                onClick={fetchBookings}
                disabled={loading}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  background: 'none', border: '1px solid rgba(61,43,31,0.15)',
                  borderRadius: 8, padding: '0.4rem 0.9rem', fontSize: '0.78rem',
                  cursor: loading ? 'not-allowed' : 'pointer', color: 'var(--earth-light)',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--earth-light)' }}>
                Loading bookings...
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--earth-light)' }}>
                No {filter !== 'all' ? filter : ''} bookings found.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filtered.map(b => (
                  <div key={b._id} style={{
                    background: 'white', borderRadius: 14, padding: '1.5rem',
                    boxShadow: '0 2px 16px var(--shadow)',
                    border: `1.5px solid ${statusColor(b.bookingStatus)}30`,
                    opacity: updatingId === b._id ? 0.6 : 1,
                    transition: 'opacity 0.2s',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)' }}>
                            {b.packageName || 'Package'}
                          </div>
                          <span style={{
                            padding: '0.15rem 0.7rem', borderRadius: 20, fontSize: '0.68rem', fontWeight: 700,
                            background: `${statusColor(b.bookingStatus)}20`,
                            color: statusColor(b.bookingStatus),
                            textTransform: 'uppercase',
                          }}>
                            {b.bookingStatus}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--earth-light)', display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                          <span>Ref: <strong style={{ fontFamily: 'monospace', color: 'var(--earth)' }}>{b.bookingReference}</strong></span>
                          <span>Date: <strong>{b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</strong></span>
                          <span>Travelers: <strong>{b.travelers}</strong></span>
                          <span>Total: <strong>PKR {b.totalPrice?.toLocaleString()}</strong></span>
                        </div>
                        {b.user && (
                          <div style={{ fontSize: '0.78rem', color: 'var(--earth-light)', display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                            <span>Customer: <strong style={{ color: 'var(--earth)' }}>{b.user.name}</strong></span>
                            <span>{b.user.email}</span>
                            {b.user.phone && (
                              <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
                                <a href={`tel:${b.user.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                  {b.user.phone}
                                </a>
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        {b.bookingStatus === 'pending' && (
                          <button
                            onClick={() => handleStatus(b._id, 'confirmed')}
                            disabled={updatingId === b._id}
                            style={{ background: '#27AE60', color: 'white', border: 'none', borderRadius: 8, padding: '0.5rem 1.1rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700, opacity: updatingId === b._id ? 0.6 : 1 }}
                          >
                            Confirm
                          </button>
                        )}
                        {b.bookingStatus === 'confirmed' && (
                          <button
                            onClick={() => handleStatus(b._id, 'completed')}
                            disabled={updatingId === b._id}
                            style={{ background: '#2980B9', color: 'white', border: 'none', borderRadius: 8, padding: '0.5rem 1.1rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700, opacity: updatingId === b._id ? 0.6 : 1 }}
                          >
                            Mark Complete
                          </button>
                        )}
                        {(b.bookingStatus === 'pending' || b.bookingStatus === 'confirmed') && (
                          <button
                            onClick={() => handleStatus(b._id, 'cancelled')}
                            disabled={updatingId === b._id}
                            style={{ background: '#C0392B', color: 'white', border: 'none', borderRadius: 8, padding: '0.5rem 1.1rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 700, opacity: updatingId === b._id ? 0.6 : 1 }}
                          >
                            Reject
                          </button>
                        )}
                        {updatingId === b._id && (
                          <span style={{ fontSize: '0.75rem', color: 'var(--earth-light)' }}>Updating...</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === 'stats' && (
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: 'var(--earth)', marginBottom: '1.5rem' }}>
              Overview
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
              {[
                { label: 'Total Bookings',  value: counts.all,       color: '#3D2B1F' },
                { label: 'Pending',         value: counts.pending,   color: '#C8862A' },
                { label: 'Confirmed',       value: counts.confirmed, color: '#27AE60' },
                { label: 'Completed',       value: counts.completed, color: '#2980B9' },
                { label: 'Cancelled',       value: counts.cancelled, color: '#C0392B' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'white', borderRadius: 14, padding: '1.5rem',
                  boxShadow: '0 2px 16px var(--shadow)', border: `1px solid ${s.color}25`,
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: s.color, fontWeight: 300 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--earth-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.25rem' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'white', borderRadius: 14, padding: '1.5rem', boxShadow: '0 2px 16px var(--shadow)' }}>
              <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)', marginBottom: '0.75rem' }}>
                Admin Guide
              </h4>
              <div style={{ fontSize: '0.83rem', color: 'var(--earth-light)', lineHeight: 2 }}>
                <div><strong style={{ color: 'var(--earth)' }}>Pending bookings</strong> customer submitted inquiry, waiting for your action. Click Confirm or Reject.</div>
                <div><strong style={{ color: 'var(--earth)' }}>Confirmed bookings</strong> you have approved, customer sees Confirmed status. Click Mark Complete after the tour.</div>
                <div><strong style={{ color: 'var(--earth)' }}>Red badge</strong> on Booking Requests tab number of pending bookings waiting for action.</div>
                <div><strong style={{ color: 'var(--earth)' }}>Customer phone number</strong>  click it directly to call the customer.</div>
                <div><strong style={{ color: 'var(--earth)' }}>Refresh button</strong>  manually reload bookings from the database.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}