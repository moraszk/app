import adapter from '@sveltejs/adapter-static';
import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    scss: {
      prependData: `$br-md: 600px; $br-lg: 992px;`,
      outputStyle: 'compressed',
    },
    postcss: {
      plugins: [autoprefixer],
    },
  }),

  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
  },
};

export default config;
