import { Story } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VueTube from '../VueTube';
import SVueTubeMDX from './VueTube.mdx';
import './VueTube.stories.css';
import '../VueTube.css';
import placeholder from './assets/placeholder.png';

export default {
  title: 'Components/VueTube',
  component: VueTube,
  parameters: {
    docs: {
      page: SVueTubeMDX,
    },
  },
};

const thumbnail = {
  src: placeholder,
  alt: 'Video coming soon',
};

const Template: Story = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VueTube },
  methods: {
    onReady: action('emit player:ready'),
    onStateChange: action('emit player:statechange'),
    onPlaybackQualityChange: action('emit player:playbackqualitychange'),
    onPlaybackRateChange: action('emit player:playbackratechange'),
    onError: action('emit player:error'),
    onApiChange: action('emit player:apichange'),
    onLoad: action('emit player:load'),
    onPlay: action('emit player:play'),
  },
  template: `
    <div class="story-vuetube-container">
    <vue-tube
      v-bind="$props"
      @player:ready="onReady"
      @player:statechange="onStateChange"
      @player:playbackqualitychange="onPlaybackRateChange"
      @player:error="onError"
      @player:apichange="onApiChange"
      @player:load="onLoad"
      @player:play="onPlay"
    >
    </vue-tube>
    </div>
  `,
});

const TemplateWithAPI: Story = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VueTube },
  methods: {
    onReady: action('emit player:ready'),
    onStateChange: action('emit player:statechange'),
    onPlaybackQualityChange: action('emit player:playbackqualitychange'),
    onPlaybackRateChange: action('emit player:playbackratechange'),
    onError: action('emit player:error'),
    onApiChange: action('emit player:apichange'),
    onLoad: action('emit player:load'),
    onPlay: action('emit player:play'),
  },
  template: `
    <div class="story-vuetube-container">
    <vue-tube
      v-bind="$props"
      @player:ready="onReady"
      @player:statechange="onStateChange"
      @player:playbackqualitychange="onPlaybackRateChange"
      @player:error="onError"
      @player:apichange="onApiChange"
      @player:load="onLoad"
      @player:play="onPlay"
    >
    </vue-tube>
    </div>
  `,
});

const TemplateWithCustomButton: Story = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VueTube },
  methods: {
    onReady: action('emit player:ready'),
    onStateChange: action('emit player:statechange'),
    onPlaybackQualityChange: action('emit player:playbackqualitychange'),
    onPlaybackRateChange: action('emit player:playbackratechange'),
    onError: action('emit player:error'),
    onApiChange: action('emit player:apichange'),
    onLoad: action('emit player:load'),
    onPlay: action('emit player:play'),
  },
  template: `
    <div class="story-vuetube-container">
    <vue-tube
      v-bind="$props"
      @player:ready="onReady"
      @player:statechange="onStateChange"
      @player:playbackqualitychange="onPlaybackRateChange"
      @player:error="onError"
      @player:apichange="onApiChange"
      @player:load="onLoad"
      @player:play="onPlay"
    >
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24">
          <path
            fill="#fff"
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"
          />
        </svg>
      </template>
    </vue-tube>
    </div>
  `,
});

const TemplateWithCustomThumbnail: Story = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VueTube },
  computed: {
    src() {
      return thumbnail.src;
    },
    alt() {
      return thumbnail.alt;
    },
  },
  methods: {
    onReady: action('emit player:ready'),
    onStateChange: action('emit player:statechange'),
    onPlaybackQualityChange: action('emit player:playbackqualitychange'),
    onPlaybackRateChange: action('emit player:playbackratechange'),
    onError: action('emit player:error'),
    onApiChange: action('emit player:apichange'),
    onLoad: action('emit player:load'),
    onPlay: action('emit player:play'),
  },
  template: `
    <div class="story-vuetube-container">
    <vue-tube
      v-bind="$props"
      @player:ready="onReady"
      @player:statechange="onStateChange"
      @player:playbackqualitychange="onPlaybackRateChange"
      @player:error="onError"
      @player:apichange="onApiChange"
      @player:load="onLoad"
      @player:play="onPlay"
    >
      <template #thumbnail>
        <img class="story-vuetube-thumbnail" :src="src" :alt="alt">
      </template>
    </vue-tube>
    </div>
  `,
});

