import { MessageCircle, Send, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-neutral-900 text-white mt-auto border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">UstazTilek</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {t('hero_subtitle')}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('anonymous_chat')}</h3>
            <div className="space-y-3">
              <a
                href="https://t.me/ustaztilek"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors"
              >
                <Send className="h-5 w-5" />
                <span className="text-sm">{t('telegram_channel')}</span>
              </a>
              <a
                href="https://wa.me/77001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact')}</h3>
            <a
              href="https://instagram.com/ustaztilek"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm">{t('instagram')}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © 2025 UstazTilek. {t('motivational_quote_2')}
          </p>
        </div>
      </div>
    </footer>
  );
}
