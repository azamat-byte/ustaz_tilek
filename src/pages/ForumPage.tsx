import { useState, useEffect } from 'react';
import { Plus, MessageSquare } from 'lucide-react';
import { supabase, ForumPost } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isAnonymous: false,
  });
  const { language, t } = useLanguage();
  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('forum_posts').insert({
        user_id: user.id,
        title: formData.title,
        content: formData.content,
        is_anonymous: formData.isAnonymous,
        language: language,
      });

      if (error) throw error;

      setFormData({ title: '', content: '', isAnonymous: false });
      setShowForm(false);
      loadPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      alert(
        language === 'kk'
          ? 'Қате орын алды. Қайталап көріңіз.'
          : 'Произошла ошибка. Попробуйте снова.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('forum')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'kk'
              ? 'Өз тәжірибеңізді бөлісіңіз және басқалардан үйреніңіз'
              : 'Делитесь своим опытом и учитесь у других'}
          </p>
        </div>

        {!user ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">
              {language === 'kk'
                ? 'Форумға қатысу үшін кіріңіз'
                : 'Войдите, чтобы участвовать в форуме'}
            </p>
          </div>
        ) : (
          <>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md mb-8 mx-auto"
              >
                <Plus className="h-5 w-5" />
                <span className="font-medium">{t('new_post')}</span>
              </button>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('new_post')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('post_title')}
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('post_content')}
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onChange={(e) =>
                        setFormData({ ...formData, isAnonymous: e.target.checked })
                      }
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="anonymous"
                      className="ml-2 text-sm text-gray-700"
                    >
                      {t('post_anonymously')}
                    </label>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? t('loading') : t('submit')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      {t('cancel')}
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                </div>
              ) : posts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {language === 'kk'
                      ? 'Әзірше пост жоқ. Бірінші болыңыз!'
                      : 'Пока нет постов. Будьте первым!'}
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-wrap">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        {post.is_anonymous
                          ? language === 'kk'
                            ? 'Анонимді'
                            : 'Анонимно'
                          : language === 'kk'
                          ? 'Мұғалім'
                          : 'Учитель'}
                      </span>
                      <span>
                        {new Date(post.created_at).toLocaleDateString(
                          language === 'kk' ? 'kk-KZ' : 'ru-RU'
                        )}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
