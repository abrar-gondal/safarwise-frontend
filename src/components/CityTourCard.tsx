import type { CityTour } from '../types';

interface CityTourCardProps {
  tour: CityTour;
  onView: () => void;
  onBook: () => void;
}
const USD_RATE = 279;
export default function CityTourCard({ tour, onView, onBook }: CityTourCardProps) {
  return (
    <div
      style={{
        background: 'white', borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 4px 20px var(--shadow)', border: '1px solid rgba(200,134,42,0.08)',
        transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer',
      }}
      onClick={onView}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px var(--shadow)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px var(--shadow)';
      }}
    >
      <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
        <img src={tour.image} alt={tour.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          loading="lazy"
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--amber)', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: 50 }}>
          {tour.duration}
        </div>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '0.68rem', padding: '0.25rem 0.65rem', borderRadius: 50 }}>
          {tour.difficulty}
        </div>
      </div>
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.25rem', color: 'var(--earth)', marginBottom: '0.5rem' }}>
          {tour.name}
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--earth-light)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {tour.desc}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.1rem' }}>
          {tour.highlights.slice(0, 3).map((h: string) => (
            <span key={h} style={{ fontSize: '0.68rem', background: 'var(--sand)', color: 'var(--earth)', padding: '0.2rem 0.6rem', borderRadius: 50 }}>{h}</span>
          ))}
          {tour.highlights.length > 3 && (
            <span style={{ fontSize: '0.68rem', background: 'rgba(200,134,42,0.1)', color: 'var(--amber)', padding: '0.2rem 0.6rem', borderRadius: 50 }}>
              +{tour.highlights.length - 3} more
            </span>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(61,43,31,0.08)', paddingTop: '1rem' }}>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.3rem', color: 'var(--earth)' }}>
              PKR {tour.price.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--earth-light)' }}>
              approx. ${Math.round(tour.price / USD_RATE)} USD per person
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn-ghost"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
              onClick={e => { e.stopPropagation(); onView(); }}
            >
              Details
            </button>
            <button
              className="btn-primary"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
              onClick={e => { e.stopPropagation(); onBook(); }}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}