import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

type Language = 'kk' | 'ru';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  kk: {
    home: 'Басты бет',
    support: 'Психологиялық қолдау',
    mentorship: 'Тәлімгерлік бағдарламасы',
    forum: 'Қауымдастық форумы',
    about: 'Біз туралы',
    contact: 'Байланыс',
    signIn: 'Кіру',
    signUp: 'Тіркелу',
    signOut: 'Шығу',
    hero_title: 'UstazTilek',
    hero_subtitle: 'Мұғалімдер эмоционалды қолдау, тәлімгерлік алатын және тәжірибе алмасатын цифрлық кеңістік',
    hero_cta: 'Қолдау алу',
    motivational_quote_1: 'Сіз жалғыз емессіз',
    motivational_quote_2: 'Әрбір мұғалім қолдауға лайық',
    welcome_message: 'Қош келдіңіз',
    email: 'Электрондық пошта',
    password: 'Құпия сөз',
    full_name: 'Толық аты-жөні',
    submit: 'Жіберу',
    cancel: 'Болдырмау',
    loading: 'Жүктелуде...',
    anonymous_chat: 'Анонимді чат',
    telegram_channel: 'Telegram арнасы',
    instagram: 'Instagram',
    subject: 'Пән',
    experience: 'Тәжірибе деңгейі',
    city_region: 'Қала / аймақ',
    apply_mentor: 'Тәлімгер болуға өтініш беру',
    find_mentor: 'Тәлімгер табу',
    application_type: 'Өтініш түрі',
    mentor: 'Тәлімгер',
    mentee: 'Шәкірт',
    new_post: 'Жаңа пост',
    post_title: 'Тақырып',
    post_content: 'Мазмұны',
    post_anonymously: 'Анонимді түрде жариялау',
    resources: 'Ресурстар',
    articles: 'Мақалалар',
    videos: 'Видеолар',
    quotes: 'Дәйексөздер',
  },
  ru: {
    home: 'Главная',
    support: 'Психологическая поддержка',
    mentorship: 'Программа наставничества',
    forum: 'Форум сообщества',
    about: 'О нас',
    contact: 'Контакты',
    signIn: 'Войти',
    signUp: 'Регистрация',
    signOut: 'Выйти',
    hero_title: 'UstazTilek',
    hero_subtitle: 'Цифровое пространство, где учителя получают эмоциональную поддержку, наставничество и делятся опытом',
    hero_cta: 'Получить поддержку',
    motivational_quote_1: 'Вы не одиноки',
    motivational_quote_2: 'Каждый учитель заслуживает поддержки',
    welcome_message: 'Добро пожаловать',
    email: 'Электронная почта',
    password: 'Пароль',
    full_name: 'Полное имя',
    submit: 'Отправить',
    cancel: 'Отмена',
    loading: 'Загрузка...',
    anonymous_chat: 'Анонимный чат',
    telegram_channel: 'Telegram канал',
    instagram: 'Instagram',
    subject: 'Предмет',
    experience: 'Уровень опыта',
    city_region: 'Город / регион',
    apply_mentor: 'Стать наставником',
    find_mentor: 'Найти наставника',
    application_type: 'Тип заявки',
    mentor: 'Наставник',
    mentee: 'Подопечный',
    new_post: 'Новый пост',
    post_title: 'Заголовок',
    post_content: 'Содержание',
    post_anonymously: 'Опубликовать анонимно',
    resources: 'Ресурсы',
    articles: 'Статьи',
    videos: 'Видео',
    quotes: 'Цитаты',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { profile } = useAuth();
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    if (profile?.preferred_language) {
      setLanguageState(profile.preferred_language);
    }
  }, [profile]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
