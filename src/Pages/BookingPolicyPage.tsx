import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

const SECTIONS = [
  {
    title: 'Booking & Confirmation',
    icon: '📋',
    content: [
      'All bookings are subject to availability and confirmed only upon receipt of the required deposit.',
      'A non-refundable deposit of 30% of the total tour cost is required to secure your booking.',
      'Full payment must be received no later than 30 days before the departure date.',
      'For bookings made within 30 days of departure, full payment is required immediately.',
      'A booking confirmation email with your itinerary and reference number will be sent within 24 hours of payment.',
      'SafarWise reserves the right to decline any booking at its discretion.',
    ],
  },
  {
    title: 'Cancellation by the Traveler',
    icon: '❌',
    content: [
      '60 or more days before departure: Full refund minus 10% administration fee.',
      '30-59 days before departure: 50% of total tour cost refunded.',
      '15-29 days before departure: 25% of total tour cost refunded.',
      'Less than 15 days before departure: No refund. Full amount forfeited.',
      'All cancellation requests must be submitted in writing via email to safarwise32@gmail.com.',
      'Refunds are processed within 7-14 business days via the original payment method.',
      'We strongly recommend purchasing travel insurance to protect against cancellation losses.',
    ],
  },
  {
    title: 'Cancellation by SafarWise',
    icon: '⚠️',
    content: [
      'SafarWise reserves the right to cancel any tour due to insufficient bookings, safety concerns, natural disasters, political instability, or force majeure events.',
      'In the event of cancellation by SafarWise, travelers will receive a full 100% refund of all amounts paid.',
      'Alternatively, travelers may choose to transfer the full amount to an alternative tour or future date.',
      'SafarWise is not liable for additional costs incurred by travelers such as flights, accommodation, or visa fees booked independently.',
      'We recommend booking refundable flights and accommodation where possible.',
    ],
  },
  {
    title: 'Changes & Amendments',
    icon: '✏️',
    content: [
      'Rescheduling requests made 30+ days before departure are accepted at no extra charge, subject to availability.',
      'Rescheduling within 30 days of departure incurs a fee of PKR 5,000 per person.',
      'Name changes on bookings are permitted up to 14 days before departure for a fee of PKR 2,000 per name.',
      'Itinerary amendments requested after confirmation may incur additional costs depending on the nature of the change.',
      'SafarWise reserves the right to alter itineraries due to weather, safety, road conditions, or other unforeseen circumstances without liability.',
    ],
  },
  {
    title: 'Pricing & Inclusions',
    icon: '💰',
    content: [
      'All prices are quoted in Pakistani Rupees (PKR) unless otherwise stated.',
      'Prices are per person based on shared accommodation unless specified as single occupancy.',
      'Package inclusions are clearly listed on each tour page. Any item not listed is considered excluded.',
      'SafarWise reserves the right to adjust prices due to fuel surcharges, government taxes, or currency fluctuations. Confirmed bookings are price-protected.',
      'Single supplement charges apply for travelers who require private room accommodation.',
      'Child discounts (ages 5-12) of up to 25% are available on selected tours. Children under 5 travel free (sharing with parents, no seat).',
    ],
  },
  {
    title: 'Traveler Responsibilities',
    icon: '🧑‍💼',
    content: [
      'Travelers are responsible for ensuring they hold a valid CNIC or passport for the duration of the tour.',
      'It is the traveler\'s responsibility to disclose any medical conditions, allergies, or physical limitations at the time of booking.',
      'Travelers must adhere to the SafarWise code of conduct, respect local cultures, and follow guide instructions at all times.',
      'SafarWise reserves the right to remove any traveler from a tour without refund if their behavior endangers others or disrupts the group.',
      'Travelers are responsible for their own travel insurance. Trekking packages require proof of adequate coverage.',
    ],
  },
];

export default function BookingPolicyPage() {
  const { navigate } = useApp();
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Booking <em>Policy</em></h1>
        <p>Please read our booking terms carefully before confirming your reservation with SafarWise.</p>
      </div>
      <div style={{ background: 'var(--sand)', padding: '1rem 0', textAlign: 'center' }}>
        <div className="section-inner">
          <p style={{ fontSize: '0.82rem', color: 'var(--earth-light)' }}>Last updated: January 2025 &nbsp;•&nbsp; Effective for all bookings made from 1st January 2026 onwards</p>
        </div>
      </div>
      <section className="section">
        <div className="section-inner">
          <div style={{ maxWidth: 820, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {SECTIONS.map((sec, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 16px var(--shadow)', border: '1px solid rgba(200,134,42,0.08)' }}>
                <div style={{ background: 'var(--earth)', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.4rem' }}>{sec.icon}</span>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: 'var(--ivory)', margin: 0 }}>{sec.title}</h3>
                </div>
                <div style={{ padding: '1.5rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {sec.content.map((line, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--amber)', fontWeight: 700, flexShrink: 0, marginTop: '0.1rem' }}>{j + 1}.</span>
                      <p style={{ fontSize: '0.875rem', color: 'var(--earth-light)', lineHeight: 1.75, margin: 0 }}>{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ background: 'var(--sand)', borderRadius: 14, padding: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--earth-light)', lineHeight: 1.7 }}>
                For questions about this policy, contact us at <strong>safarwise32@gmail.com</strong> or call <strong>+92 343 4106919</strong>.
                <br />
                <span style={{ color: 'var(--amber)', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('faqs')}>View our FAQs →</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}