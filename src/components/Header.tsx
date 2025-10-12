import { GraduationCap, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

type Page = 'home' | 'support' | 'mentorship' | 'forum' | 'about';

type HeaderProps = {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAuthClick: () => void;
};

export default function Header({ currentPage, onNavigate, onAuthClick }: HeaderProps) {
  const { user, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'kk' ? 'ru' : 'kk');
  };

  const navItems: { key: Page; label: string }[] = [
    { key: 'home', label: t('home') },
    { key: 'support', label: t('support') },
    { key: 'mentorship', label: t('mentorship') },
    { key: 'forum', label: t('forum') },
    { key: 'about', label: t('about') },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <GraduationCap className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">UstazTilek</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.key
                    ? 'text-emerald-600'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">{language.toUpperCase()}</span>
            </button>

            {user ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {t('signOut')}
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                {t('signIn')}
              </button>
            )}
          </div>
        </div>

        <nav className="md:hidden pb-4 flex space-x-4 overflow-x-auto">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`text-sm font-medium whitespace-nowrap transition-colors ${
                currentPage === item.key
                  ? 'text-emerald-600'
                  : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
