import Vue, { VNode } from 'vue';
import { createWarmLink } from '@/utils/createWarmLink';
import { TISO639Codes } from '@/types/language-codes';
import getSerialisedParams from '@/utils/getSerialisedParams';

/**
 * @link https://developers.google.com/youtube/player_parameters#Parameters
 */
export interface IPlayerParameters {
  autoplay?: 0 | 1,
  cc_lang_pref?: TISO639Codes;
  cc_load_policy?: 0 | 1,
  color?: 'red' | 'white';
  controls?: 0 | 1;
  disablekb?: 0 | 1;
  enablejsapi?: 0 | 1;
  end?: number;
  fs?: 0 | 1;
  hl?: TISO639Codes;
  iv_load_policy?: 0 | 1;
  list?: 'user_uploads' | 'playlist' | 'search';
  listType?: 'user_uploads' | 'playlist' | 'search';
  loop?: 0 | 1;
  modestbranding?: 0 | 1;
  origin?: 0 | 1;
  playlist?: string;
  playsinline?: 0 | 1;
  rel?: 0 | 1;
  start?: number;
  widget_referrer?: string;
}

export default /* #__PURE__ */ Vue.extend({
  name: 'VueTube',

  props: {
    /**
     * ID of YouTube video
     */
    videoId: {
      type: String,
      required: true,
    },
    /**
     * Aspect ratio for iframe
     */
    ratio: {
      type: Number,
      default: 16 / 9,
    },
    /**
     * Change video host to www.youtube.com
     * By default video loaded from https://www.youtube-nocookie.com
     */
    enableCookies: {
      type: Boolean,
      default: false,
    },
    /**
     * Parameters that are available in the YouTube embedded player.
     * @link https://developers.google.com/youtube/player_parameters#Parameters
     */
    playerParameters: {
      type: Object,
      default: () => ({ autoplay: 2 }),
    },
    /**
     * Disable warming up connections to origins that are in the critical path
     */
    disableWarming: {
      type: Boolean,
      default: false,
    },
    /**
     * Disable webp thumbnail
     */
    disableWebp: {
      type: Boolean,
      default: false,
    },
    /**
     * Alt attribute for image
     */
    imageAlt: {
      type: String,
      default: '',
    },
    /**
     * Loading attribute for image
     */
    imageLoading: {
      type: String,
      default: 'lazy',
    },
    /**
     * Thumbnail from YouTube API
     * @link https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
     */
    resolution: {
      type: String,
      default: 'sddefault',
      validator: (value) => ['maxresdefault', 'sddefault', 'hqdefault'].indexOf(value) !== -1,
    },
    /**
     * Aria-label attribute for button
     */
    buttonLabel: {
      type: String,
      default: 'Play video',
    },
    /**
     * Title attribute for iframe
     */
    iframeTitle: {
      type: String,
      default: undefined,
    },
    /**
     * Allow attribute for iframe
     */
    iframeAllow: {
      type: String,
      default: 'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture',
    },
  },

  data() {
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

    iframeComponent(): VNode {
      const {
        $createElement,
        videoId,
        iframeTitle,
        onIframeLoad,
        iframeAllow,
        playerParameters,
      } = this;

      const IFRAME_COMPONENT = $createElement(
        'iframe',
        {
          ref: 'iframe',
          class: [
            'vuetube__iframe',
          ],
          attrs: {
            src: `https://www.youtube-nocookie.com/embed/${videoId}${getSerialisedParams(Object.assign({}, playerParameters, { autoplay: 1 }))}`,
            allow: iframeAllow,
            title: iframeTitle,
            allowfullscreen: true,
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

    playVideo(): void {
      this.isPlayed = true;
    },

    onIframeLoad(): void {
      this.isLoaded = true;
      const el = this.$refs.iframe as HTMLIFrameElement;
      el.focus();
    },
  },

  render(): VNode {
    return this.boxComponent;
  },
});
