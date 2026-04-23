import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';
import type { Blog } from '../types';

export default function BlogDetailPage() {
  const { selectedBlog, navigate } = useApp() as any;
  const blog: Blog | null = selectedBlog;
  if (!blog) {
    navigate('blog');
    return null;
  }
  return (
    <div style={{ paddingTop: 68 }}>
      <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(30,16,8,0.85) 0%, rgba(30,16,8,0.3) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <BackButton />
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <span style={{ background: 'var(--amber)', color: 'white', fontSize: '0.72rem', padding: '0.25rem 0.8rem', borderRadius: 50, fontWeight: 600 }}>{blog.category}</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.72rem', padding: '0.25rem 0.8rem', borderRadius: 50 }}>{blog.readTime}</span>
              <span style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.72rem', padding: '0.25rem 0.8rem', borderRadius: 50 }}>{blog.date}</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2.5rem', color: 'white', fontWeight: 400, lineHeight: 1.25 }}>
              {blog.title}
            </h1>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '3rem 2rem 5rem', display: 'grid', gridTemplateColumns: '1fr 260px', gap: '3rem', alignItems: 'start' }}>
        <article>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', background: 'var(--sand)', borderRadius: 12, marginBottom: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--earth)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', fontWeight: 600, flexShrink: 0 }}>
              {blog.author.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--earth)', fontSize: '0.9rem' }}>{blog.author}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--earth-light)' }}>{blog.authorRole}</div>
            </div>
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--earth)', lineHeight: 1.9, marginBottom: '2rem', fontStyle: 'italic', borderLeft: '3px solid var(--amber)', paddingLeft: '1.25rem' }}>
            {blog.intro}
          </p>
          {blog.sections.map((s: { heading: string; content: string }, i: number) => (
            <div key={i} style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.5rem', color: 'var(--earth)', marginBottom: '0.75rem' }}>
                {s.heading}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--earth-light)', lineHeight: 1.85 }}>{s.content}</p>
            </div>
          ))}
          <div style={{ background: 'var(--sand)', borderRadius: 14, padding: '1.75rem', marginTop: '2rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.35rem', color: 'var(--earth)', marginBottom: '1rem' }}>
              Key Tips
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {blog.tips.map((tip: string, i: number) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--amber)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--earth-light)', lineHeight: 1.7, margin: 0 }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {blog.tags.map((t: string) => (
              <span key={t} style={{ background: 'rgba(200,134,42,0.1)', color: 'var(--amber)', fontSize: '0.75rem', padding: '0.3rem 0.85rem', borderRadius: 50, fontWeight: 500 }}>
                {t}
              </span>
            ))}
          </div>
        </article>
        <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ background: 'white', borderRadius: 14, padding: '1.5rem', boxShadow: '0 4px 20px var(--shadow)', border: '1px solid rgba(200,134,42,0.1)' }}>
            <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--earth)' }}>
              Plan This Trip
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--earth-light)', lineHeight: 1.65, marginBottom: '1rem' }}>
              Interested in visiting this destination? Browse our curated packages or contact our team for a custom itinerary.
            </p>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '0.6rem' }} onClick={() => navigate('packages')}>
              View Packages
            </button>
            <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }} onClick={() => navigate('contact')}>
              Contact Our Team
            </button>
          </div>
          <div style={{ background: 'var(--earth)', borderRadius: 14, padding: '1.5rem' }}>
            <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '1.1rem', color: 'var(--sand)', marginBottom: '0.75rem' }}>
              More Articles
            </h4>
            <button style={{ background: 'none', border: 'none', color: 'var(--amber)', cursor: 'pointer', fontSize: '0.82rem', padding: 0, textDecoration: 'underline' }} onClick={() => navigate('blog')}>
              Back to all articles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}