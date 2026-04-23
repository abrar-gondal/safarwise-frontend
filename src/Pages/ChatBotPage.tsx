import BackButton from '../components/BackButton';
import { ChatbotPanel } from '../components';

const QUICK_QUESTIONS = [
  'What tour packages do you have?',
  'How much does Hunza tour cost?',
  'Tell me about K2 Base Camp',
  'What is included in packages?',
  'How do I book a tour?',
  'Best time to visit Pakistan?',
];
export default function ChatbotPage() {
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Chat with <em>Safi</em></h1>
        <p>Your SafarWise AI travel assistant trained on Pakistan tourism data.</p>
      </div>

      <section className="section">
        <div className="section-inner" style={{ maxWidth: 750 }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--earth-light)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              Suggested questions
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {QUICK_QUESTIONS.map(q => (
                <span
                  key={q}
                  style={{
                    background: 'white', border: '1px solid rgba(200,134,42,0.2)',
                    borderRadius: 50, padding: '0.35rem 1rem', fontSize: '0.78rem',
                    cursor: 'default', color: 'var(--earth)', fontWeight: 400,
                    boxShadow: '0 1px 4px var(--shadow)',
                  }}
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
          <ChatbotPanel full />
          <div style={{
            marginTop: '1.25rem', textAlign: 'center', fontSize: '0.75rem',
            color: 'var(--earth-light)', lineHeight: 1.65,
          }}>
            Safi could not help? Contact us directly at{' '}
            <a href="tel:+923434106919" style={{ color: 'var(--amber)', fontWeight: 600, textDecoration: 'none' }}>
              +92 343 4106919
            </a>
            {' '}or{' '}
            <a
              href="https://wa.me/923434106919?text=Assalam%20o%20Alaikum!%20I%20need%20help%20with%20a%20SafarWise%20tour."
              target="_blank"
              rel="noreferrer"
              style={{ color: '#25D366', fontWeight: 600, textDecoration: 'none' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}