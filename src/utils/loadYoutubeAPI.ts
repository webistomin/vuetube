/**
 * Load youtube API
 * @link https://developers.google.com/youtube/iframe_api_reference
 */
function loadYoutubeAPI(): void {
  const script = document.createElement('script');
  script.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(script);
}

export { loadYoutubeAPI };
