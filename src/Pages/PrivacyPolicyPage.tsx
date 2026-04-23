import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

const SECTIONS = [
  {
    title: 'Information We Collect',
    icon: '📂',
    content: [
      { subtitle: 'Personal Information', text: 'When you book a tour or create an account, we collect your full name, CNIC/passport number, email address, phone number, date of birth, and emergency contact details.' },
      { subtitle: 'Payment Information', text: 'We collect payment details necessary to process your booking. Card details are processed through PCI-DSS compliant payment gateways. SafarWise does not store full card numbers on our servers.' },
      { subtitle: 'Health & Medical Information', text: 'For certain tours (particularly trekking and adventure), we may collect relevant medical information to ensure your safety. This data is handled with the highest level of confidentiality.' },
      { subtitle: 'Usage Data', text: 'We automatically collect information about how you interact with our website, including pages visited, time spent, device type, browser, and IP address, to improve our services.' },
    ],
  },
  {
    title: 'How We Use Your Information',
    icon: '🔍',
    content: [
      { subtitle: 'Tour Operations', text: 'Your personal information is used to process bookings, communicate itinerary details, arrange permits, and ensure your safety throughout your journey.' },
      { subtitle: 'Communication', text: 'We use your contact details to send booking confirmations, pre-departure information, travel updates, and respond to your enquiries.' },
      { subtitle: 'Marketing', text: 'With your consent, we may send promotional emails about new tours, special offers, and Pakistan travel inspiration. You can unsubscribe at any time.' },
      { subtitle: 'Legal Compliance', text: 'We may use your information to comply with legal obligations, including Pakistan Tourism Development Corporation (PTDC) requirements and law enforcement requests.' },
    ],
  },
  {
    title: 'How We Share Your Information',
    icon: '🤝',
    content: [
      { subtitle: 'Tour Partners', text: 'We share necessary information with our local guides, hotels, transport providers, and activity operators to deliver your booked services.' },
      { subtitle: 'Insurance Providers', text: 'If you purchase travel insurance through us, your details are shared with our insurance partners to issue your policy.' },
      { subtitle: 'Government Authorities', text: 'In some regions of Pakistan, visitor registration with local authorities is mandatory. We submit required information on your behalf.' },
      { subtitle: 'No Sale of Data', text: 'SafarWise does not sell, rent, or trade your personal information to third parties for marketing purposes under any circumstances.' },
    ],
  },
  {
    title: 'Data Security',
    icon: '🔒',
    content: [
      { subtitle: 'Encryption', text: 'All data transmitted between your browser and our servers is encrypted using SSL/TLS technology. Look for the padlock icon in your browser.' },
      { subtitle: 'Access Controls', text: 'Access to personal data is restricted to authorized SafarWise staff on a need-to-know basis. All staff are trained in data protection practices.' },
      { subtitle: 'Data Retention', text: 'We retain your personal data for 7 years following your last transaction, as required by Pakistani tax and business regulations, then securely delete it.' },
      { subtitle: 'Breach Notification', text: 'In the unlikely event of a data breach, affected users will be notified within 72 hours with details of the breach and steps taken to address it.' },
    ],
  },
  {
    title: 'Your Rights',
    icon: '✅',
    content: [
      { subtitle: 'Access', text: 'You have the right to request a copy of all personal data we hold about you. Submit requests to safarwise32@gmail.com.' },
      { subtitle: 'Correction', text: 'You may request correction of any inaccurate personal information we hold about you at any time.' },
      { subtitle: 'Deletion', text: 'You may request deletion of your personal data, subject to legal retention requirements. Note that deletion may affect our ability to provide services.' },
      { subtitle: 'Opt-Out', text: 'You can opt out of marketing communications at any time by clicking "unsubscribe" in any email or contacting us directly.' },
    ],
  },
  {
    title: 'Cookies Policy',
    icon: '🍪',
    content: [
      { subtitle: 'Essential Cookies', text: 'Required for the website to function properly enabling login, booking, and navigation. These cannot be disabled.' },
      { subtitle: 'Analytics Cookies', text: 'Used to understand how visitors use our site (page views, session duration). This data is aggregated and anonymous.' },
      { subtitle: 'Marketing Cookies', text: 'Used to show relevant advertisements on other platforms. You can disable these via your browser settings or our cookie consent panel.' },
      { subtitle: 'Managing Cookies', text: 'You can control and delete cookies through your browser settings. Disabling certain cookies may affect website functionality.' },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const { navigate } = useApp();
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Privacy <em>Policy</em></h1>
        <p>How SafarWise collects, uses, and protects your personal information.</p>
      </div>
      <div style={{ background: 'var(--sand)', padding: '1rem 0', textAlign: 'center' }}>
        <div className="section-inner">
          <p style={{ fontSize: '0.82rem', color: 'var(--earth-light)' }}>
            Last updated: January 2026 &nbsp;•&nbsp; This policy applies to all SafarWise services and platforms
          </p>
        </div>
      </div>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="section-inner">
          <div style={{ maxWidth: 820, margin: '0 auto', background: 'var(--earth)', borderRadius: 16, padding: '2rem', color: 'var(--ivory)' }}>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.85, color: 'rgba(245,237,214,0.8)' }}>
              SafarWise ("we", "our", "us") is committed to protecting your privacy. This policy explains what personal information we collect, why we collect it, how we use it, and your rights regarding your data. By using our services, you agree to the practices described in this policy.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {SECTIONS.map((sec, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px var(--shadow)', border: '1px solid rgba(200,134,42,0.08)' }}>
                <div style={{ background: 'var(--earth)', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{sec.icon}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: 'var(--ivory)', margin: 0 }}>{sec.title}</h3>
                </div>
                <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {sec.content.map((item, j) => (
                    <div key={j}>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1rem', color: 'var(--earth)', fontWeight: 600, marginBottom: '0.3rem' }}>{item.subtitle}</div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--earth-light)', lineHeight: 1.75, margin: 0 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ background: 'var(--sand)', borderRadius: 14, padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--earth-light)', lineHeight: 1.8 }}>
                For privacy-related requests, contact our Data Protection Officer at <strong>safarwise32@gmail.com</strong>
                <br />
                <span style={{ color: 'var(--amber)', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('contact')}>Contact Us →</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}