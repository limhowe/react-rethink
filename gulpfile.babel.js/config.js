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
  }
}
