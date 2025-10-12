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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('support')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'kk'
              ? 'Психологиялық денсаулықты қолдау және кәсіби өсу үшін ресурстар'
              : 'Ресурсы для поддержки психологического здоровья и профессионального роста'}
          </p>
        </div>

        <div className="flex justify-center mb-8 space-x-4 flex-wrap gap-y-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {language === 'kk' ? 'Барлығы' : 'Все'}
          </button>
          <button
            onClick={() => setFilter('article')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'article'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('articles')}
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'video'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('videos')}
          </button>
          <button
            onClick={() => setFilter('quote')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              filter === 'quote'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {t('quotes')}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-gray-600">{t('loading')}</p>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <p className="text-gray-600 text-lg">
              {language === 'kk' ? 'Ресурстар жүктелуде...' : 'Ресурсы загружаются...'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = getIcon(resource.content_type);
              return (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-emerald-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                        {getTitle(resource)}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {getDescription(resource)}
                    </p>
                    {resource.author && (
                      <p className="text-sm text-gray-500 mb-4">
                        {language === 'kk' ? 'Автор' : 'Автор'}: {resource.author}
                      </p>
                    )}
                    {resource.content_url && (
                      <a
                        href={resource.content_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
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
  );
}
