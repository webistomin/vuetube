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
    onClose: action('emit close'),
    onOpen: action('emit open'),
    onBlock: action('emit block'),
    onFocus: action('emit focus'),
  },
  template: `
    <div class="story-vuetube-container">
      <vue-tube v-bind="$props">
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
  disableWebp: false,
};

export const NativeIframe = NativeIframeTemplate.bind({});
NativeIframe.args = {};
