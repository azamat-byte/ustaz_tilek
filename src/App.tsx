import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HomePage from './pages/HomePage';
import SupportPage from './pages/SupportPage';
import MentorshipPage from './pages/MentorshipPage';
import ForumPage from './pages/ForumPage';
import AboutPage from './pages/AboutPage';

type Page = 'home' | 'support' | 'mentorship' | 'forum' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onAuthClick={() => setShowAuthModal(true)} />;
      case 'support':
        return <SupportPage />;
      case 'mentorship':
        return <MentorshipPage />;
      case 'forum':
        return <ForumPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} onAuthClick={() => setShowAuthModal(true)} />;
    }
  };

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onAuthClick={() => setShowAuthModal(true)}
          />
          <main className="flex-1">
            {renderPage()}
          </main>
          <Footer />
          {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
