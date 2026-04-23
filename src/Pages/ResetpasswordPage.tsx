import { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import axios from 'axios';

export default function ResetPasswordPage() {
  const { navigate } = useApp();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let t = params.get('token');
    let e = params.get('email');
    if (!t || !e) {
      const hashIndex = window.location.href.indexOf('?');
      if (hashIndex !== -1) {
        const queryString = window.location.href.substring(hashIndex + 1).replace('#reset-password', '');
        params = new URLSearchParams(queryString);
        t = params.get('token');
        e = params.get('email');
      }
    }
    if (t && e) {
      setToken(t);
      setEmail(decodeURIComponent(e));
    } else {
      setError('Invalid reset link. Please request a new one.');
    }
  }, []);
  const submit = async () => {
    setError('');
    setSuccess('');
    if (!password || !confirm) {
      setError('Please fill both fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        token,
        password,
      });
      setSuccess('✅ Password reset successfully!');
      setTimeout(() => navigate('login'), 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };
  const getStrength = (p: string) => {
    if (p.length === 0) return { label: '', color: 'transparent', width: '0%' };
    if (p.length < 6)   return { label: 'Too short', color: '#C0392B', width: '25%' };
    if (p.length < 8)   return { label: 'Weak', color: '#E67E22', width: '50%' };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Medium', color: '#F1C40F', width: '75%' };
    return { label: 'Strong', color: '#27AE60', width: '100%' };
  };
  const strength = getStrength(password);
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔑</div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: 'var(--sand)', fontWeight: 300 }}>
            Create a new <em style={{ color: 'var(--amber)' }}>password</em>
          </div>
          <p style={{ color: 'rgba(245,237,214,0.65)', marginTop: '1rem', lineHeight: 1.7 }}>
            Choose a strong password to keep your SafarWise account secure.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['At least 6 characters', 'Mix of letters and numbers', 'At least one uppercase letter'].map(tip => (
              <div key={tip} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(245,237,214,0.7)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--amber)' }}>✓</span> {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <div className="logo" style={{ marginBottom: '2rem' }}>
            <span className="logo-text">Safar<span>Wise</span></span>
          </div>

          <h2>Set New Password</h2>
          <p style={{ color: 'var(--earth-light)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
            Resetting password for <strong>{email}</strong>
          </p>
          {error && (
            <div style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, padding: '0.75rem 1rem', color: '#C0392B', fontSize: '0.82rem', marginBottom: '1rem' }}>
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div style={{ background: 'rgba(39,174,96,0.08)', border: '1px solid rgba(39,174,96,0.2)', borderRadius: 8, padding: '0.75rem 1rem', color: '#27AE60', fontSize: '0.82rem', marginBottom: '1rem' }}>
              {success} Redirecting to login...
            </div>
          )}
          {!success && (
            <>
              <div className="form-group">
                <label className="form-label">New Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="form-input"
                    type={show ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    onClick={() => setShow(!show)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                  >
                    {show ? '🙈' : '👁️'}
                  </button>
                </div>
                {password.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ height: 4, background: 'var(--sand)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s', borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: strength.color, marginTop: '0.25rem' }}>
                      {strength.label}
                    </div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    className="form-input"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && submit()}
                    style={{ paddingRight: '2.5rem' }}
                  />
                  <button
                    onClick={() => setShowConfirm(!showConfirm)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                  >
                    {showConfirm ? '🙈' : '👁️'}
                  </button>
                </div>
                {confirm.length > 0 && (
                  <div style={{ fontSize: '0.72rem', marginTop: '0.25rem', color: password === confirm ? '#27AE60' : '#C0392B' }}>
                    {password === confirm ? '✅ Passwords match' : '❌ Passwords do not match'}
                  </div>
                )}
              </div>
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={submit}
                disabled={loading}
              >
                {loading ? '⏳ Resetting...' : '🔐 Reset Password'}
              </button>
            </>
          )}
          <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--earth-light)' }}>
            <button
              onClick={() => navigate('forgot-password')}
              style={{ color: 'var(--amber)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >
              ← Request a new reset link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}