import {
  DEFAULT_HOST,
  GOOGLE_ADS_URL,
  GOOGLE_FONTS_URL,
  GOOGLE_URL,
  GSTATIC_URL,
  NO_COOKIES_HOST,
  PLAYLIST_VIDEO_SRC,
  SINGLE_VIDEO_SRC, YOUTUBE_API_URL, YT3_URL, YTIMG_URL,
} from '@/utils/constants';
import { createWarmLink } from '@/helpers/createWarmLink';
import { getStringifiedParams } from '@/helpers/getStringifiedParams';
import { loadYoutubeAPI } from '@/helpers/loadYoutubeAPI';
import { getNormalizeSlot } from '@/helpers/getNormalizedSlot';
import { isFunction } from '@/helpers/inspect';
import { TImageLoading } from '@/types/imageLoading';
import { TThumbnailResolution } from '@/types/thumbnailResolution';
import Vue, { PropType, VNode } from 'vue';

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
     * The ID of YouTube video
     */
    videoId: {
      type: String as PropType<string>,
      required: true,
    },
    /**
     * Should embed a playlist of several videos
     */
    isPlaylist: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * The aspect ratio for iframe
     */
    aspectRatio: {
      type: Number as PropType<number>,
      default: 16 / 9,
    },
    /**
     * Change video host to www.youtube.com
     * By default, video loaded from https://www.youtube-nocookie.com
     */
    enableCookies: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    /**
     * Parameters that are available in the YouTube embedded player.
     * @link https://developers.google.com/youtube/player_parameters#Parameters
     */
    playerVars: {
      type: Object as PropType<YT.PlayerVars>,
      default: () => ({}),
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
     * @link https://caniuse.com/loading-lazy-attr
     */
    imageLoading: {
      type: String as PropType<TImageLoading>,
      default: 'lazy',
      validator: (value) => ['lazy', 'eager', 'auto'].indexOf(value) !== -1,
    },
    /**
     * Thumbnail from YouTube API
     * @link https://stackoverflow.com/a/18400445/13374604
     */
    resolution: {
      type: String as PropType<TThumbnailResolution>,
      default: 'sddefault',
      validator: (value) => ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'].indexOf(value) !== -1,
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
       * Are preconnect links already appended to the head
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
  /**
   * Clear out the reference to the destroyed player
   */
  beforeDestroy() {
    const { player } = this;

    if (player !== null && typeof player.destroy === 'function') {
      player.destroy();
      this.player = null;
    }
  },

  computed: {
    /**
     * Calculated video host
     */
    host(): string {
      const { enableCookies } = this;

      return enableCookies ? DEFAULT_HOST : NO_COOKIES_HOST;
    },
    /**
     * Calculate iframe url with params
     */
    iframeUrl(): string {
      const {
        playerVars,
        host,
        videoId,
        isPlaylist,
      } = this;

      const DEFAULT_PARAMS = {
        autoplay: 1,
      };

      const CONCAT_PARAMS = Object.assign(
        {},
        DEFAULT_PARAMS,
        playerVars,
      );

      if (isPlaylist) {
        const STRINGIFIED_PLAYLIST_PARAMS = getStringifiedParams(Object.assign(
          {},
          CONCAT_PARAMS,
          { list: videoId },
        ));

        return PLAYLIST_VIDEO_SRC
          .replace('@h', host)
          .replace('@params', STRINGIFIED_PLAYLIST_PARAMS);
      }

      const STRINGIFIED_SINGLE_VIDEO_PARAMS = getStringifiedParams(CONCAT_PARAMS);
      return SINGLE_VIDEO_SRC
        .replace('@h', host)
        .replace('@id', videoId)
        .replace('@params', STRINGIFIED_SINGLE_VIDEO_PARAMS);
    },
    /**
     * Calculate padding for aspect ratio
     * @link https://css-tricks.com/aspect-ratio-boxes/
     */
    calculatedAspectRatioPadding(): string {
      const { aspectRatio } = this;

      return `${100 / aspectRatio}%`;
    },
    /**
     * Wrapper component
     */
    boxComponent(): VNode {
      const {
        $createElement,
        calculatedAspectRatioPadding,
        isPlayed,
        iframeComponent,
        thumbnailComponent,
        playBtnComponent,
        warmConnections,
        playVideo,
      } = this;

      const BOX_COMPONENT = $createElement(
        'div',
        {
          on: {
            '~pointerover': warmConnections,
            click: playVideo,
          },
          class: [
            'vuetube',
            {
              'vuetube--played': isPlayed,
            },
          ],
        },
        [
          $createElement(
            'div',
            {
              class: 'vuetube__box',
              style: {
                'padding-bottom': calculatedAspectRatioPadding,
              },
            },
            [
              isPlayed ? iframeComponent : thumbnailComponent,
              playBtnComponent,
            ],
          ),
        ],
      );

      return BOX_COMPONENT;
    },
    /**
     * Picture component
     */
    thumbnailComponent(): VNode | VNode[] {
      const {
        $slots,
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

      return getNormalizeSlot('thumbnail', {}, $slots, $scopedSlots) || THUMBNAIL_COMPONENT;
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
        [
          playBtnIconComponent,
        ],
      );

      return PLAY_BTN_COMPONENT;
    },
    /**
     * Icon component
     */
    playBtnIconComponent(): VNode | VNode[] {
      const {
        $createElement,
        $slots,
        $scopedSlots,
      } = this;

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

      return getNormalizeSlot('icon', {}, $slots, $scopedSlots) || PLAY_BTN_ICON_COMPONENT;
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
      const {
        disableWarming,
        enableCookies,
        isConnectionWarmed,
      } = this;

      if (disableWarming || isConnectionWarmed) {
        return;
      }

      const DEFAULT_PRECONNECTS = [
        {
          href: DEFAULT_HOST,
          crossorigin: false,
        },
        {
          href: GOOGLE_ADS_URL,
          crossorigin: false,
        },
      ];

      const NO_COOKIES_PRECONNECTS = [
        {
          href: NO_COOKIES_HOST,
          crossorigin: false,
        },
      ];

      const COMMON_PRECONNECTS = [
        {
          href: GOOGLE_FONTS_URL,
          crossorigin: true,
        },
        {
          href: YTIMG_URL,
          crossorigin: false,
        },
        {
          href: GOOGLE_URL,
          crossorigin: false,
        },
        {
          href: YT3_URL,
          crossorigin: false,
        },
        {
          href: GSTATIC_URL,
          crossorigin: false,
        },
      ];

      let FINAL_PRECONNECTS = [];

      const preconnects = Array.from(document.querySelectorAll('link[rel=preconnect]')) as HTMLLinkElement[];
      const preconnectedURLs = preconnects.map((link) => link.href);

      if (enableCookies) {
        FINAL_PRECONNECTS = DEFAULT_PRECONNECTS.concat(COMMON_PRECONNECTS);
      } else {
        FINAL_PRECONNECTS = NO_COOKIES_PRECONNECTS.concat(COMMON_PRECONNECTS);
      }

      const FILTERERED_PRECONNECTS = FINAL_PRECONNECTS.filter((preconnect) => preconnectedURLs.indexOf(`${preconnect.href}/`) === -1);

      FILTERERED_PRECONNECTS.forEach((preconnect) => {
        createWarmLink(preconnect.href, preconnect.crossorigin);
      });

      this.isConnectionWarmed = true;
    },
    /**
     * Run video
     */
    playVideo(): void {
      this.isPlayed = true;

      this.$emit('player:play');
    },
    /**
     * Run after iframe has been loaded
     */
    onIframeLoad(): void {
      const {
        $refs,
        playerVars,
        initAPI,
      } = this;

      this.isLoaded = true;

      const el = $refs.iframe as HTMLIFrameElement;
      el.focus();

      // @ts-expect-error check user vars
      const SHOULD_LOAD_API = playerVars.enablejsapi === 1;

      if (SHOULD_LOAD_API) {
        initAPI();
      }

      this.$emit('player:load');
    },

    initAPI() {
      if (window.YT && isFunction(window.YT.Player)) {
        this.initAPIPlayer();
      } else {
        const prevOnYouTubeIframeAPIReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          if (isFunction(prevOnYouTubeIframeAPIReady)) {
            prevOnYouTubeIframeAPIReady();
          }

          this.initAPIPlayer();
        };

        const scripts = Array.from(document.getElementsByTagName('script'));
        const isLoaded = scripts.some((script) => script.src === YOUTUBE_API_URL);

        if (!isLoaded) {
          loadYoutubeAPI();
        }
      }
    },

    initAPIPlayer() {
      const {
        $refs,
        videoId,
        playerVars,
      } = this;

      const el = $refs.iframe as HTMLIFrameElement;

      const player = new window.YT.Player(el, {
        videoId,
        playerVars,
        events: {
          onReady: ($event) => this.$emit('player:ready', $event),
          onStateChange: ($event) => this.$emit('player:statechange', $event),
          onPlaybackQualityChange: ($event) => this.$emit('player:playbackqualitychange', $event),
          onPlaybackRateChange: ($event) => this.$emit('player:playbackratechange', $event),
          onError: ($event) => this.$emit('player:error', $event),
          onApiChange: ($event) => this.$emit('player:apichange', $event),
        },
      });

      this.player = player;
    },
  },
  /**
   * Render component
   */
  render(): VNode {
    const { boxComponent } = this;

    return boxComponent;
  },
});
