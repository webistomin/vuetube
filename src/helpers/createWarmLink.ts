/**
 * Add preconnect links to the head of the document
 * @link https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/
 */
function createWarmLink(url: string, addCrossorigin: boolean): void {
  const el = document.createElement('link');
  el.rel = 'preconnect';
  el.href = url;

  if (addCrossorigin) {
    el.crossOrigin = '';
  }

  document.head.appendChild(el);
}

export { createWarmLink };
