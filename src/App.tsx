import { globalStyles } from './styles';
import { AppProvider, useApp } from './AppContext';
import { Navbar, Footer, ChatbotPanel} from './components';
import {
  HomePage, PackagesPage, CityToursPage,
  ServicesPage, AboutPage, ContactPage, PackageDetailPage,
  LoginPage, ProfilePage, ChatBotPage, PaymentPage,
  ForgetpasswordPage, FAQsPage, TravelInsurancePage,
  BookingPolicyPage, PrivacyPolicyPage, BlogPage,
  BlogDetailPage, CityTourDetailPage, AdminPage,
} from './Pages';

function AppShell() {
  const { page, chatOpen, setChatOpen } = useApp();

  const showNav    = !['login', 'forgot-password'].includes(page);
  const showFooter = !['login', 'profile', 'chatbot', 'forgot-password'].includes(page);
  const showChat   = !['chatbot', 'profile', 'forgot-password'].includes(page);

  const renderPage = () => {
    switch (page) {
      case 'home':             return <HomePage />;
      case 'packages':         return <PackagesPage />;
      case 'city-tours':       return <CityToursPage />;
      case 'services':         return <ServicesPage />;
      case 'about':            return <AboutPage />;
      case 'contact':          return <ContactPage />;
      case 'chatbot':          return <ChatBotPage />;
      case 'pkg-detail':       return <PackageDetailPage />;
      case 'login':            return <LoginPage />;
      case 'profile':          return <ProfilePage />;
      case 'payment':          return <PaymentPage />;
      case 'forgot-password':  return <ForgetpasswordPage />;
      case 'faqs':             return <FAQsPage />;
      case 'travel-insurance': return <TravelInsurancePage />;
      case 'booking-policy':   return <BookingPolicyPage />;
      case 'privacy-policy':   return <PrivacyPolicyPage />;
      case 'blog':             return <BlogPage />;
      case 'blog-detail':     return <BlogDetailPage />;
      case 'city-tour-detail': return <CityTourDetailPage />;
      case 'admin':           return <AdminPage />;
      default:                 return <HomePage />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <style>{globalStyles}</style>
      {showNav && <Navbar />}
      <main style={{ flex: 1, width: '100%', display: 'block' }}>
        {renderPage()}
      </main>
      {showFooter && <Footer />}
      {showChat && (
        <>
          <button
            className="chatbot-float"
            onClick={() => setChatOpen(!chatOpen)}
            title="Chat with us"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          {chatOpen && <ChatbotPanel onClose={() => setChatOpen(false)} />}
        </>
      )}
      <a
        href="https://wa.me/923434106919?text=Assalam%20o%20Alaikum!%20I%20am%20interested%20in%20a%20SafarWise%20tour%20package.%20Can%20you%20help%20me%3F"
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        style={{
          position: 'fixed', bottom: '2.5rem', left: '1.5rem',
          width: 52, height: 52, borderRadius: '50%',
          background: '#25D366', color: 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          zIndex: 999, textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 32px rgba(37,211,102,0.5)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.4)';
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}