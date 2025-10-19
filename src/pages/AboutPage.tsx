import { Heart, Target, Users, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function AboutPage() {
  const { language, t } = useLanguage();

  const values = [
    {
      icon: Heart,
      title: language === 'kk' ? 'Қамқорлық' : 'Забота',
      description:
        language === 'kk'
          ? 'Біз әрбір мұғалімнің эмоционалды әл-ауқатын маңызды деп санаймыз'
          : 'Мы ценим эмоциональное благополучие каждого учителя',
    },
    {
      icon: Users,
      title: language === 'kk' ? 'Қауымдастық' : 'Сообщество',
      description:
        language === 'kk'
          ? 'Бірге біз күштірек. Тәжірибе алмасу арқылы біз өсеміз'
          : 'Вместе мы сильнее. Обмениваясь опытом, мы растем',
    },
    {
      icon: Target,
      title: language === 'kk' ? 'Өсу' : 'Рост',
      description:
        language === 'kk'
          ? 'Біз мұғалімдердің кәсіби және жеке дамуына ықпал етеміз'
          : 'Мы способствуем профессиональному и личному развитию учителей',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            {t('about')}
          </h1>
          <p className="text-base text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {language === 'kk'
              ? 'UstazTilek - бұл мұғалімдер үшін қолдау, тәлімгерлік және қарым-қатынас платформасы'
              : 'UstazTilek - это платформа поддержки, наставничества и общения для учителей'}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-8 mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-5">
            {language === 'kk' ? 'Біздің миссия' : 'Наша миссия'}
          </h2>
          <p className="text-base text-neutral-700 leading-relaxed mb-4">
            {language === 'kk'
              ? 'Біздің миссиямыз - мұғалімдерге олардың кәсіби өміріндегі қиындықтарды жеңуге көмектесетін қауіпсіз және қолдаушы орта құру. Біз мұғалімдердің психологиялық денсаулығы мен кәсіби дамуының маңыздылығына сенеміз.'
              : 'Наша миссия - создать безопасное и поддерживающее пространство, которое помогает учителям преодолевать трудности в их профессиональной жизни. Мы верим в важность психологического здоровья и профессионального развития педагогов.'}
          </p>
          <p className="text-base text-neutral-700 leading-relaxed">
            {language === 'kk'
              ? 'Біз мұғалімдерге эмоционалды қолдау, тәлімгерлік және тәжірибе алмасу мүмкіндіктерін ұсынамыз. Біздің платформа арқылы мұғалімдер өздерін жалғыз емес екенін біліп, басқалардың қолдауын алады.'
              : 'Мы предлагаем учителям эмоциональную поддержку, наставничество и возможности для обмена опытом. Через нашу платформу учителя узнают, что они не одиноки, и получают поддержку от других.'}
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            {language === 'kk' ? 'Біздің құндылықтар' : 'Наши ценности'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-neutral-200 p-6 text-center hover:border-neutral-300 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-lg border border-neutral-700 p-8 text-white">
          <div className="flex items-center justify-center mb-6">
            <Mail className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            {t('contact')}
          </h2>
          <p className="text-base text-center mb-6 text-neutral-300">
            {language === 'kk'
              ? 'Серіктестік немесе сұрақтар үшін бізбен байланысыңыз'
              : 'Свяжитесь с нами для партнерства или вопросов'}
          </p>

          <div className="max-w-md mx-auto">
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={language === 'kk' ? 'Аты-жөні' : 'Имя'}
                  className="w-full px-4 py-2.5 rounded-lg text-neutral-900 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={t('email')}
                  className="w-full px-4 py-2.5 rounded-lg text-neutral-900 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder={language === 'kk' ? 'Хабарлама' : 'Сообщение'}
                  className="w-full px-4 py-2.5 rounded-lg text-neutral-900 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-all"
              >
                {t('submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
