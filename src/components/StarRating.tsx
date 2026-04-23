interface StarRatingProps {
  rating: number;
  small?: boolean;
}
const Star = ({ filled, size }: { filled: boolean; size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#C8862A' : 'none'} stroke="#C8862A" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
export default function StarRating({ rating, small }: StarRatingProps) {
  const size = small ? 13 : 16;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} filled={i <= Math.round(rating)} size={size} />
      ))}
      {!small && <span style={{ fontSize: '0.8rem', color: 'var(--earth-light)', marginLeft: 4 }}>{rating.toFixed(1)}</span>}
    </div>
  );
}