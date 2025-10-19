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
    <div className="min-h-screen bg-neutral-50">
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16 px-4 border-b border-neutral-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
              {t('hero_title')}
            </h1>
            <p className="text-lg md:text-xl text-neutral-700 mb-6 max-w-3xl mx-auto">
              {t('hero_subtitle')}
            </p>
            <button
              onClick={handleCTAClick}
              className="px-6 py-2.5 bg-orange-500 text-white font-semibold text-base rounded-full hover:bg-orange-600 transition-all shadow-sm hover:shadow-md"
            >
              {t('hero_cta')}
            </button>
          </div>

          <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-neutral-200 shadow-sm">
            <p className="text-xl font-medium text-neutral-800 mb-2">
              {t('motivational_quote_1')}
            </p>
            <p className="text-base text-neutral-600">
              {t('motivational_quote_2')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
            {t('language') === 'kk' ? 'Біз не ұсынамыз' : 'Что мы предлагаем'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-4 group-hover:from-orange-200 group-hover:to-orange-300 transition-all">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('language') === 'kk'
              ? 'Бүгін қауымдастыққа қосылыңыз'
              : 'Присоединяйтесь к сообществу сегодня'}
          </h2>
          <p className="text-lg mb-8 text-neutral-300">
            {t('language') === 'kk'
              ? 'Мыңдаған мұғалімдер сізді қолдауға дайын'
              : 'Тысячи учителей готовы поддержать вас'}
          </p>
          <button
            onClick={handleCTAClick}
            className="px-6 py-2.5 bg-white text-neutral-900 font-semibold text-base rounded-full hover:bg-neutral-100 transition-all shadow-md"
          >
            {user ? t('hero_cta') : t('signUp')}
          </button>
        </div>
      </section>
    </div>
  );
}
