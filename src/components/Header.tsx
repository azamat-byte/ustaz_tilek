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
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-1.5 rounded-lg group-hover:shadow-md transition-all">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-lg font-bold text-neutral-900">UstazTilek</span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  currentPage === item.key
                    ? 'bg-neutral-100 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-sm text-neutral-600 hover:bg-neutral-50 rounded-full transition-all"
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">{language.toUpperCase()}</span>
            </button>

            {user ? (
              <button
                onClick={handleSignOut}
                className="px-4 py-1.5 text-sm font-medium text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-all"
              >
                {t('signOut')}
              </button>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-4 py-1.5 text-sm font-medium text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all"
              >
                {t('signIn')}
              </button>
            )}
          </div>
        </div>

        <nav className="md:hidden pb-3 pt-2 flex space-x-2 overflow-x-auto">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`px-3 py-1.5 text-sm font-medium whitespace-nowrap rounded-full transition-all ${
                currentPage === item.key
                  ? 'bg-neutral-100 text-neutral-900'
                  : 'text-neutral-600 hover:bg-neutral-50'
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
