import { useState } from 'react';
import BackButton from '../components/BackButton';
import BlogCard from '../components/BlogCard';
import { useApp } from '../AppContext';
import { BLOGS } from '../data/blogs';

const CATEGORIES = ['All', 'Trekking', 'Travel Guide', 'Destinations', 'Road Trips', 'Wildlife', 'Travel Tips'];

export default function BlogPage() {
  const { navigate, setSelectedBlog } = useApp() as any;
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = BLOGS.filter(b => {
    const matchCat  = activeCategory === 'All' || b.category === activeCategory;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });
  const handleView = (blog: typeof BLOGS[0]) => {
    setSelectedBlog(blog);
    navigate('blog-detail');
  };
  const isDefault = activeCategory === 'All' && !search;
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>SafarWise <em>Blog</em></h1>
        <p>Stories, guides and travel inspiration from across Pakistan.</p>
      </div>
      <section style={{ background: 'var(--sand)', padding: '2rem 0' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setActiveCategory(c)} style={{
                  padding: '0.4rem 1rem', borderRadius: 50, fontSize: '0.78rem', cursor: 'pointer',
                  border: `1.5px solid ${activeCategory === c ? 'var(--amber)' : 'rgba(61,43,31,0.2)'}`,
                  background: activeCategory === c ? 'var(--amber)' : 'white',
                  color: activeCategory === c ? 'white' : 'var(--earth)',
                  fontWeight: activeCategory === c ? 600 : 400, transition: 'all 0.2s',
                }}>
                  {c}
                </button>
              ))}
            </div>
            <input className="form-input" placeholder="Search articles..." value={search}
              onChange={e => setSearch(e.target.value)} style={{ maxWidth: 240, margin: 0 }} />
          </div>
        </div>
      </section>
      {isDefault && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="section-inner">
            <BlogCard blog={BLOGS[0]} onView={() => handleView(BLOGS[0])} featured />
          </div>
        </section>
      )}
      <section className="section">
        <div className="section-inner">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--earth-light)' }}>
              No articles found. Try a different search or category.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.75rem' }}>
              {(isDefault ? filtered.slice(1) : filtered).map(blog => (
                <BlogCard key={blog.id} blog={blog} onView={() => handleView(blog)} />
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="section" style={{ background: 'var(--sand)' }}>
        <div className="section-inner" style={{ textAlign: 'center', maxWidth: 600 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '2rem', marginBottom: '0.75rem' }}>
            Ready to Explore <em style={{ color: 'var(--amber)' }}>Pakistan?</em>
          </h2>
          <p style={{ color: 'var(--earth-light)', marginBottom: '1.5rem' }}>
            Browse our curated packages and let our team plan your perfect adventure.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('packages')}>View All Packages</button>
            <button className="btn-ghost" onClick={() => navigate('contact')}>Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}