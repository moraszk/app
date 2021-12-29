import { dev } from '$app/env';
import { minify } from 'html-minifier-terser';

// eslint-disable-next-line
export async function handle({ request, resolve }: any) {
  const response = await resolve(request);

  if (dev || !response.body) return response;

  if (response.headers['content-type'] === 'text/html')
    response.body = await minify(response.body, {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      html5: true,
      keepClosingSlash: false,
      minifyCSS: true,
      minifyJS: true,
      noNewlinesBeforeTagClose: true,
      quoteCharacter: '"',
      removeComments: true,
    });

  return response;
}
