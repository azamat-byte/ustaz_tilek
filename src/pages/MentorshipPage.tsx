import { useState, useEffect } from 'react';
import { UserPlus, Search } from 'lucide-react';
import { supabase, MentorshipApplication } from '../lib/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export default function MentorshipPage() {
  const [showForm, setShowForm] = useState(false);
  const [applicationType, setApplicationType] = useState<'mentor' | 'mentee'>('mentee');
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    experienceLevel: '',
    cityRegion: '',
  });
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState<MentorshipApplication[]>([]);
  const { language, t } = useLanguage();
  const { user, profile } = useAuth();

  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    try {
      const { data, error } = await supabase
        .from('mentorship_applications')
        .select('*')
        .eq('application_type', 'mentor')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMentors(data || []);
    } catch (error) {
      console.error('Error loading mentors:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('mentorship_applications').insert({
        user_id: user.id,
        full_name: formData.fullName,
        subject: formData.subject,
        experience_level: formData.experienceLevel,
        city_region: formData.cityRegion,
        application_type: applicationType,
        status: 'pending',
      });

      if (error) throw error;

      alert(
        language === 'kk'
          ? 'Өтінішіңіз сәтті жіберілді!'
          : 'Ваша заявка успешно отправлена!'
      );
      setShowForm(false);
      setFormData({ fullName: '', subject: '', experienceLevel: '', cityRegion: '' });
      if (applicationType === 'mentor') {
        loadMentors();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(
        language === 'kk'
          ? 'Қате орын алды. Қайталап көріңіз.'
          : 'Произошла ошибка. Попробуйте снова.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({ ...prev, fullName: profile.full_name }));
    }
  }, [profile]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('mentorship')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'kk'
              ? 'Тәжірибелі тәлімгерлермен байланысыңыз немесе басқаларға көмектесіңіз'
              : 'Найдите опытного наставника или помогите другим'}
          </p>
        </div>

        {!user ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">
              {language === 'kk'
                ? 'Тәлімгерлік бағдарламасына қатысу үшін кіріңіз'
                : 'Войдите, чтобы участвовать в программе наставничества'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-center space-x-4 mb-12">
              <button
                onClick={() => {
                  setApplicationType('mentee');
                  setShowForm(true);
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
              >
                <Search className="h-5 w-5" />
                <span className="font-medium">{t('find_mentor')}</span>
              </button>
              <button
                onClick={() => {
                  setApplicationType('mentor');
                  setShowForm(true);
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-md"
              >
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">{t('apply_mentor')}</span>
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-xl shadow-md p-8 mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {applicationType === 'mentor' ? t('apply_mentor') : t('find_mentor')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('full_name')}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('subject')}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('experience')}
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        setFormData({ ...formData, experienceLevel: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    >
                      <option value="">
                        {language === 'kk' ? 'Таңдаңыз' : 'Выберите'}
                      </option>
                      <option value="0-2">
                        {language === 'kk' ? '0-2 жыл' : '0-2 года'}
                      </option>
                      <option value="3-5">
                        {language === 'kk' ? '3-5 жыл' : '3-5 лет'}
                      </option>
                      <option value="6-10">
                        {language === 'kk' ? '6-10 жыл' : '6-10 лет'}
                      </option>
                      <option value="10+">
                        {language === 'kk' ? '10+ жыл' : '10+ лет'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('city_region')}
                    </label>
                    <input
                      type="text"
                      value={formData.cityRegion}
                      onChange={(e) =>
                        setFormData({ ...formData, cityRegion: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
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

            <div>
              <h2 className="text-xl font-bold text-neutral-900 mb-5">
                {language === 'kk' ? 'Қолжетімді тәлімгерлер' : 'Доступные наставники'}
              </h2>
              {mentors.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-8 text-center">
                  <p className="text-gray-600">
                    {language === 'kk'
                      ? 'Әзірге тәлімгерлер жоқ'
                      : 'Пока нет доступных наставников'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mentors.map((mentor) => (
                    <div
                      key={mentor.id}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {mentor.full_name}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">{t('subject')}:</span>{' '}
                        {mentor.subject}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">{t('experience')}:</span>{' '}
                        {mentor.experience_level}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">{t('city_region')}:</span>{' '}
                        {mentor.city_region}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
