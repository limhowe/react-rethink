import path from 'path';

export const root = path.join(__dirname, '../');

export default {
  root,
  buildPath: `${root}.build`,
  server: {
    src: `${root}server/**/*.js`,
    dist: `${root}.build`,
    base: `${root}server/`
  },
  public: {
    src: `${root}public/**/*.js`,
    dist: `${root}.build/public`,
    bundlePath: `${root}.build/bundles`
  },
  localisation: {
    apiKey: 'zQF2nEakqhSLVp7pGcIuAN3svghS3oht',
    secret: 'dLJgDH8h6VgIuOGwEqfsYxeI2SmYwXgz',
    projectId: 179106,
    languagesToDownload: ['en', 'fr'],
    downloadLocation: `${root}onesky-i18n`
  }
}
