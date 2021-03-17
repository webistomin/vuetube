import css from 'rollup-plugin-css-only';
import fs from 'fs';

const BUILD_FORMATS = [];

const CSS_CONFIG = {
  input: 'src/css.js',
  plugins: [
    css({
      output(styles) {
        // eslint-disable-next-line no-console
        console.log('Writing bundled CSS.');
        fs.writeFileSync('dist/vuetube.css', styles);
      },
    }),
  ],
  onwarn(warning) {
    if (warning.code !== 'EMPTY_BUNDLE') {
      // eslint-disable-next-line no-console
      console.error(warning.message);
    }
  },
};

BUILD_FORMATS.push(CSS_CONFIG);

export default BUILD_FORMATS;
