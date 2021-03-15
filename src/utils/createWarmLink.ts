type TWarmLinkKind = 'preconnect';

/**
 * Add preconnect links to the head of document
 * @link https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/
 */
function createWarmLink(kind: TWarmLinkKind, url: string, addCrossorigin?: boolean): void {
  const el = document.createElement('link');
  el.rel = kind;
  el.href = url;

  if (addCrossorigin) {
    el.crossOrigin = '';
  }

  document.head.append(el);
}

export { createWarmLink };
