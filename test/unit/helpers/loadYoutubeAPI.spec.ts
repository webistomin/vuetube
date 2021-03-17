import { loadYoutubeAPI } from '@/helpers/loadYoutubeAPI';
import { YOUTUBE_API_URL } from '@/utils/constants';

describe('loadYoutubeAPI.ts', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  it('add script tag to the head of the document', () => {
    const API_URL = YOUTUBE_API_URL;

    loadYoutubeAPI();

    const link = document.head.querySelector(`script[src="${API_URL}"]`);

    expect(link).not.toBeNull();
  });
});
