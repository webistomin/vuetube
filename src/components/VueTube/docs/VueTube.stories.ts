import { Story } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VueTube from '../VueTube';
import SVueTubeMDX from './VueTube.mdx';
import './VueTube.stories.css';
import '../VueTube.css';

export default {
  title: 'Components/VueTube',
  component: VueTube,
  parameters: {
    docs: {
      page: SVueTubeMDX,
    },
  },
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

const NativeIframeTemplate: Story = () => ({
  template: `
    <div class="story-vuetube-container">
      <iframe
        class="story-vuetube-iframe"
        src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
        frameborder="0"
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
  playerVars: { enablejsapi: 1 },
  disableWarming: false,
  disableWebp: false,
  imageAlt: '',
  imageLoading: 'lazy',
  resolution: 'sddefault',
  buttonLabel: 'Play video',
  iframeTitle: undefined,
  iframeAllow: 'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture',
};

export const NativeIframe = NativeIframeTemplate.bind({});
NativeIframe.args = {};
