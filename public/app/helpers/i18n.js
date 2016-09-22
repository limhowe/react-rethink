// @flow
import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import Promise from 'bluebird';
import Cookie from 'js-cookie';

const whitelist: Array<string> = ['en', 'fr'];
const fallbackLng = 'en';
const DEFAULT_NAMESPACE = 'translation';
const backend = {
  loadPath: `/localisations?lng={{lng}}&ns=${DEFAULT_NAMESPACE}`,
  allowMultiLoading: true,
  parse: (data: any): any => JSON.parse(data)
};

let i18nInstance;

export const getI18nInstance = () => {
  return i18nInstance;
};

export function initI18next(): Promise<any> {
  return new Promise((resolve: Function, reject: Function) => {
    i18nInstance = i18next
      .use(LanguageDetector)
      .use(XHR)
      .init({
        whitelist,
        fallbackLng,
        backend
      }, (err: ?mixed) => {
        if (err) {
          if (err instanceof Error) {
            reject(err);
          } else {
            reject(new Error('Loading i18next failed'));
          }
        } else {
          Cookie.set('i18next', i18next.language, {
            secure: window.location.protocol === 'https:'
          });
          i18nInstance = i18next;
          resolve(i18next);
        }
      });
  })
  .catch((err: ?mixed) => {
    console.log('Error occured', err);
  });
};

initI18next();

export default i18nInstance;
