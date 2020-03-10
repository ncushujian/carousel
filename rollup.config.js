import postcss from 'rollup-plugin-postcss';
import { terser } from "rollup-plugin-terser";
import url from 'postcss-url';

export default {
  entry: "./src/carousel.js",
  dest: "./dist/carousel.js",
  format: "es",
  plugins: [
    postcss({
      extensions: [".css"],
      plugins: [
        url({
          url: "inline"
        })
      ]
    }),
    terser()
  ]
};
