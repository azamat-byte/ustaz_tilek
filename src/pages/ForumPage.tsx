import { useState, useEffect } from 'react';
import { Plus, MessageSquare, ArrowUp, ArrowDown, MessageCircle } from 'lucide-react';
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
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border-b border-neutral-200 px-4 py-8 mb-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {t('forum')}
            </h1>
            <p className="text-base text-neutral-600">
              {language === 'kk'
                ? 'Өз тәжірибеңізді бөлісіңіз және басқалардан үйреніңіз'
                : 'Делитесь своим опытом и учитесь у других'}
            </p>
          </div>
        </div>

        <div className="px-4">
          {!user ? (
            <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center max-w-4xl mx-auto">
              <p className="text-neutral-600 text-base">
                {language === 'kk'
                  ? 'Форумға қатысу үшін кіріңіз'
                  : 'Войдите, чтобы участвовать в форуме'}
              </p>
            </div>
          ) : (
            <>
              {!showForm ? (
                <div className="max-w-4xl mx-auto mb-4">
                  <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center space-x-2 px-5 py-2 bg-white text-neutral-700 border border-neutral-300 rounded-full hover:bg-neutral-50 transition-all font-medium text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{t('new_post')}</span>
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-4 max-w-4xl mx-auto">
                  <h2 className="text-xl font-bold text-neutral-900 mb-5">
                    {t('new_post')}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder={t('post_title')}
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-base"
                      />
                    </div>

                    <div>
                      <textarea
                        placeholder={t('post_content')}
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        required
                        rows={6}
                        className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none text-base"
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
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-neutral-300 rounded"
                      />
                      <label
                        htmlFor="anonymous"
                        className="ml-2 text-sm text-neutral-700"
                      >
                        {t('post_anonymously')}
                      </label>
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-5 py-2 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-all disabled:opacity-50 text-sm"
                      >
                        {loading ? t('loading') : t('submit')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-5 py-2 bg-neutral-100 text-neutral-700 font-medium rounded-full hover:bg-neutral-200 transition-all text-sm"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="max-w-4xl mx-auto space-y-3">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="bg-white rounded-lg border border-neutral-200 p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600">
                      {language === 'kk'
                        ? 'Әзірше пост жоқ. Бірінші болыңыз!'
                        : 'Пока нет постов. Будьте первым!'}
                    </p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-lg border border-neutral-200 hover:border-neutral-300 transition-all"
                    >
                      <div className="flex">
                        <div className="flex flex-col items-center bg-neutral-50 px-3 py-4 rounded-l-lg border-r border-neutral-200">
                          <button className="p-1 hover:bg-neutral-200 rounded transition-colors">
                            <ArrowUp className="h-5 w-5 text-neutral-500" />
                          </button>
                          <span className="text-xs font-bold text-neutral-700 my-1">0</span>
                          <button className="p-1 hover:bg-neutral-200 rounded transition-colors">
                            <ArrowDown className="h-5 w-5 text-neutral-500" />
                          </button>
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-center text-xs text-neutral-500 mb-2 space-x-2">
                            <span className="font-medium">
                              {post.is_anonymous
                                ? language === 'kk'
                                  ? 'Анонимді'
                                  : 'Анонимно'
                                : language === 'kk'
                                ? 'Мұғалім'
                                : 'Учитель'}
                            </span>
                            <span>•</span>
                            <span>
                              {new Date(post.created_at).toLocaleDateString(
                                language === 'kk' ? 'kk-KZ' : 'ru-RU'
                              )}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-neutral-900 mb-2 hover:text-orange-600 cursor-pointer">
                            {post.title}
                          </h3>
                          <p className="text-sm text-neutral-700 leading-relaxed mb-3 whitespace-pre-wrap">
                            {post.content}
                          </p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1.5 text-xs text-neutral-500 hover:bg-neutral-100 px-2 py-1 rounded transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              <span className="font-medium">0 {language === 'kk' ? 'пікір' : 'комм.'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
