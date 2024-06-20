import i18next from 'i18next'
import i18nextMiddleware from 'i18next-http-middleware'

// Initialize i18next instance with configuration
export default i18next.use(i18nextMiddleware.LanguageDetector).init({
  resources: {
    en: { translation: require('../locales/en.json') },
    fr: { translation: require('../locales/fr.json') },
    // Add more languages as needed
  },
  fallbackLng: 'en', // Default language if translation not available
  //   debug: true, // Enable logging for debug
  interpolation: {
    escapeValue: false, // Do not escape values in translations
  },
  detection: {
    order: ['header'], // Order to detect language (from Accept-Language header)
    lookupHeader: 'accept-language',
    caches: false, // Disable caching for demo purpose
  },
})
