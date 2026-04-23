import logoImg from '../assets/logo.png';
import { useState } from 'react';
import { useApp } from '../AppContext';
import { loginUser, registerUser } from '../api';

export default function LoginPage() {
  const { navigate, setUser } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async () => {
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    if (!isLogin && !name) {
      setError('Please enter your full name.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      let response;

      if (isLogin) {
        response = await loginUser({ email, password });
      } else {
        response = await registerUser({ name, email, password, phone });
      }
      const { token, user } = response.data;
      localStorage.setItem('safarwise_token', token);
      setUser({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        id: user.id,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        bookings: [],
        favorites: [],
      });
      setSuccess(isLogin ? 'Login successful! Redirecting...' : 'Account created! Redirecting...');
      setTimeout(() => navigate('profile'), 1000);
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '3rem', color: 'var(--sand)', fontWeight: 300 }}>
            Your next <em style={{ color: 'var(--amber)' }}>adventure</em><br />awaits.
          </div>
          <p style={{ color: 'rgba(245,237,214,0.65)', marginTop: '1rem' }}>
            Join thousands of travelers who trust SafarWise 🇵🇰
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {['K2 Base Camp Expeditions', 'Hunza Valley Blossom Tours', 'Lahore Heritage & Food Tours', 'Fairy Meadows Camping'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(245,237,214,0.7)', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--amber)' }}>✓</span> {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <div className="logo" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={logoImg} alt="SafarWise" style={{ height: 48, width: 48, objectFit: 'contain' }} />
            <span className="logo-text">Safar<span>Wise</span></span>
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={{ color: 'var(--earth-light)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            {isLogin ? 'Sign in to access your bookings and favorites.' : 'Join us and start exploring Pakistan.'}
          </p>
          {error && (
            <div style={{
              background: 'rgba(192,57,43,0.08)',
              border: '1px solid rgba(192,57,43,0.2)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              color: '#C0392B',
              fontSize: '0.82rem',
              marginBottom: '1rem',
            }}>
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div style={{
              background: 'rgba(39,174,96,0.08)',
              border: '1px solid rgba(39,174,96,0.2)',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              color: '#27AE60',
              fontSize: '0.82rem',
              marginBottom: '1rem',
            }}>
              ✅ {success}
            </div>
          )}
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                className="form-input"
                placeholder="Abrar Ahmed"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                placeholder="+92 300 0000000"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          )}
          <div className="form-group" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Password *</label>
              {isLogin && (
                <button
                  onClick={() => navigate('forgot-password')}
                  style={{ background: 'none', border: 'none', color: 'var(--amber)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 500 }}
                >
                  Forgot password?
                </button>
              )}
            </div>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submit()}
            />
          </div>
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            onClick={submit}
            disabled={loading}
          >
            {loading
              ? '⏳ Please wait...'
              : isLogin ? '🔐 Sign In' : '🚀 Create Account'
            }
          </button>
          <div className="auth-switch" style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--earth-light)' }}>
            {isLogin ? (
              <>Don't have an account?{' '}
                <button
                  onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                  style={{ color: 'var(--amber)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>Already have an account?{' '}
                <button
                  onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                  style={{ color: 'var(--amber)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}