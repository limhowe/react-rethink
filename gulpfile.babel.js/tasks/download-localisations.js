import gulp from 'gulp';
import stream from 'stream';
import oneSky from 'onesky-utils';
import config from '../config';
import { File, log, colors } from 'gulp-util';
import Promise from 'bluebird';

const downloadLocalisations = (done) => {
  const { apiKey, secret, projectId, languagesToDownload, downloadLocation } = config.localisation;

  Promise.all(languagesToDownload.map(language =>
    oneSky.getFile({
      language,
      apiKey,
      projectId,
      secret,
      fileName: 'en.json'
    })
    .then(content => new Promise((res, rej) => {
      log(`Received JSON for language ${language}`);

      const src = stream.Readable({ objectMode: true });
      src._read = function() {
        this.push(new File({
          cwd: '',
          base: '',
          path: `${language}.json`,
          contents: new Buffer(content)
        }));
        this.push(null);
      };
      src.pipe(gulp.dest(downloadLocation))
        .on('end', res)
        .on('error', rej);
    }))
  ))
  .then(() => {
    log(`All languages (${languagesToDownload}) downloaded from onesky`);
    done();
  })
  .catch((error) => {
    log(colors.red('Error downloading translation files'), error);
    done();
  });
};

gulp.task('download-localisations', downloadLocalisations);
