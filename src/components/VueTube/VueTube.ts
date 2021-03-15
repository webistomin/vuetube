import Vue, { PropType, VNode } from 'vue';
import { createWarmLink } from '@/utils/createWarmLink';
import { getStringifiedParams } from '@/utils/getStringifiedParams';
import { loadYoutubeAPI } from '@/utils/loadYoutubeAPI';
import { TImageLoading } from '@/types/image-loading';
import { TThumbnailResolution } from '@/types/thumbnail-resolution';

declare global {
  interface Window {
    YT: YT.Player;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default /* #__PURE__ */ Vue.extend({
  name: 'VueTube',

  props: {
    /**
     * ID of YouTube video
     */
    videoId: {
      type: String as PropType<string>,
      required: true,
    },
    /**
     * Aspect ratio for iframe
     */
    ratio: {
      type: Number as PropType<number>,
      default: 16 / 9,
    },
    /**
     * Change video host to www.youtube.com
     * By default video loaded from https://www.youtube-nocookie.com
     */
    enableCookies: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * Parameters that are available in the YouTube embedded player.
     * @link https://developers.google.com/youtube/player_parameters#Parameters
     */
    playerParameters: {
      type: Object as PropType<YT.PlayerVars>,
      default: () => ({ enablejsapi: 1 }),
    },
    /**
     * Disable warming up connections to origins that are in the critical path
     */
    disableWarming: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * Disable webp thumbnail
     */
    disableWebp: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * Alt attribute for image
     */
    imageAlt: {
      type: String as PropType<string>,
      default: '',
    },
    /**
     * Loading attribute for image
     */
    imageLoading: {
      type: String as PropType<TImageLoading>,
      default: 'lazy',
      validator: (value) => ['lazy', 'eager', 'auto'].indexOf(value) !== -1,
    },
    /**
     * Thumbnail from YouTube API
     * @link https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
     */
    resolution: {
      type: String as PropType<TThumbnailResolution>,
      default: 'sddefault',
      validator: (value) => ['maxresdefault', 'sddefault', 'hqdefault'].indexOf(value) !== -1,
    },
    /**
     * Aria-label attribute for button
     */
    buttonLabel: {
      type: String as PropType<string>,
      default: 'Play video',
    },
    /**
     * Title attribute for iframe
     */
    iframeTitle: {
      type: String as PropType<string>,
      default: undefined,
    },
    /**
     * Allow attribute for iframe
     */
    iframeAllow: {
      type: String as PropType<string>,
      default: 'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture',
    },
  },

  data(): {
    isConnectionWarmed: boolean;
    isPlayed: boolean;
    isLoaded: boolean;
    player: YT.Player | null
  } {
    return {
      /**
       * Is preconnect links already appended to the head
       */
      isConnectionWarmed: false,
      /**
       * Is video played
       */
      isPlayed: false,
      /**
       * Is video loaded
       */
      isLoaded: false,
      /**
       * Player instance
       */
      player: null,
    };
  },

  computed: {
    /**
     * Calculated video host
     */
    host(): string {
      const { enableCookies } = this;

      return enableCookies ? 'https://www.youtube.com' : 'https://www.youtube-nocookie.com';
    },
    /**
     * Calculate iframe url with params
     */
    iframeUrl(): string {
      const { playerParameters, host, videoId } = this;
      const DEFAULT_PARAMS: YT.PlayerVars = {
        autoplay: 1,
      };
      const concatParams = Object.assign(
        {},
        DEFAULT_PARAMS,
        playerParameters,
      );

      const serialisedParams = getStringifiedParams(concatParams);

      return `${host}/embed/${videoId}${serialisedParams}`;
    },
    /**
     * Wrapper component
     */
    boxComponent(): VNode {
      const {
        $createElement,
        ratio,
        isPlayed,
        iframeComponent,
        thumbnailComponent,
        playBtnComponent,
        warmConnections,
      } = this;

      const BOX_COMPONENT = $createElement(
        'div',
        {
          on: {
            '~pointerover': warmConnections,
          },
          class: [
            'vuetube',
            {
              'vuetube--played': isPlayed,
            },
          ],
          style: {
            '--vuetube-aspect-ratio': ratio,
          },
        },
        [isPlayed ? iframeComponent : thumbnailComponent, playBtnComponent],
      );

      return BOX_COMPONENT;
    },
    /**
     * Picture component
     */
    thumbnailComponent(): VNode | VNode[] {
      const {
        $scopedSlots,
        $createElement,
        resolution,
        videoId,
        disableWebp,
        imageAlt,
        imageLoading,
      } = this;

      const webp = `https://i.ytimg.com/vi_webp/${videoId}/${resolution}.webp`;
      const jpg = `https://i.ytimg.com/vi/${videoId}/${resolution}.jpg`;

      const THUMBNAIL_COMPONENT = $createElement(
        'picture',
        {
          class: [
            'vuetube__thumbnail',
          ],
        },
        [
          !disableWebp && $createElement(
            'source',
            {
              attrs: {
                srcset: webp,
                type: 'image/webp',
              },
            },
          ),
          $createElement(
            'source',
            {
              attrs: {
                srcset: jpg,
                type: 'image/jpeg',
              },
            },
          ),
          $createElement(
            'img',
            {
              class: [
                'vuetube__image',
              ],
              attrs: {
                src: jpg,
                alt: imageAlt,
                loading: imageLoading,
              },
            },
          ),
        ],
      );

      return $scopedSlots?.thumbnail?.({}) || THUMBNAIL_COMPONENT;
    },
    /**
     * Button component
     */
    playBtnComponent(): VNode {
      const {
        $createElement,
        buttonLabel,
        playVideo,
        playBtnIconComponent,
      } = this;

      const PLAY_BTN_COMPONENT = $createElement(
        'button',
        {
          class: [
            'vuetube__button',
          ],
          attrs: {
            type: 'button',
            'aria-label': buttonLabel,
          },
          on: {
            click: playVideo,
          },
        },
        [playBtnIconComponent],
      );

      return PLAY_BTN_COMPONENT;
    },
    /**
     * Icon component
     */
    playBtnIconComponent(): VNode | VNode[] {
      const { $createElement, $scopedSlots } = this;

      const PLAY_BTN_ICON_COMPONENT = $createElement(
        'svg',
        {
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 68 48',
            class: 'vuetube__icon',
            'aria-hidden': true,
            focusable: 'false',
          },
        },
        [
          $createElement(
            'path',
            {
              attrs: {
                class: 'vuetube__icon-bg',
                d: 'M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z',
              },
            },
          ),
          $createElement(
            'path',
            {
              attrs: {
                class: 'vuetube__icon-triangle',
                d: 'M45 24L27 14v20',
              },
            },
          ),
        ],
      );

      return $scopedSlots.icon?.({}) || PLAY_BTN_ICON_COMPONENT;
    },
    /**
     * Iframe component
     */
    iframeComponent(): VNode {
      const {
        $createElement,
        iframeTitle,
        onIframeLoad,
        iframeAllow,
        iframeUrl,
      } = this;

      const IFRAME_COMPONENT = $createElement(
        'iframe',
        {
          ref: 'iframe',
          class: [
            'vuetube__iframe',
          ],
          attrs: {
            src: iframeUrl,
            allow: iframeAllow,
            title: iframeTitle,
          },
          on: {
            load: onIframeLoad,
          },
        },
      );

      return IFRAME_COMPONENT;
    },
  },

  methods: {
    /**
     * Add preconnect links
     */
    warmConnections(): void {
      const { disableWarming, enableCookies, isConnectionWarmed } = this;

      if (disableWarming || isConnectionWarmed) {
        return;
      }

      if (enableCookies) {
        createWarmLink('preconnect', 'https://www.youtube.com');
        createWarmLink('preconnect', 'https://googleads.g.doubleclick.net');
      } else {
        createWarmLink('preconnect', 'https://www.youtube-nocookie.com');
      }

      createWarmLink('preconnect', 'https://fonts.gstatic.com', true);
      createWarmLink('preconnect', 'https://i.ytimg.com');
      createWarmLink('preconnect', 'https://google.com');
      createWarmLink('preconnect', 'https://yt3.ggpht.com');
      createWarmLink('preconnect', 'https://www.gstatic.com');

      this.isConnectionWarmed = true;
    },
    /**
     * Run video
     */
    playVideo(): void {
      this.isPlayed = true;
    },
    /**
     * Run after iframe has been loaded
     */
    onIframeLoad(): void {
      const {
        $refs,
        playerParameters,
        initAPI,
      } = this;

      this.isLoaded = true;

      const el = $refs.iframe as HTMLIFrameElement;
      el.focus();

      const SHOULD_LOAD_API = playerParameters.enablejsapi;

      if (SHOULD_LOAD_API) {
        initAPI();
      }
    },

    initAPI() {
      const {
        $refs,
        videoId,
        playerParameters,
      } = this;

      const el = $refs.iframe as HTMLIFrameElement;

      window.onYouTubeIframeAPIReady = () => {
        const player = new window.YT.Player(el, {
          videoId,
          playerVars: playerParameters,
          events: {
            onReady: ($event) => this.$emit('player:ready', $event),
            onStateChange: ($event) => this.$emit('player:statechange', $event),
            onPlaybackQualityChange: ($event) => this.$emit('player:playbackqualitychange', $event),
            onPlaybackRateChange: ($event) => this.$emit('player:playbackratechange', $event),
          },
        });

        this.player = player;
      };

      loadYoutubeAPI();
    },
  },
  /**
   * Render component
   */
  render(): VNode {
    return this.boxComponent;
  },
});
