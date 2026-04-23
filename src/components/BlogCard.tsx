import type { Blog } from '../types';

interface BlogCardProps {
  blog: Blog;
  onView: () => void;
  featured?: boolean;
}
export default function BlogCard({ blog, onView, featured }: BlogCardProps) {
  if (featured) {
    return (
      <div
        onClick={onView}
        style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0',
          background: 'white', borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 4px 24px var(--shadow)', border: '1px solid rgba(200,134,42,0.08)',
          cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px var(--shadow)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px var(--shadow)';
        }}
      >
        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 300 }} loading="lazy" />
        <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--amber)', color: 'white', fontSize: '0.7rem', padding: '0.2rem 0.75rem', borderRadius: 50, fontWeight: 600 }}>Featured</span>
            <span style={{ background: 'var(--sand)', color: 'var(--earth)', fontSize: '0.7rem', padding: '0.2rem 0.75rem', borderRadius: 50 }}>{blog.category}</span>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.75rem', color: 'var(--earth)', marginBottom: '1rem', lineHeight: 1.3 }}>
            {blog.title}
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--earth-light)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            {blog.desc}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--earth-light)', marginBottom: '1.5rem' }}>
            <span>{blog.date}</span>
            <span>{blog.readTime}</span>
            <span>By {blog.author}</span>
          </div>
          <button className="btn-primary" style={{ alignSelf: 'flex-start' }} onClick={onView}>
            Read Article
          </button>
        </div>
      </div>
    );
  }
  return (
    <div
      onClick={onView}
      style={{
        background: 'white', borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 4px 20px var(--shadow)', border: '1px solid rgba(200,134,42,0.08)',
        transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 40px var(--shadow)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px var(--shadow)';
      }}
    >
      <div style={{ height: 200, overflow: 'hidden' }}>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          loading="lazy"
        />
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ background: 'var(--sand)', color: 'var(--earth)', fontSize: '0.68rem', padding: '0.2rem 0.65rem', borderRadius: 50, fontWeight: 600 }}>
            {blog.category}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--earth-light)' }}>{blog.readTime}</span>
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.2rem', color: 'var(--earth)', marginBottom: '0.65rem', lineHeight: 1.35 }}>
          {blog.title}
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--earth-light)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {blog.desc.slice(0, 130)}...
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--earth-light)' }}>{blog.date}</span>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {blog.tags.slice(0, 2).map(t => (
              <span key={t} style={{ fontSize: '0.65rem', background: 'rgba(200,134,42,0.1)', color: 'var(--amber)', padding: '0.15rem 0.5rem', borderRadius: 50, fontWeight: 500 }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}