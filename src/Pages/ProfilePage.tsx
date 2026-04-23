import { useState, useEffect} from 'react';
import type{ JSX } from 'react';
import { useApp } from '../AppContext';
import { PACKAGES } from '../data';
import { PackageCard, ChatbotPanel } from '../components';
import { updateProfile, getMyBookings } from '../api';

type Tab = 'bookings' | 'favorites' | 'profile' | 'chat';
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const HeartNavIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const UserNavIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const ChatNavIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const LogoutIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const SaveIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>;

const NAV_ITEMS_USER: { id: Tab; icon: JSX.Element; label: string }[] = [
  { id: 'bookings',  icon: <CalendarIcon />, label: 'My Bookings'  },
  { id: 'favorites', icon: <HeartNavIcon />, label: 'Favorites'    },
  { id: 'profile',   icon: <UserNavIcon />,  label: 'Profile Info' },
  { id: 'chat',      icon: <ChatNavIcon />,  label: 'Chat History' },
];
const NAV_ITEMS_ADMIN: { id: Tab; icon: JSX.Element; label: string }[] = [
  { id: 'bookings',  icon: <CalendarIcon />, label: 'Bookings'     },
  { id: 'profile',   icon: <UserNavIcon />,  label: 'Profile Info' },
];
const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  return parts.length >= 2
    ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
    : parts[0][0].toUpperCase();
};
export default function ProfilePage() {
  const { user, setUser, navigate, setSelectedPkg, favorites, toggleFav } = useApp();
  const [tab, setTab] = useState<Tab>('bookings');

  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [saveErr, setSaveErr] = useState('');
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('sw_dismissed_bookings') || '[]'); } catch { return []; }
  });
  const [seenCancelledIds, setSeenCancelledIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('sw_seen_cancelled') || '[]'); } catch { return []; }
  });
  const isHidden = (b: any) => {
    if (dismissedIds.includes(b._id)) return true;
    if (b.bookingStatus === 'cancelled' && seenCancelledIds.includes(b._id)) return true;
    return false;
  };

  const markCancelledSeen = (id: string) => {
    if (!seenCancelledIds.includes(id)) {
      const updated = [...seenCancelledIds, id];
      setSeenCancelledIds(updated);
      localStorage.setItem('sw_seen_cancelled', JSON.stringify(updated));
    }
  };
  const dismissBooking = (id: string) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    localStorage.setItem('sw_dismissed_bookings', JSON.stringify(updated));
  };
  const fetchBookings = () => {
    if (!user) return;
    setBookingsLoading(true);
    getMyBookings()
      .then(res => {
        const data = res.data.bookings || res.data.data || res.data || [];
        setBookings(Array.isArray(data) ? data : []);
        setBookingsLoading(false);
      })
      .catch(err => {
        console.error('Bookings fetch error:', err?.response?.data || err.message);
        setBookings([]);
        setBookingsLoading(false);
      });
  };
  useEffect(() => {
    fetchBookings();
  }, [user]);

  if (!user) {
    navigate('login');
    return null;
  }
  const myFavorites = PACKAGES.filter(p => favorites.includes(p.id));
  const initials = getInitials(user.name);
  const handleSaveProfile = async () => {
    setSaving(true);
    setSaveMsg('');
    setSaveErr('');
    try {
      const res = await updateProfile({ name: editName, phone: editPhone });
      const updated = res.data.user;
      setUser({
        ...user,
        name: updated.name,
        phone: updated.phone,
      });
      setSaveMsg('Profile updated successfully.');
    } catch (err: any) {
      setSaveErr(err?.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };
  const handleSignOut = () => {
    localStorage.removeItem('safarwise_token');
    setUser(null);
    navigate('home');
  };
  return (
    <div style={{ paddingTop: 68 }}>
      <div style={{ background: 'var(--earth)', padding: '3rem 2rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', color: 'white' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 300 }}>
            My <em style={{ color: 'var(--amber)' }}>Dashboard</em>
          </h1>
        </div>
      </div>
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="section-inner">
          <div className="profile-layout">
            <div className="profile-sidebar">
              <div className="profile-avatar" style={{ background: 'var(--earth)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', fontWeight: 600, letterSpacing: 2 }}>
                {initials}
              </div>
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>

              {user.role === 'admin' && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.72rem', background: 'var(--amber)', color: 'white', borderRadius: 20, padding: '0.2rem 0.75rem', display: 'inline-block', marginBottom: '0.5rem' }}>
                    Admin
                  </div>
                  <button
                    onClick={() => navigate('admin')}
                    style={{ display: 'block', width: '100%', background: 'var(--earth)', color: 'var(--amber)', border: 'none', borderRadius: 8, padding: '0.5rem', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600, marginTop: '0.25rem' }}
                  >
                    Admin Panel
                  </button>
                </div>
              )}
              <div className="profile-nav">
                {(user?.role === 'admin' ? NAV_ITEMS_ADMIN : NAV_ITEMS_USER).map(n => (
                  <button
                    key={n.id}
                    className={`profile-nav-item${tab === n.id ? ' active' : ''}`}
                    onClick={() => setTab(n.id)}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>{n.icon}</span> {n.label}
                  </button>
                ))}
                <button
                  className="profile-nav-item"
                  onClick={handleSignOut}
                  style={{ color: '#C0392B', marginTop: '1rem' }}
                >
                  <span style={{ display: 'flex', alignItems: 'center' }}><LogoutIcon /></span> Sign Out
                </button>
              </div>
            </div>
            <div>
              {tab === 'bookings' && (
                <div className="profile-card">
                  <h3>My Bookings ({bookings.filter((b: any) => !isHidden(b)).length})</h3>
                  {bookingsLoading ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--earth-light)' }}>
                      <div style={{ marginBottom: '0.5rem' }}>Loading bookings...</div>
                      <div style={{ fontSize: '0.72rem' }}>Make sure backend is running on port 5000</div>
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="empty-state">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--earth-light)" strokeWidth="1" style={{ marginBottom: '1rem' }}>
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <p style={{ color: 'var(--earth-light)', marginBottom: '0.5rem' }}>No bookings yet.</p>
                      {user.role !== 'admin' && (
                        <button className="btn-primary" style={{ marginTop: '0.75rem' }} onClick={() => navigate('packages')}>
                          Browse Packages
                        </button>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {bookings.filter((b: any) => !isHidden(b)).map((b: any) => (
                        <div key={b._id} style={{ background: 'var(--sand)', borderRadius: 10, padding: '1.25rem', border: `1px solid ${b.bookingStatus === 'cancelled' ? 'rgba(192,57,43,0.25)' : 'rgba(200,134,42,0.15)'}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <div>
                              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: 'var(--earth)', marginBottom: '0.25rem' }}>
                                {b.packageName || 'Package'}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--earth-light)' }}>
                                Travel Date: {b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                              </div>
                              <div style={{ fontSize: '0.78rem', color: 'var(--earth-light)' }}>
                                Travelers: {b.travelers} | Ref: <span style={{ fontFamily: 'monospace' }}>{b.bookingReference}</span>
                              </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--earth)' }}>
                                PKR {b.totalPrice?.toLocaleString()}
                              </div>
                              <span style={{
                                display: 'inline-block', marginTop: '0.3rem',
                                padding: '0.2rem 0.75rem', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600,
                                background: b.bookingStatus === 'confirmed' ? 'rgba(39,174,96,0.1)' : b.bookingStatus === 'cancelled' ? 'rgba(192,57,43,0.1)' : b.bookingStatus === 'completed' ? 'rgba(41,128,185,0.1)' : 'rgba(200,134,42,0.1)',
                                color: b.bookingStatus === 'confirmed' ? '#27AE60' : b.bookingStatus === 'cancelled' ? '#C0392B' : b.bookingStatus === 'completed' ? '#2980B9' : '#C8862A',
                              }}>
                                {b.bookingStatus?.charAt(0).toUpperCase() + b.bookingStatus?.slice(1)}
                              </span>
                              {b.bookingStatus === 'cancelled' && (
                                <div style={{ marginTop: '0.4rem', fontSize: '0.7rem', color: 'var(--earth-light)', fontStyle: 'italic' }}>
                                  Will auto-hide on next visit
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {tab === 'favorites' && (
                <div className="profile-card">
                  <h3>Saved Packages ({myFavorites.length})</h3>
                  {myFavorites.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">❤️</div>
                      <p>No saved packages yet.</p>
                    </div>
                  ) : (
                    <div className="packages-grid">
                      {myFavorites.map(pkg => (
                        <PackageCard
                          key={pkg.id}
                          pkg={pkg}
                          onView={() => { setSelectedPkg(pkg); navigate('pkg-detail'); }}
                          onBook={() => { setSelectedPkg(pkg); navigate('pkg-detail'); }}
                          isFav={true}
                          onFav={() => toggleFav(pkg.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              {tab === 'profile' && (
                <div className="profile-card">
                  <h3>Profile Information</h3>
                  {saveMsg && (
                    <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', borderRadius: 8, padding: '0.75rem 1rem', color: '#27AE60', fontSize: '0.82rem', marginBottom: '1rem' }}>
                      {saveMsg}
                    </div>
                  )}
                  {saveErr && (
                    <div style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, padding: '0.75rem 1rem', color: '#C0392B', fontSize: '0.82rem', marginBottom: '1rem' }}>
                      {saveErr}
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input
                        className="form-input"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input
                        className="form-input"
                        value={user.email}
                        disabled
                        style={{ opacity: 0.6, cursor: 'not-allowed' }}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        className="form-input"
                        placeholder="+92 300 0000000"
                        value={editPhone}
                        onChange={e => setEditPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Role</label>
                      <input
                        className="form-input"
                        value={user.role || 'user'}
                        disabled
                        style={{ opacity: 0.6, cursor: 'not-allowed', textTransform: 'capitalize' }}
                      />
                    </div>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={handleSaveProfile}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
              {tab === 'chat' && (
                <div className="profile-card">
                  <h3>Chat with Safi</h3>
                  <p style={{ color: 'var(--earth-light)', marginBottom: '1.5rem' }}>
                    Ask our AI travel assistant anything about Pakistan travel.
                  </p>
                  <ChatbotPanel full />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}