import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      fr: {
        translation: {
            Geography: 'Géographie',
            History: 'Histoire',
            Sciences: 'Sciences',
            Literature: 'Littérature',
            Cinema: 'Cinéma',
            VideoGames: 'Jeux Vidéos',
            Music: 'Musique',
            VisualArts: 'Arts Visuels',
            Technology: 'Technologie',
            LivingBeings: 'Êtres Vivants',
            Mythology: 'Mythologie',
            Television: 'Télévision',
            Sport: 'Sport',
            Gastronomy: 'Gastronomie',
            Cartoons: 'Bande-Dessinée',
            Architecture: 'Architecture',
            Mangas: 'Mangas',
            Beginner: 'Débutant',
            Novice: 'Facile',
            Intermediate: 'Moyen',
            Difficult: 'Difficile',
            Expert: 'Expert',
            None: 'Indéfini',
            Prehistory: 'Préhistoire',
            Antiquity: 'Antiquité',
            MiddleAge: 'Moyen-Âge',
            Modern: 'Moderne',
            NineteenthCentury: '19ème siècle',
            TwentythCentury: '20ème siècle',
            TwentyFirstCentury: '21ème siècle'
          // here we will place our translations...
        }
      }
    }
  });

export default i18n;