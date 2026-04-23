export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --sand: #F5EDD6;
    --amber: #C8862A;
    --amber-deep: #9B6620;
    --earth: #3D2B1F;
    --earth-light: #6B4C3B;
    --ivory: #FAF7F0;
    --sage: #7A8C6E;
    --sage-light: #B5C4A8;
    --sky: #4A7FA5;
    --white: #FFFFFF;
    --shadow: rgba(61,43,31,0.12);
    --shadow-deep: rgba(61,43,31,0.24);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--ivory);
    color: var(--earth);
    line-height: 1.6;
    min-height: 100vh;
    width: 100%;
  }
   main { 
   width: 100%; 
   display: block; 
   }
   main > div { width: 100%; }

  h1,h2,h3,h4,h5 { font-family: 'Cormorant Garamond', serif; line-height: 1.2; }

  /* NAVBAR */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 68px;
    background: rgba(250,247,240,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(200,134,42,0.15);
    transition: all 0.3s;
  }
  .navbar.scrolled { background: var(--earth); border-bottom: 1px solid rgba(200,134,42,0.3); }
  .navbar.scrolled .nav-link { color: var(--sand) !important; }
  .navbar.scrolled .nav-link:hover { color: var(--amber) !important; }
  .navbar.scrolled .logo-text { color: var(--sand); }
  .navbar.scrolled .logo-icon { color: var(--amber); }
  .logo { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; text-decoration: none; }
  .logo-icon { font-size: 1.6rem; }
  .logo-text { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; color: var(--earth); letter-spacing: 0.02em; }
  .logo-text span { color: var(--amber); }
  .nav-links { display: flex; align-items: center; gap: 0.25rem; }
  .nav-link {
    font-size: 0.875rem; font-weight: 500; color: var(--earth-light); text-decoration: none;
    padding: 0.4rem 0.75rem; border-radius: 6px; transition: all 0.2s; cursor: pointer;
    background: none; border: none; font-family: 'DM Sans', sans-serif; letter-spacing: 0.01em;
  }
  .nav-link:hover { color: var(--amber); background: rgba(200,134,42,0.08); }
  .nav-link.active { color: var(--amber); }
  .btn-nav {
    background: var(--amber); color: white; border: none; border-radius: 8px;
    padding: 0.45rem 1.1rem; font-size: 0.875rem; font-weight: 500; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s; margin-left: 0.5rem;
  }
  .btn-nav:hover { background: var(--amber-deep); transform: translateY(-1px); }
  .hamburger { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; color: var(--earth); }

  /* HERO */
  .hero { min-height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; padding-top: 68px; width: 100%; }
  .hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #1a0f0a 0%, #2D1B10 40%, #1F2D1A 100%); }
  .hero-bg::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1800') center/cover; opacity: 0.35; mix-blend-mode: luminosity; }
  .hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(26,15,10,0.3) 0%, rgba(26,15,10,0.7) 100%); }
  .hero-content { position: relative; z-index: 1; text-align: center; padding: 2rem; max-width: 900px; }
  .hero-badge { display: inline-block; background: rgba(200,134,42,0.2); border: 1px solid rgba(200,134,42,0.4); color: var(--amber); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; padding: 0.35rem 1rem; border-radius: 100px; margin-bottom: 1.5rem; animation: fadeUp 0.6s ease both; }
  .hero-title { font-size: clamp(3rem, 7vw, 6rem); color: var(--sand); font-weight: 300; margin-bottom: 0.5rem; animation: fadeUp 0.6s 0.1s ease both; text-shadow: 0 2px 40px rgba(0,0,0,0.5); }
  .hero-title em { color: var(--amber); font-style: italic; }
  .hero-subtitle { font-size: 1.1rem; color: rgba(245,237,214,0.75); font-weight: 300; max-width: 520px; margin: 1.25rem auto 2.5rem; animation: fadeUp 0.6s 0.2s ease both; }
  .hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; animation: fadeUp 0.6s 0.3s ease both; }
  .hero-stats { display: flex; gap: 3rem; justify-content: center; margin-top: 4rem; animation: fadeUp 0.6s 0.4s ease both; flex-wrap: wrap; }
  .hero-stat { text-align: center; }
  .hero-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; color: var(--amber); font-weight: 300; }
  .hero-stat-label { font-size: 0.75rem; color: rgba(245,237,214,0.6); letter-spacing: 0.1em; text-transform: uppercase; }

  /* BUTTONS */
  .btn-primary { background: var(--amber); color: white; border: none; border-radius: 10px; padding: 0.8rem 1.8rem; font-size: 0.95rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s; letter-spacing: 0.01em; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; }
  .btn-primary:hover { background: var(--amber-deep); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(200,134,42,0.35); }
  .btn-outline { background: transparent; color: var(--sand); border: 1px solid rgba(245,237,214,0.4); border-radius: 10px; padding: 0.8rem 1.8rem; font-size: 0.95rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s; letter-spacing: 0.01em; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; }
  .btn-outline:hover { border-color: var(--amber); color: var(--amber); background: rgba(200,134,42,0.1); }
  .btn-secondary { background: var(--earth); color: var(--sand); border: none; border-radius: 10px; padding: 0.75rem 1.6rem; font-size: 0.9rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.25s; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; }
  .btn-secondary:hover { background: var(--earth-light); transform: translateY(-2px); }
  .btn-ghost { background: transparent; color: var(--earth-light); border: 1px solid rgba(61,43,31,0.2); border-radius: 10px; padding: 0.65rem 1.4rem; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .btn-ghost:hover { border-color: var(--amber); color: var(--amber); }

  /* SECTIONS */
  .section { padding: 6rem 2rem; width: 100%; }
  .section-inner { max-width: 1200px; margin: 0 auto; width: 100%; }
  .section-header { text-align: center; margin-bottom: 3.5rem; }
  .section-tag { display: inline-block; color: var(--amber); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .section-title { font-size: clamp(2rem, 4vw, 3rem); color: var(--earth); font-weight: 300; }
  .section-title em { color: var(--amber); font-style: italic; }
  .section-desc { color: var(--earth-light); font-size: 1rem; max-width: 500px; margin: 0.75rem auto 0; }

  /* PACKAGE CARDS */
  .packages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.75rem; }
  .pkg-card { background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px var(--shadow); transition: all 0.3s; cursor: pointer; border: 1px solid rgba(200,134,42,0.08); }
  .pkg-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px var(--shadow-deep); }
  .pkg-img { position: relative; height: 220px; overflow: hidden; }
  .pkg-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .pkg-card:hover .pkg-img img { transform: scale(1.06); }
  .pkg-badge { position: absolute; top: 1rem; left: 1rem; background: var(--amber); color: white; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.3rem 0.8rem; border-radius: 100px; }
  .pkg-badge-sale { background: #C0392B; }
  .pkg-fav { position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; transition: all 0.2s; }
  .pkg-fav:hover { transform: scale(1.15); }
  .pkg-body { padding: 1.5rem; }
  .pkg-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
  .pkg-tag { font-size: 0.7rem; font-weight: 500; color: var(--sage); letter-spacing: 0.05em; background: rgba(122,140,110,0.12); padding: 0.2rem 0.6rem; border-radius: 100px; }
  .pkg-name { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; color: var(--earth); margin-bottom: 0.35rem; }
  .pkg-dest { font-size: 0.8rem; color: var(--earth-light); display: flex; align-items: center; gap: 0.3rem; margin-bottom: 0.75rem; }
  .pkg-meta { display: flex; justify-content: space-between; align-items: center; }
  .pkg-duration { font-size: 0.8rem; color: var(--earth-light); display: flex; align-items: center; gap: 0.3rem; }
  .pkg-rating { font-size: 0.8rem; color: var(--amber); display: flex; align-items: center; gap: 0.25rem; }
  .pkg-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(61,43,31,0.08); }
  .pkg-price { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; color: var(--earth); font-weight: 600; }
  .pkg-price span { font-size: 0.75rem; color: var(--earth-light); font-family: 'DM Sans', sans-serif; font-weight: 400; }
  .pkg-price-old { text-decoration: line-through; color: var(--earth-light); font-size: 0.8rem; font-family: 'DM Sans', sans-serif; }

  /* DESTINATIONS */
  
  .destinations-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; align-items:center; }
  .dest-card { border-radius: 14px; overflow: hidden; position: relative; height: 280px; cursor: pointer; transition: all 0.3s; }
  .dest-card:hover { transform: scale(1.02); }
  .dest-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .dest-card:hover img { transform: scale(1.08); }
  .dest-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(21, 11, 6, 0.85) 0%, rgba(26,15,10,0.1) 60%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem; }
  .dest-country { font-size: 0.7rem; color: var(--amber); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.25rem; }
  .dest-name { font-family: 'Cormorant Garamond', serif; font-size: 1.75rem; color: white; font-weight: 300; margin-bottom: 0.35rem; }
  .dest-pkgs { font-size: 0.75rem; color: rgba(255,255,255,0.65); }
  .dest-meta { display: flex; gap: 1rem; margin-top: 0.75rem; }
  .dest-meta-item { font-size: 0.7rem; color: rgba(255,255,255,0.6); display: flex; align-items: center; gap: 0.25rem; }

  /* FILTER BAR */
  .filter-bar { display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 2rem; align-items: center; }
  .filter-chip { background: white; border: 1px solid rgba(61,43,31,0.15); border-radius: 100px; padding: 0.4rem 1rem; font-size: 0.8rem; font-weight: 500; cursor: pointer; transition: all 0.2s; color: var(--earth-light); font-family: 'DM Sans', sans-serif; }
  .filter-chip:hover, .filter-chip.active { background: var(--amber); color: white; border-color: var(--amber); }
  .filter-select { border: 1px solid rgba(61,43,31,0.15); border-radius: 100px; padding: 0.4rem 1rem; font-size: 0.8rem; font-family: 'DM Sans', sans-serif; color: var(--earth-light); background: white; cursor: pointer; outline: none; }
  .search-input { border: 1px solid rgba(61,43,31,0.15); border-radius: 100px; padding: 0.4rem 1rem; font-size: 0.8rem; font-family: 'DM Sans', sans-serif; color: var(--earth); background: white; outline: none; width: 220px; }
  .search-input:focus { border-color: var(--amber); }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
  .about-images { position: relative; height: 500px; }
  .about-img-main { width: 75%; height: 85%; object-fit: cover; border-radius: 16px; position: absolute; top: 0; left: 0; }
  .about-img-sec { width: 55%; height: 55%; object-fit: cover; border-radius: 12px; position: absolute; bottom: 0; right: 0; box-shadow: 0 8px 32px var(--shadow-deep); border: 4px solid white; }
  .about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
  .value-card { background: var(--sand); border-radius: 12px; padding: 1.25rem; }
  .value-icon { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .value-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; color: var(--earth); margin-bottom: 0.25rem; }
  .value-desc { font-size: 0.8rem; color: var(--earth-light); }
  .team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
  .team-card { text-align: center; }
  .team-avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem; border: 3px solid var(--sand); }
  .team-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; color: var(--earth); }
  .team-role { font-size: 0.75rem; color: var(--amber); letter-spacing: 0.1em; text-transform: uppercase; }
  .testimonials { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
  .testimonial-card { background: white; border-radius: 14px; padding: 1.75rem; box-shadow: 0 4px 20px var(--shadow); }
  .testimonial-stars { color: var(--amber); margin-bottom: 0.75rem; font-size: 0.9rem; }
  .testimonial-text { font-size: 0.9rem; color: var(--earth-light); font-style: italic; margin-bottom: 1.25rem; line-height: 1.7; }
  .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
  .testimonial-avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
  .testimonial-name { font-weight: 600; font-size: 0.875rem; color: var(--earth); }
  .testimonial-trip { font-size: 0.75rem; color: var(--earth-light); }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 4rem; align-items: start; }
  .contact-item { display: flex; gap: 1rem; margin-bottom: 1.75rem; align-items: flex-start; }
  .contact-icon { font-size: 1.3rem; width: 44px; height: 44px; background: var(--sand); border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .contact-label { font-size: 0.7rem; color: var(--amber); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600; margin-bottom: 0.2rem; }
  .contact-value { font-size: 0.9rem; color: var(--earth); }
  .contact-form { background: white; border-radius: 16px; padding: 2.5rem; box-shadow: 0 4px 24px var(--shadow); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { margin-bottom: 1.25rem; }
  .form-label { display: block; font-size: 0.8rem; font-weight: 500; color: var(--earth-light); margin-bottom: 0.4rem; }
  .form-input, .form-textarea, .form-select { width: 100%; border: 1.5px solid rgba(61,43,31,0.15); border-radius: 10px; padding: 0.7rem 1rem; font-size: 0.875rem; font-family: 'DM Sans', sans-serif; color: var(--earth); background: var(--ivory); outline: none; transition: border-color 0.2s; }
  .form-input:focus, .form-textarea:focus { border-color: var(--amber); }
  .form-textarea { resize: vertical; min-height: 120px; }
  .social-links { display: flex; gap: 0.75rem; margin-top: 2rem; }
  .social-link { width: 40px; height: 40px; border-radius: 10px; background: var(--earth); display: flex; align-items: center; justify-content: center; color: var(--sand); cursor: pointer; transition: all 0.2s; font-size: 1rem; text-decoration: none; }
  .social-link:hover { background: var(--amber); transform: translateY(-2px); }
  .map-embed { border-radius: 12px; overflow: hidden; height: 200px; margin-top: 2rem; background: var(--sand); display: flex; align-items: center; justify-content: center; color: var(--earth-light); font-size: 0.875rem; }

  /* AUTH */
  .auth-page { min-height: 100vh; display: flex; padding-top: 68px; }
  .auth-left { flex: 1; background: var(--earth); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
  .auth-left::before { content: ''; position: absolute; inset: 0; background: url('https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800') center/cover; opacity: 0.2; }
  .auth-right { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .auth-box { width: 100%; max-width: 420px; }
  .auth-box h2 { font-size: 2.25rem; margin-bottom: 0.5rem; }
  .auth-box p { color: var(--earth-light); margin-bottom: 2rem; }
  .auth-divider { display: flex; align-items: center; gap: 1rem; margin: 1.5rem 0; }
  .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: rgba(61,43,31,0.15); }
  .auth-divider span { font-size: 0.75rem; color: var(--earth-light); }
  .google-btn { width: 100%; background: white; border: 1.5px solid rgba(61,43,31,0.15); border-radius: 10px; padding: 0.75rem; font-size: 0.875rem; font-family: 'DM Sans', sans-serif; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.75rem; transition: all 0.2s; color: var(--earth); font-weight: 500; }
  .google-btn:hover { border-color: var(--amber); transform: translateY(-1px); }
  .auth-switch { text-align: center; margin-top: 1.5rem; font-size: 0.875rem; color: var(--earth-light); }
  .auth-switch button { background: none; border: none; color: var(--amber); cursor: pointer; font-weight: 500; }

  /* PROFILE */
  .profile-layout { display: grid; grid-template-columns: 260px 1fr; gap: 2rem; }
  .profile-sidebar { background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px var(--shadow); height: fit-content; }
  .profile-avatar { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin: 0 auto 1rem; display: block; border: 3px solid var(--amber); }
  .profile-name { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; text-align: center; }
  .profile-email { font-size: 0.8rem; color: var(--earth-light); text-align: center; margin-bottom: 1.5rem; }
  .profile-nav { display: flex; flex-direction: column; gap: 0.25rem; }
  .profile-nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.65rem 1rem; border-radius: 10px; cursor: pointer; font-size: 0.875rem; font-weight: 500; color: var(--earth-light); transition: all 0.2s; border: none; background: none; font-family: 'DM Sans', sans-serif; text-align: left; width: 100%; }
  .profile-nav-item:hover, .profile-nav-item.active { background: var(--sand); color: var(--amber); }
  .profile-card { background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px var(--shadow); margin-bottom: 1.5rem; }
  .profile-card h3 { font-size: 1.25rem; margin-bottom: 1.25rem; }
  .booking-item { display: flex; gap: 1rem; align-items: center; padding: 1rem 0; border-bottom: 1px solid rgba(61,43,31,0.08); }
  .booking-item:last-child { border-bottom: none; }
  .booking-img { width: 70px; height: 70px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
  .booking-status { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.7rem; font-weight: 600; }
  .status-confirmed { background: rgba(122,140,110,0.15); color: var(--sage); }
  .status-pending { background: rgba(200,134,42,0.15); color: var(--amber); }

  /* CHATBOT */
  .chatbot-float { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: var(--earth); color: white; border: none; border-radius: 50%; width: 58px; height: 58px; cursor: pointer; font-size: 1.5rem; box-shadow: 0 8px 32px rgba(61,43,31,0.35); transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
  .chatbot-float:hover { background: var(--amber); transform: scale(1.08); }
  .chatbot-window { position: fixed; bottom: 7rem; right: 2rem; z-index: 998; width: 360px; max-height: 520px; background: white; border-radius: 20px; box-shadow: 0 24px 80px rgba(61,43,31,0.25); display: flex; flex-direction: column; animation: slideUp 0.3s ease; overflow: hidden; }
  .chatbot-header { background: var(--earth); color: white; padding: 1rem 1.25rem; display: flex; align-items: center; gap: 0.75rem; }
  .chatbot-avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--amber); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
  .chatbot-header-info { flex: 1; }
  .chatbot-header-name { font-weight: 600; font-size: 0.9rem; }
  .chatbot-header-status { font-size: 0.7rem; color: rgba(255,255,255,0.65); }
  .chatbot-close { background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 1.1rem; }
  .chatbot-messages { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
  .chat-msg { max-width: 80%; }
  .chat-msg.user { align-self: flex-end; }
  .chat-msg.bot { align-self: flex-start; }
  .chat-bubble { padding: 0.65rem 1rem; border-radius: 14px; font-size: 0.85rem; line-height: 1.5; }
  .chat-msg.user .chat-bubble { background: var(--earth); color: white; border-bottom-right-radius: 4px; }
  .chat-msg.bot .chat-bubble { background: var(--sand); color: var(--earth); border-bottom-left-radius: 4px; }
  .chat-time { font-size: 0.65rem; color: var(--earth-light); margin-top: 0.25rem; text-align: right; }
  .chatbot-input { padding: 1rem; border-top: 1px solid rgba(61,43,31,0.1); display: flex; gap: 0.5rem; }
  .chatbot-input input { flex: 1; border: 1.5px solid rgba(61,43,31,0.15); border-radius: 100px; padding: 0.55rem 1rem; font-size: 0.85rem; outline: none; font-family: 'DM Sans', sans-serif; }
  .chatbot-input input:focus { border-color: var(--amber); }
  .chatbot-send { background: var(--amber); color: white; border: none; border-radius: 50%; width: 38px; height: 38px; cursor: pointer; font-size: 1rem; transition: all 0.2s; }
  .chatbot-send:hover { background: var(--amber-deep); }

  /* PACKAGE DETAIL */
  .pkg-detail-hero { height: 420px; position: relative; }
  .pkg-detail-hero img { width: 100%; height: 100%; object-fit: cover; }
  .pkg-detail-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(26,15,10,0.8) 0%, rgba(26,15,10,0.1) 100%); display: flex; align-items: flex-end; padding: 3rem; }
  .pkg-detail-layout { display: grid; grid-template-columns: 1fr 350px; gap: 2.5rem; padding: 2rem; max-width: 1200px; margin: 0 auto; }
  .booking-box { background: white; border-radius: 16px; padding: 1.75rem; box-shadow: 0 4px 24px var(--shadow); position: sticky; top: 88px; }
  .itinerary-day { padding: 1.25rem 0; border-bottom: 1px solid rgba(61,43,31,0.08); }
  .itinerary-day:last-child { border-bottom: none; }
  .day-num { font-size: 0.7rem; color: var(--amber); font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
  .day-title { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; margin: 0.2rem 0 0.5rem; }
  .day-activities { list-style: none; }
  .day-activities li { font-size: 0.85rem; color: var(--earth-light); padding: 0.2rem 0; padding-left: 1rem; position: relative; }
  .day-activities li::before { content: '→'; position: absolute; left: 0; color: var(--amber); }
  .includes-list, .excludes-list { list-style: none; }
  .includes-list li, .excludes-list li { font-size: 0.875rem; color: var(--earth-light); padding: 0.3rem 0; padding-left: 1.25rem; position: relative; }
  .includes-list li::before { content: '✓'; position: absolute; left: 0; color: var(--sage); font-weight: 600; }
  .excludes-list li::before { content: '✗'; position: absolute; left: 0; color: #C0392B; }

  /* PROMO BANNER */
  .promo-banner { background: linear-gradient(135deg, var(--earth) 0%, #2D1B10 100%); border-radius: 20px; padding: 3.5rem; display: flex; justify-content: space-between; align-items: center; gap: 2rem; flex-wrap: wrap; position: relative; overflow: hidden; margin: 4rem 0; }
  .promo-banner::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: rgba(200,134,42,0.15); border-radius: 50%; }
  .promo-banner::after { content: ''; position: absolute; bottom: -60px; left: 20%; width: 150px; height: 150px; background: rgba(200,134,42,0.08); border-radius: 50%; }
  .promo-text { position: relative; z-index: 1; }
  .promo-text h3 { font-family: 'Cormorant Garamond', serif; font-size: 2rem; color: white; font-weight: 300; }
  .promo-text h3 em { color: var(--amber); font-style: italic; }
  .promo-text p { color: rgba(245,237,214,0.7); font-size: 0.9rem; margin-top: 0.5rem; }
  .promo-actions { display: flex; gap: 1rem; position: relative; z-index: 1; flex-wrap: wrap; }

  /* FOOTER */
  .footer { background: var(--earth); color: var(--sand); padding: 4rem 2rem 2rem; }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; }
  .footer-brand p { font-size: 0.875rem; color: rgba(245,237,214,0.6); margin-top: 1rem; max-width: 280px; line-height: 1.7; }
  .footer-heading { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; margin-bottom: 1rem; color: var(--amber); }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
  .footer-links li { font-size: 0.85rem; color: rgba(245,237,214,0.65); cursor: pointer; transition: color 0.2s; }
  .footer-links li:hover { color: var(--amber); }
  .footer-bottom { border-top: 1px solid rgba(245,237,214,0.1); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .footer-bottom p { font-size: 0.8rem; color: rgba(245,237,214,0.4); }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

  .fade-in { animation: fadeUp 0.5s ease both; }

  /* DIVIDER */
  .divider { width: 60px; height: 2px; background: var(--amber); margin: 1rem 0 1.5rem; }
  .divider.center { margin: 1rem auto 1.5rem; }

  /* MISC */
  .page-header { background: var(--earth); color: white; padding: 6rem 2rem 4rem; text-align: center; width: 100%; }
  .page-header h1 { font-size: clamp(2.5rem, 5vw, 4rem); color: var(--sand); font-weight: 300; margin-bottom: 0.5rem; }
  .page-header h1 em { color: var(--amber); font-style: italic; }
  .page-header p { color: rgba(245,237,214,0.65); font-size: 1rem; }
  .rating-stars { color: var(--amber); }
  .tag-pill { background: var(--sand); color: var(--earth); padding: 0.35rem 0.85rem; border-radius: 100px; font-size: 0.75rem; font-weight: 500; display: inline-block; }
  .empty-state { text-align: center; padding: 4rem; color: var(--earth-light); }
  .empty-state .empty-icon { font-size: 3rem; margin-bottom: 1rem; }
  .notice { background: rgba(200,134,42,0.1); border: 1px solid rgba(200,134,42,0.3); border-radius: 10px; padding: 0.85rem 1.25rem; font-size: 0.85rem; color: var(--earth-light); margin-bottom: 1.25rem; }

  /* MOBILE */
  .mobile-menu { position: fixed; top: 68px; left: 0; right: 0; z-index: 999; background: var(--earth); padding: 1.5rem; display: flex; flex-direction: column; gap: 0.25rem; animation: slideDown 0.25s ease; }
  .mobile-menu .nav-link { color: var(--sand) !important; padding: 0.65rem 1rem; border-radius: 8px; }
  .mobile-menu .nav-link:hover { background: rgba(200,134,42,0.15); }

  @media (max-width: 900px) {
    .about-grid { grid-template-columns: 1fr; }
    .about-images { height: 300px; margin-bottom: 2rem; }
    .contact-grid { grid-template-columns: 1fr; }
    .pkg-detail-layout { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .profile-layout { grid-template-columns: 1fr; }
    .auth-left { display: none; }
    .form-row { grid-template-columns: 1fr; }
    .nav-links { display: none; }
    .hamburger { display: flex; }
  }

  @media (max-width: 600px) {
    .footer-grid { grid-template-columns: 1fr; }
    .hero-stats { gap: 2rem; }
    .packages-grid { grid-template-columns: 1fr; }
    .destinations-grid { grid-template-columns: 1fr; }
  }
`;