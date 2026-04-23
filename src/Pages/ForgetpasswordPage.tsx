import logoImg from '../assets/logo.png';
import { useState } from 'react';
import { useApp } from '../AppContext';
import axios from 'axios';

type Step = 'email' | 'otp' | 'newpassword' | 'success';
export default function ForgotPasswordPage() {
  const { navigate } = useApp();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  const sendOTP = async () => {
    setError('');
    if (!email) { setError('Please enter your email.'); return; }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setStep('otp');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setError('');
    if (otp.length !== 6) { setError('Please enter the 6-digit OTP.'); return; }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/verify-otp', { email, token: otp });
      setStep('newpassword');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Incorrect OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const resetPassword = async () => {
    setError('');
    if (!password || !confirm) { setError('Please fill both fields.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/reset-password', {
        email,
        token: otp,
        password,
      });
      setStep('success');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'OTP invalid or expired.');
      setStep('otp');
    } finally {
      setLoading(false);
    }
  };
  const getStrength = (p: string) => {
    if (!p) return { label: '', color: 'transparent', width: '0%' };
    if (p.length < 6) return { label: 'Too short', color: '#C0392B', width: '25%' };
    if (p.length < 8) return { label: 'Weak', color: '#E67E22', width: '50%' };
    if (!/[A-Z]/.test(p) || !/[0-9]/.test(p)) return { label: 'Medium', color: '#F1C40F', width: '75%' };
    return { label: 'Strong', color: '#27AE60', width: '100%' };
  };
  const strength = getStrength(password);
  const steps = ['Email', 'OTP', 'New Password'];
  const stepIndex = { email: 0, otp: 1, newpassword: 2, success: 3 };
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {''}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: 'var(--sand)', fontWeight: 300 }}>
            {step === 'email' && <>Forgot your <em style={{ color: 'var(--amber)' }}>password?</em></>}
            {step === 'otp' && <>Check your <em style={{ color: 'var(--amber)' }}>inbox</em></>}
            {step === 'newpassword' && <>Create new <em style={{ color: 'var(--amber)' }}>password</em></>}
            {step === 'success' && <>All <em style={{ color: 'var(--amber)' }}>done!</em></>}
          </div>
          <p style={{ color: 'rgba(245,237,214,0.65)', marginTop: '1rem', lineHeight: 1.7 }}>
            {step === 'email' && 'Enter your email and we\'ll send you a 6-digit OTP code.'}
            {step === 'otp' && `We sent a 6-digit code to ${email}. Check your inbox and spam folder.`}
            {step === 'newpassword' && 'Almost there! Choose a strong new password.'}
            {step === 'success' && 'Your password has been reset successfully!'}
          </p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-box">
          <div className="logo" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={logoImg} alt="SafarWise" style={{ height: 48, width: 48, objectFit: 'contain' }} />
            <span className="logo-text">Safar<span>Wise</span></span>
          </div>
          {step !== 'success' && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.75rem' }}>
              {steps.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: i <= stepIndex[step] ? 'var(--amber)' : 'var(--sand)',
                      color: i <= stepIndex[step] ? 'white' : 'var(--earth-light)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.72rem', fontWeight: 700, transition: 'all 0.3s',
                    }}>
                      {i < stepIndex[step] ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: i <= stepIndex[step] ? 'var(--earth)' : 'var(--earth-light)', fontWeight: i === stepIndex[step] ? 600 : 400 }}>
                      {s}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ flex: 1, height: 2, background: i < stepIndex[step] ? 'var(--amber)' : 'var(--sand)', margin: '0 0.5rem', transition: 'all 0.3s' }} />
                  )}
                </div>
              ))}
            </div>
          )}
          {error && (
            <div style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.2)', borderRadius: 8, padding: '0.75rem 1rem', color: '#C0392B', fontSize: '0.82rem', marginBottom: '1rem' }}>
              ⚠️ {error}
            </div>
          )}
          {step === 'email' && (
            <>
              <h2 style={{ marginBottom: '0.5rem' }}>Reset Password</h2>
              <p style={{ color: 'var(--earth-light)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Enter your registered email address.
              </p>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendOTP()}
                />
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={sendOTP} disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP Code'}
              </button>
            </>
          )}
          {step === 'otp' && (
            <>
              <h2 style={{ marginBottom: '0.5rem' }}>Enter OTP</h2>
              <p style={{ color: 'var(--earth-light)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Enter the 6-digit code sent to <strong>{email}</strong>
              </p>
              <div className="form-group">
                <label className="form-label">6-Digit OTP Code *</label>
                <input
                  className="form-input"
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={e => e.key === 'Enter' && verifyOTP()}
                  style={{ fontSize: '1.5rem', letterSpacing: '0.5rem', textAlign: 'center', fontWeight: 700 }}
                />
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={verifyOTP}>
                ✓ Verify OTP
              </button>
              <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--earth-light)' }}>
                Didn't receive it?{' '}
                <button onClick={sendOTP} style={{ color: 'var(--amber)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                  Resend OTP
                </button>
              </div>
            </>
          )}
          {step === 'newpassword' && (
            <>
              <h2 style={{ marginBottom: '0.5rem' }}>New Password</h2>
              <p style={{ color: 'var(--earth-light)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                Choose a strong password for your account.
              </p>
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
                  <button onClick={() => setShow(!show)} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {show ? '🙈' : '👁️'}
                  </button>
                </div>
                {password.length > 0 && (
                  <div style={{ marginTop: '0.4rem' }}>
                    <div style={{ height: 4, background: 'var(--sand)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s', borderRadius: 4 }} />
                    </div>
                    <div style={{ fontSize: '0.72rem', color: strength.color, marginTop: '0.2rem' }}>{strength.label}</div>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && resetPassword()}
                />
                {confirm.length > 0 && (
                  <div style={{ fontSize: '0.72rem', marginTop: '0.25rem', color: password === confirm ? '#27AE60' : '#C0392B' }}>
                    {password === confirm ? '✅ Passwords match' : '❌ Passwords do not match'}
                  </div>
                )}
              </div>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={resetPassword} disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </>
          )}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
              <h2>Password Reset!</h2>
              <p style={{ color: 'var(--earth-light)', fontSize: '0.88rem', margin: '0.75rem 0 1.5rem', lineHeight: 1.7 }}>
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('login')}>
                🔐 Go to Sign In
              </button>
            </div>
          )}
          {step === 'email' && (
            <div style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--earth-light)' }}>
              Remember your password?{' '}
              <button onClick={() => navigate('login')} style={{ color: 'var(--amber)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}