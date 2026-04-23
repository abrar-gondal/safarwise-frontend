import { useApp } from '../AppContext';

interface BackButtonProps {
  label?: string;
  style?: React.CSSProperties;
}
export default function BackButton({ label, style }: BackButtonProps) {
  const { goBack, page } = useApp();
  if (page === 'home') return null;
  return (
    <button
      onClick={goBack}
      style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.5rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 8,
        padding: '0.4rem 0.9rem',
        fontSize: '0.8rem',
        color: 'rgba(245,237,214,0.85)',
        cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        transition: 'all 0.2s',
        backdropFilter: 'blur(4px)',
        zIndex: 10,
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.22)';
        (e.currentTarget as HTMLButtonElement).style.color = 'white';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
        (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,237,214,0.85)';
      }}
    >
      ← {label || 'Back'}
    </button>
  );
}