const TemplateWithMultipleVideos: Story = (_args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VueTube },
  methods: {
    onReady: action('emit player:ready'),
    onStateChange: action('emit player:statechange'),
    onPlaybackQualityChange: action('emit player:playbackqualitychange'),
    onPlaybackRateChange: action('emit player:playbackratechange'),
    onError: action('emit player:error'),
    onApiChange: action('emit player:apichange'),
    onLoad: action('emit player:load'),
    onPlay: action('emit player:play'),
  },
  template: `
    <div class="story-vuetube-container">
    <vue-tube
      v-bind="$props"
      @player:ready="onReady"
      @player:statechange="onStateChange"
      @player:playbackqualitychange="onPlaybackRateChange"
      @player:error="onError"
      @player:apichange="onApiChange"
      @player:load="onLoad"
      @player:play="onPlay"
    >
    </vue-tube>
    <vue-tube
      v-bind="$props"
      video-id="QH2-TGUlwu4"
      image-alt="Nyan Cat"
      iframe-title="Nyan Cat [original]"
      @player:ready="onReady"
      @player:statechange="onStateChange"
      @player:playbackqualitychange="onPlaybackRateChange"
      @player:error="onError"
      @player:apichange="onApiChange"
      @player:load="onLoad"
      @player:play="onPlay"
    >
    </vue-tube>
    </div>
  `,
});

const NativeIframeTemplate: Story = () => ({
  template: `
    <div class="story-vuetube-container story-vuetube-aspect-ratio">
      <iframe
        class="story-vuetube-iframe"
        src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  videoId: 'dQw4w9WgXcQ',
  isPlaylist: false,
  aspectRatio: 16 / 9,
  enableCookies: false,
  playerVars: {},
  disableWarming: false,
  disableWebp: false,
  imageAlt: 'Rick Astley',
  imageLoading: 'lazy',
  resolution: 'sddefault',
  buttonLabel: 'Play video',
  iframeTitle: 'Rick Astley - Never Gonna Give You Up (Video)',
  iframeAllow: 'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture',
};

export const withAPI = TemplateWithAPI.bind({});
withAPI.args = {
  videoId: 'dQw4w9WgXcQ',
  isPlaylist: false,
  aspectRatio: 16 / 9,
  enableCookies: false,
  playerVars: { enablejsapi: 1 },
  disableWarming: false,
  disableWebp: false,
  imageAlt: 'Rick Astley',
  imageLoading: 'lazy',
  resolution: 'sddefault',
  buttonLabel: 'Play video',
  iframeTitle: 'Rick Astley - Never Gonna Give You Up (Video)',
  iframeAllow: 'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture',
};

export const withCustomButton = TemplateWithCustomButton.bind({});
withCustomButton.args = {
  videoId: 'dQw4w9WgXcQ',
  isPlaylist: false,
  aspectRatio: 16 / 9,
  enableCookies: false,
  playerVars: {},
  disableWarming: false,
  disableWebp: false,
  imageAlt: 'Rick Astley',
  imageLoading: 'lazy',
  resolution: 'sddefault',
  buttonLabel: 'Play video',
  iframeTitle: 'Rick Astley - Never Gonna Give You Up (Video)',
  iframeAllow: 'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture',
};

export const withCustomThumbnail = TemplateWithCustomThumbnail.bind({});
withCustomThumbnail.args = {
  videoId: 'dQw4w9WgXcQ',
  isPlaylist: false,
  aspectRatio: 16 / 9,
  enableCookies: false,
  playerVars: {},
  disableWarming: false,
  disableWebp: false,
  imageAlt: 'Rick Astley',
  imageLoading: 'lazy',
  resolution: 'sddefault',
  buttonLabel: 'Play video',
  iframeTitle: 'Rick Astley - Never Gonna Give You Up (Video)',
  iframeAllow: 'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture',
};

export const withMultipleVideos = TemplateWithMultipleVideos.bind({});
withMultipleVideos.args = {
  videoId: 'dQw4w9WgXcQ',
  isPlaylist: false,
  aspectRatio: 16 / 9,
  enableCookies: false,
  playerVars: { enablejsapi: 1 },
  disableWarming: false,
  disableWebp: false,
  imageAlt: 'Rick Astley',
  imageLoading: 'lazy',
  resolution: 'sddefault',
  buttonLabel: 'Play video',
  iframeTitle: 'Rick Astley - Never Gonna Give You Up (Video)',
  iframeAllow: 'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture',
};

export const withNativeIframe = NativeIframeTemplate.bind({});
withNativeIframe.args = {};
