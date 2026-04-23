import { useState } from 'react';
import { BackButton } from '../components';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
const CONTACT_ITEMS = [
  { icon: '📧', label: 'Email', value: 'safarwise32@gmail.com' },
  { icon: '📞', label: 'Phone', value: '+92 343 4106919' },
  { icon: '📍', label: 'Office', value: 'Lahore, Pakistan' },
  { icon: '🕐', label: 'Hours', value: 'Monday to Sunday, 9:00 AM - 8:00 PM PKT' },
];
const SOCIAL = [
  { name: 'Facebook',  url: 'https://facebook.com/safarwise',   svg: '🇫' },
  { name: 'Instagram', url: 'https://instagram.com/safarwise',  svg: '🇮' },
  { name: 'YouTube',   url: 'https://youtube.com/@safarwise',   svg: '🇾' },
];
const FAQ_QUICK = [
  { q: 'How quickly do you respond?', a: 'Within 24 hours on business days. For urgent travel needs, call us directly.' },
  { q: 'Can I request a custom itinerary?', a: 'Absolutely just select "Custom Tour" in the subject and describe your dream trip.' },
  { q: 'Do you offer group discounts?', a: 'Yes, groups of 6 or more receive special pricing. Mention your group size in your message.' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', subject: '', message: '' });

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));
  const submit = () => {
    if (form.name && form.email && form.message) setSent(true);
  };
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Get in <em>Touch</em></h1>
        <p>Our travel experts are ready to help you plan your perfect Pakistan adventure.</p>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="contact-grid">
            <div>
              <div className="section-tag">Contact Info</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', marginBottom: '0.5rem' }}>
                Let's Plan Your <em>Pakistan Adventure</em>
              </h2>
              <div className="divider" />
              <p style={{ color: 'var(--earth-light)', marginBottom: '2rem', lineHeight: 1.75, fontSize: '0.92rem' }}>
                Whether you want to trek to K2 Base Camp, explore the Walled City of Lahore, or simply find the perfect family getaway our team is here 7 days a week to make it happen.
              </p>
              {CONTACT_ITEMS.map(item => (
                <div key={item.label} className="contact-item">
                  <div className="contact-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{item.icon}</div>
                  <div>
                    <div className="contact-label">{item.label}</div>
                    <div className="contact-value">{item.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '1.5rem' }}>
                <div className="contact-label" style={{ marginBottom: '0.75rem' }}>Follow Us</div>
                <div className="social-links">
                  <a href="https://facebook.com/safarwise" target="_blank" rel="noreferrer" className="social-link" title="Facebook">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://instagram.com/safarwise" target="_blank" rel="noreferrer" className="social-link" title="Instagram">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="https://youtube.com/@safarwise" target="_blank" rel="noreferrer" className="social-link" title="YouTube">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                  </a>
                </div>
              </div>
              <div style={{
                marginTop: '2rem',
                background: 'var(--sand)',
                borderRadius: 14,
                padding: '1.25rem 1.4rem',
                border: '1px solid rgba(200,134,42,0.15)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>🇵🇰</span>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'var(--earth)' }}>
                    Based in Lahore, Pakistan
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--earth-light)', lineHeight: 1.7, margin: 0 }}>
                  SafarWise is a proudly Pakistani travel company. We operate tours across all four provinces from the Karakoram in the north to the Arabian Sea coast in the south.
                </p>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', color: 'var(--earth)', marginBottom: '0.85rem' }}>
                  Quick Answers
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {FAQ_QUICK.map((faq, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: 10, padding: '0.9rem 1.1rem', boxShadow: '0 2px 8px var(--shadow)' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--earth)', marginBottom: '0.25rem' }}>{faq.q}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--earth-light)', lineHeight: 1.6 }}>{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="contact-form">
              <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                Send Us a Message
              </h3>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Message Sent!
                  </h4>
                  <p style={{ color: 'var(--earth-light)', lineHeight: 1.7 }}>
                    Shukria for reaching out! Our team will get back to you within 24 hours. For urgent enquiries, call us at <strong>+92 343 4106919</strong>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" placeholder="e.g. Ali Hassan" value={form.name} onChange={update('name')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={update('email')} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input className="form-input" placeholder="+92 300 0000000" value={form.phone} onChange={update('phone')} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <select className="form-select form-input" value={form.subject} onChange={update('subject')}>
                        <option value="">Select topic...</option>
                        <option>Package Inquiry</option>
                        <option>Custom Tour Request</option>
                        <option>Booking Support</option>
                        <option>Group Travel</option>
                        <option>Travel Insurance</option>
                        <option>General Question</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      className="form-textarea"
                      placeholder="Tell us about your dream Pakistan trip destination, dates, group size, budget..."
                      value={form.message}
                      onChange={update('message')}
                    />
                  </div>
                  <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={submit}>
                    Send Message 📨
                  </button>
                  <p style={{ fontSize: '0.75rem', color: 'var(--earth-light)', textAlign: 'center', marginTop: '0.75rem' }}>
                    We respond within 24 hours · Your information is kept private
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}