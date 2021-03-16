import { YOUTUBE_API_URL } from '@/utils/constants';

/**
 * Load youtube API
 * @link https://developers.google.com/youtube/iframe_api_reference
 */
function loadYoutubeAPI(): void {
  const script = document.createElement('script');
  script.src = YOUTUBE_API_URL;
  document.head.appendChild(script);
}

export { loadYoutubeAPI };
