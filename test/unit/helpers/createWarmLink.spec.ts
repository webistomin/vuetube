import { createWarmLink } from '@/helpers/createWarmLink';

describe('createWarmLink.ts', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('add preconnect link to the head of the document', () => {
    const LINK_URL = 'https://www.youtube.com';

    createWarmLink(LINK_URL, false);

    const link = document.head.querySelector(`link[href="${LINK_URL}"]`);
    const crossorigin = link?.getAttribute('crossorigin');

    expect(link).not.toBeNull();
    expect(crossorigin).toEqual(null);
  });

  it('add crossorigin attrubute to preconnected link', () => {
    const LINK_URL = 'https://www.youtube.com';

    createWarmLink(LINK_URL, true);

    const link = document.head.querySelector(`link[href="${LINK_URL}"]`);
    const crossorigin = link?.getAttribute('crossorigin');

    expect(link).not.toBeNull();
    expect(crossorigin).toEqual('');
  });
});
