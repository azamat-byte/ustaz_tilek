import { Heart, Users, MessageCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

type HomePageProps = {
  onNavigate: (page: string) => void;
  onAuthClick: () => void;
};

export default function HomePage({ onNavigate, onAuthClick }: HomePageProps) {
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleCTAClick = () => {
    if (user) {
      onNavigate('support');
    } else {
      onAuthClick();
    }
  };

  const features = [
    {
      icon: Heart,
      title: t('support'),
      description: t('language') === 'kk'
        ? 'Стрессті басқару, эмоционалды күйіп кету және мотивация туралы ресурстар'
        : 'Ресурсы о управлении стрессом, эмоциональном выгорании и мотивации',
    },
    {
      icon: Users,
      title: t('mentorship'),
      description: t('language') === 'kk'
        ? 'Тәжірибелі тәлімгерлермен байланысыңыз немесе өзіңіз тәлімгер болыңыз'
        : 'Подключитесь к опытным наставникам или станьте наставником сами',
    },
    {
      icon: MessageCircle,
      title: t('forum'),
      description: t('language') === 'kk'
        ? 'Қауымдастықпен тәжірибе алмасыңыз және кеңес беріңіз'
        : 'Делитесь опытом и советами с сообществом',
    },
    {
      icon: BookOpen,
      title: t('resources'),
      description: t('language') === 'kk'
        ? 'Мақалалар, видеолар және дәйексөздер кітапханасына қол жеткізіңіз'
        : 'Доступ к библиотеке статей, видео и цитат',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <button
            onClick={handleCTAClick}
            className="px-8 py-4 bg-emerald-600 text-white font-semibold text-lg rounded-lg hover:bg-emerald-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            {t('hero_cta')}
          </button>

          <div className="mt-12 space-y-4">
            <p className="text-2xl font-medium text-emerald-700">
              {t('motivational_quote_1')}
            </p>
            <p className="text-xl text-gray-600">
              {t('motivational_quote_2')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
            {t('language') === 'kk' ? 'Біз не ұсынамыз' : 'Что мы предлагаем'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-emerald-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <div className="w-14 h-14 bg-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('language') === 'kk'
              ? 'Бүгін қауымдастыққа қосылыңыз'
              : 'Присоединяйтесь к сообществу сегодня'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('language') === 'kk'
              ? 'Мыңдаған мұғалімдер сізді қолдауға дайын'
              : 'Тысячи учителей готовы поддержать вас'}
          </p>
          <button
            onClick={handleCTAClick}
            className="px-8 py-4 bg-white text-emerald-600 font-semibold text-lg rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg"
          >
            {user ? t('hero_cta') : t('signUp')}
          </button>
        </div>
      </section>
    </div>
  );
}
