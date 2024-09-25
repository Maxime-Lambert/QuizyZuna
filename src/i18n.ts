import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'fr',
    resources: {
      fr: {
        translation: {
            Geography: 'Géographie',
            History: 'Histoire',
            Literature: 'Littérature',
            Cinema: 'Cinéma',
            VideoGames: 'Jeux Vidéos',
            VisualArts: 'Arts Visuels',
            PerformingArts: 'Arts de la Scène',
            Medias: 'Arts Médiatiques',
            Mythology: 'Mythologie',
            Sport: 'Sport',
            Gastronomy: 'Gastronomie',
            Cartoons: 'Bande-Dessinée',
            Mangas: 'Mangas',
            LifeSciences: 'Sciences de la Vie',
            EarthSciences: 'Sciences de la Terre',
            MatterSciences: 'Sciences de la Matière',
            FormalSciences: 'Sciences Formelles',
            Health: 'Santé',
            Beginner: 'Débutant',
            Novice: 'Facile',
            Intermediate: 'Moyen',
            Difficult: 'Difficile',
            Expert: 'Expert',
            None: 'Indéfini',
        }
      }
    }
  });

export default i18n;
