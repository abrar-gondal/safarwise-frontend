import { useState } from 'react';
import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

const FAQS = [
  {
    category: 'Booking & Payments',
    items: [
      { q: 'How do I book a tour with SafarWise?', a: 'You can book directly through our website by browsing packages and clicking "Book Now", or contact our team via the Contact page for a custom itinerary. A 30% deposit is required to confirm your booking.' },
      { q: 'What payment methods do you accept?', a: 'We would contact you about payment options once you express interest in a tour.' },
      { q: 'Can I pay in installments?', a: 'Yes! We offer flexible installment plans for bookings made more than 60 days in advance. A 30% deposit secures your spot, with the remaining balance split over agreed milestones.' },
      { q: 'Is my booking confirmed immediately?', a: 'Once your deposit is received, you will get a confirmation email within 24 hours with your booking reference, itinerary details, and pre-departure information.' },
    ],
  },
  {
    category: 'Cancellations & Refunds',
    items: [
      { q: 'What is your cancellation policy?', a: 'Cancellations made 60+ days before departure receive a full refund minus a 10% admin fee. 30–59 days: 50% refund. 15–29 days: 25% refund. Less than 15 days: no refund. See our Booking Policy page for full details.' },
      { q: 'What if SafarWise cancels the tour?', a: 'In the rare event we cancel a tour due to safety concerns, natural disasters, or insufficient bookings, you will receive a full 100% refund or the option to rebook on an alternative date at no extra cost.' },
      { q: 'Can I reschedule my booking?', a: 'Yes, rescheduling is allowed up to 30 days before departure with no penalty. Within 30 days, a rescheduling fee of PKR 5,000 per person applies, subject to availability.' },
    ],
  },
  {
    category: 'Travel & Safety',
    items: [
      { q: 'Is it safe to travel in Northern Pakistan?', a: 'Yes Gilgit-Baltistan, Hunza, and Skardu are among the safest regions for tourists in Pakistan. Our guides are locally trained, and all routes are assessed for safety before every tour. We monitor government travel advisories continuously.' },
      { q: 'Do I need travel insurance?', a: 'Travel insurance is strongly recommended for all tours, and mandatory for trekking and mountaineering expeditions. We partner with leading insurers and can arrange comprehensive coverage for you. See our Travel Insurance page for details.' },
      { q: 'What should I pack for a northern Pakistan trek?', a: 'Essentials include: layered clothing, waterproof jacket, trekking boots, sunscreen (SPF 50+), sunglasses, a first-aid kit, water purification tablets, and a power bank. We provide a detailed packing list upon booking confirmation.' },
      { q: 'Are your guides certified?', a: 'All our trekking and mountaineering guides hold certifications from the Pakistan Alpine Club and have a minimum of 5 years field experience. Cultural tour guides are trained historians and local experts.' },
    ],
  },
  {
    category: 'Tours & Itineraries',
    items: [
      { q: 'Can I customize a tour itinerary?', a: 'Absolutely. All our packages can be fully customized duration, accommodation level, activities, group size, and pace. Contact our travel experts for a free consultation and tailor-made quote.' },
      { q: 'What is the minimum group size for a tour?', a: 'Most tours run with a minimum of 2 people. Private tours for solo travelers are available at a supplement. Corporate and large group tours (10+ people) receive special rates.' },
      { q: 'Are meals included in the packages?', a: 'Most packages include breakfast and dinner. Lunches during treks are typically packed meals. All dietary requirements (vegetarian, halal, gluten-free) can be accommodated with advance notice.' },
      { q: 'What accommodation is provided?', a: 'Accommodation ranges from luxury hotels and boutique guesthouses in cities, to comfortable camps and mountain lodges on treks. All accommodation is inspected by our team before being included in packages.' },
    ],
  },
  {
    category: 'Practical Information',
    items: [
      { q: 'Do I need a permit to trek in northern Pakistan?', a: 'Some areas require special permits including the Deosai National Park, certain restricted zones near the Chinese border, and high-altitude treks above 6,000m. We handle all permit applications on your behalf as part of your package.' },
      { q: 'What is the best time to visit Pakistan?', a: 'For northern Pakistan (Hunza, Skardu, K2): May to September. For Lahore and cultural tours: October to March. For coastal areas (Gwadar, Makran): November to February. For Fairy Meadows: June to September.' },
      { q: 'Is WiFi available on tours?', a: 'WiFi is available in city hotels and most guesthouses. In remote mountain areas, connectivity is limited or unavailable. We recommend downloading offline maps and purchasing a local SIM card (Jazz or Zong have the best northern coverage).' },
      { q: 'How do I contact SafarWise during a tour?', a: 'Your tour guide\'s direct number is provided before departure. Our 24/7 emergency helpline is always available. For non-urgent queries, you can reach us via email, or the chatbot on our website.' },
    ],
  },
];
export default function FAQsPage() {
  const { navigate } = useApp();
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key);
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Frequently Asked <em>Questions</em></h1>
        <p>Everything you need to know about traveling with SafarWise across Pakistan.</p>
      </div>
      <section style={{ background: 'var(--earth)', padding: '2rem 0' }}>
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(245,237,214,0.7)', fontSize: '0.9rem' }}>
            Can't find your answer? <span style={{ color: 'var(--amber)', cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('contact')}>Contact our team →</span>
          </p>
        </div>
      </section>
      <section className="section">
        <div className="section-inner">
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {FAQS.map((cat) => (
              <div key={cat.category}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ flex: 1, height: 1, background: 'rgba(200,134,42,0.2)' }} />
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: 'var(--earth)', whiteSpace: 'nowrap' }}>
                    {cat.category}
                  </h2>
                  <div style={{ flex: 1, height: 1, background: 'rgba(200,134,42,0.2)' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cat.items.map((item, j) => {
                    const key = `${cat.category}-${j}`;
                    const isOpen = openItem === key;
                    return (
                      <div
                        key={j}
                        style={{
                          background: 'white',
                          borderRadius: 12,
                          border: `1px solid ${isOpen ? 'var(--amber)' : 'rgba(200,134,42,0.12)'}`,
                          overflow: 'hidden',
                          boxShadow: isOpen ? '0 4px 20px var(--shadow)' : '0 2px 8px var(--shadow)',
                          transition: 'all 0.3s',
                        }}
                      >
                        <div
                          style={{ padding: '1.1rem 1.4rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
                          onClick={() => toggle(key)}
                        >
                          <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.05rem', color: 'var(--earth)', fontWeight: 600, lineHeight: 1.4 }}>
                            {item.q}
                          </span>
                          <span style={{ color: 'var(--amber)', fontSize: '1.2rem', flexShrink: 0, transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}>
                            +
                          </span>
                        </div>
                        {isOpen && (
                          <div style={{ padding: '0 1.4rem 1.2rem', borderTop: '1px solid rgba(200,134,42,0.1)' }}>
                            <p style={{ fontSize: '0.88rem', color: 'var(--earth-light)', lineHeight: 1.8, marginTop: '0.9rem' }}>
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="section-inner">
          <div className="promo-banner">
            <div className="promo-text">
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--amber)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Still have questions?</div>
              <h3>We're Here to <em>Help</em></h3>
              <p>Our travel experts are available 7 days a week to answer any questions about your Pakistan adventure.</p>
            </div>
            <div className="promo-actions">
              <button className="btn-primary" onClick={() => navigate('contact')}>Contact Us</button>
              <button className="btn-outline" onClick={() => navigate('chatbot')}>💬 Live Chat</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}