import { useEffect, useState } from 'react';
import { BookOpen, Video, Quote } from 'lucide-react';
import { supabase, SupportResource } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';

export default function SupportPage() {
  const [resources, setResources] = useState<SupportResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'article' | 'video' | 'quote'>('all');
  const { language, t } = useLanguage();

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const { data, error } = await supabase
        .from('support_resources')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = filter === 'all'
    ? resources
    : resources.filter(r => r.content_type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return BookOpen;
      case 'video':
        return Video;
      case 'quote':
        return Quote;
      default:
        return BookOpen;
    }
  };

  const getTitle = (resource: SupportResource) => {
    return language === 'kk' ? resource.title_kk : resource.title_ru;
  };

  const getDescription = (resource: SupportResource) => {
    return language === 'kk' ? resource.description_kk : resource.description_ru;
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border-b border-neutral-200 px-4 py-8 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            {t('support')}
          </h1>
          <p className="text-base text-neutral-600 max-w-3xl">
            {language === 'kk'
              ? 'Психологиялық денсаулықты қолдау және кәсіби өсу үшін ресурстар'
              : 'Ресурсы для поддержки психологического здоровья и профессионального роста'}
          </p>
        </div>

        <div className="flex px-4 mb-6 space-x-2 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all text-sm whitespace-nowrap ${
              filter === 'all'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            {language === 'kk' ? 'Барлығы' : 'Все'}
          </button>
          <button
            onClick={() => setFilter('article')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all text-sm whitespace-nowrap ${
              filter === 'article'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            {t('articles')}
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all text-sm whitespace-nowrap ${
              filter === 'video'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            {t('videos')}
          </button>
          <button
            onClick={() => setFilter('quote')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all text-sm whitespace-nowrap ${
              filter === 'quote'
                ? 'bg-neutral-900 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            {t('quotes')}
          </button>
        </div>

        <div className="px-4 pb-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              <p className="mt-4 text-neutral-600 text-sm">{t('loading')}</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
              <p className="text-neutral-600">
                {language === 'kk' ? 'Ресурстар жүктелуде...' : 'Ресурсы загружаются...'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResources.map((resource) => {
                const Icon = getIcon(resource.content_type);
                return (
                  <div
                    key={resource.id}
                    className="bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-orange-600" />
                        </div>
                        <h3 className="text-base font-semibold text-neutral-900 leading-tight">
                          {getTitle(resource)}
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                        {getDescription(resource)}
                      </p>
                      {resource.author && (
                        <p className="text-xs text-neutral-500 mb-3">
                          {language === 'kk' ? 'Автор' : 'Автор'}: {resource.author}
                        </p>
                      )}
                      {resource.content_url && (
                        <a
                          href={resource.content_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-1.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors text-xs font-medium"
                        >
                          {language === 'kk' ? 'Көбірек оқу' : 'Читать далее'}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
