import { useState } from 'react';
import { PACKAGES } from '../data';
import { PackageCard } from '../components';
import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

const TAGS = ['All', 'Safari', 'Culture', 'Beach', 'Adventure', 'Wellness'];
export default function PackagesPage() {
  const { navigate, setSelectedPkg, user, favorites, toggleFav } = useApp();
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('All');
  const [sort, setSort] = useState('featured');
  let filtered = PACKAGES.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase());
    const matchTag =
      tag === 'All' || p.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()));
    return matchSearch && matchTag;
  });
  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  return (
    <div>
      <div className="page-header" style={{ position: 'relative' }}>
        <BackButton />
        <h1>Our <em>Packages</em></h1>
        <p>From wildlife safaris to cultural odysseys find your perfect journey.</p>
      </div>
      <section className="section">
        <div className="section-inner">
          <div className="filter-bar">
            <input
              className="search-input"
              placeholder="🔍 Search destination or package..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {TAGS.map(t => (
              <button
                key={t}
                className={`filter-chip${tag === t ? ' active' : ''}`}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
            <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <p>No packages found. Try different filters.</p>
            </div>
          ) : (
            <div className="packages-grid">
              {filtered.map(pkg => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onView={() => { setSelectedPkg(pkg); navigate('pkg-detail'); }}
                  onBook={() => { setSelectedPkg(pkg); navigate(user ? 'pkg-detail' : 'login'); }}
                  isFav={favorites.includes(pkg.id)}
                  onFav={() => toggleFav(pkg.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}