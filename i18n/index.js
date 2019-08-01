//import { Localization } from 'expo'
import i18n from 'i18n-js'
import store from '../redux/store'

import es from './translations/es'
import en from './translations/en'
import pt from './translations/pt'

/**
 * Gets and verify the user language, if not supported returns English (en) by default
 * 
 * @returns {String} lang  
 */
export const getLanguage = () => {
  /* let lang = Localization.locale.substring(0, 2)
    , supportedLangs = ['es', 'en', 'pt'] */
  let lang = 'es'
    , supportedLangs = ['es', 'en', 'pt']

  lang = supportedLangs.filter(l => l === lang).length === 1
    ? lang
    : 'en'
  return lang
}

/**
* Returns a lang given a country code
*
* @param {*} countryCode
* @returns
*/
export const getLanguageByCountryCode = (countryCode = 'US') => {
  let countries = ['af-ZA', 'am-ET', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB',
    'ar-LY', 'ar-MA', 'ar-OM', 'ar-QA', 'ar-SA', 'ar-SY', 'ar-TN', 'ar-YE', 'az-Cyrl-AZ', 'az-Latn-AZ', 'be-BY', 'bg-BG',
    'bn-BD', 'bs-Cyrl-BA', 'bs-Latn-BA', 'cs-CZ', 'da-DK', 'de-AT', 'de-CH', 'de-DE', 'de-LI', 'de-LU', 'dv-MV', 'el-GR',
    'en-AU', 'en-BZ', 'en-CA', 'en-GB', 'en-IE', 'en-JM', 'en-MY', 'en-NZ', 'en-SG', 'en-TT', 'en-US', 'en-ZA', 'en-ZW',
    'es-AR', 'es-BO', 'es-CL', 'es-CO', 'es-CR', 'es-DO', 'es-EC', 'es-ES', 'es-GT', 'es-HN', 'es-MX', 'es-NI', 'es-PA',
    'es-PE', 'es-PR', 'es-PY', 'es-SV', 'es-US', 'es-UY', 'es-VE', 'et-EE', 'fa-IR', 'fi-FI', 'fil-PH', 'fo-FO', 'fr-BE',
    'fr-CA', 'fr-CH', 'fr-FR', 'fr-LU', 'fr-MC', 'he-IL', 'hi-IN', 'hr-BA', 'hr-HR', 'hu-HU', 'hy-AM', 'id-ID', 'ig-NG',
    'is-IS', 'it-CH', 'it-IT', 'ja-JP', 'ka-GE', 'kk-KZ', 'kl-GL', 'km-KH', 'ko-KR', 'ky-KG', 'lb-LU', 'lo-LA', 'lt-LT',
    'lv-LV', 'mi-NZ', 'mk-MK', 'mn-MN', 'ms-BN', 'ms-MY', 'mt-MT', 'nb-NO', 'ne-NP', 'nl-BE', 'nl-NL', 'pl-PL', 'prs-AF',
    'ps-AF', 'pt-BR', 'pt-PT', 'ro-RO', 'ru-RU', 'rw-RW', 'sv-SE', 'si-LK', 'sk-SK', 'sl-SI', 'sq-AL', 'sr-Cyrl-BA',
    'sr-Cyrl-CS', 'sr-Cyrl-ME', 'sr-Cyrl-RS', 'sr-Latn-BA', 'sr-Latn-CS', 'sr-Latn-ME', 'sr-Latn-RS', 'sw-KE', 'tg-Cyrl-TJ',
    'th-TH', 'tk-TM', 'tr-TR', 'uk-UA', 'ur-PK', 'uz-Cyrl-UZ', 'uz-Latn-UZ', 'vi-VN', 'wo-SN', 'yo-NG', 'zh-CN', 'zh-HK',
    'zh-MO', 'zh-SG', 'zh-TW']
  let country = countries.filter(country => country.search(countryCode) !== -1)
  return country.length !== 0 ? country[0].substring(0, 2) : 'en'
}

i18n.fallbacks = true
i18n.translations = { es, en, pt }
i18n.locale = store.getState().app.lang

export default i18n