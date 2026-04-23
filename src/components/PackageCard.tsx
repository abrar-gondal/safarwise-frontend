import type { Package } from '../types';
import StarRating from './StarRating';

interface PackageCardProps {
  pkg: Package;
  onView: () => void;
  onBook: () => void;
  isFav?: boolean;
  onFav?: () => void;
}
const USD_RATE = 279;
const toUSD = (pkr: number) => Math.round(pkr / USD_RATE);
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? 'var(--amber)' : 'none'} stroke={filled ? 'var(--amber)' : 'white'} strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
export default function PackageCard({ pkg, onView, onBook, isFav, onFav }: PackageCardProps) {
  return (
    <div className="pkg-card fade-in" onClick={onView}>
      <div className="pkg-img">
        <img src={pkg.image} alt={pkg.name} loading="lazy" />
        {pkg.featured && <div className="pkg-badge">Featured</div>}
        {pkg.originalPrice && (
          <div className="pkg-badge pkg-badge-sale" style={{ left: pkg.featured ? '6rem' : '1rem' }}>
            Sale
          </div>
        )}
        <button className="pkg-fav" onClick={e => { e.stopPropagation(); onFav?.(); }}>
          <HeartIcon filled={!!isFav} />
        </button>
      </div>
      <div className="pkg-body">
        <div className="pkg-tags">
          {pkg.tags.map(t => <span key={t} className="pkg-tag">{t}</span>)}
        </div>
        <div className="pkg-name">{pkg.name}</div>
        <div className="pkg-dest" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <PinIcon /> {pkg.destination}
        </div>
        <div className="pkg-meta">
          <span className="pkg-duration" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ClockIcon /> {pkg.duration}
          </span>
          <StarRating rating={pkg.rating} small />
        </div>
        <div className="pkg-footer">
          <div>
            {pkg.originalPrice && (
              <div className="pkg-price-old">PKR {pkg.originalPrice.toLocaleString()}</div>
            )}
            <div className="pkg-price">
              PKR {pkg.price.toLocaleString()} <span>/ person</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--earth-light)', marginTop: '0.2rem' }}>
              approx. ${toUSD(pkg.price).toLocaleString()} USD
            </div>
          </div>
          <button className="btn-primary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.8rem' }} onClick={e => { e.stopPropagation(); onBook(); }}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}