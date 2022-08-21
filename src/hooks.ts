import { dev } from '$app/env';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (dev || !response.body) return response;

  //   if (response.headers['content-type'] === 'text/html')
  //     response.body = await minify(response.body, {
  //       collapseInlineTagWhitespace: true,
  //       collapseWhitespace: true,
  //       html5: true,
  //       keepClosingSlash: false,
  //       minifyCSS: true,
  //       minifyJS: true,
  //       noNewlinesBeforeTagClose: true,
  //       quoteCharacter: '"',
  //       removeComments: true,
  //     });

  return response;
};
