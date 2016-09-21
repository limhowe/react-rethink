// @flow
import { Router } from 'express';
import path from 'path';
import i18next from 'i18next';
import i18nextMiddleware, { LanguageDetector } from 'i18next-express-middleware';
import i18nBackend from 'i18next-node-fs-backend';

const whitelist = ['en', 'fr'];
const localisationDir = path.join(__dirname, '../../onesky-i18n');

const initialize = (resources: ?Object): Router => {
  const router = new Router();
  const instance = i18next.createInstance();
  instance
    .use(LanguageDetector)
    .use(i18nBackend)
    .init({
      saveMissing: false,
      whitelist,
      resources,
      fallbackLng: 'en',
      backend: {
        loadPath: `${localisationDir}/{{lng}}.json`
      },
      detection: {
        order: ['cookie', 'header'],
        lookupCookie: 'i18next',
        caches: ['cookie']
      }
    });

  router.use(i18nextMiddleware.handle(instance));
  router.get('/localisations', i18nextMiddleware.getResourcesHandler(
    instance
  ));

  return router;
};

export default initialize;
