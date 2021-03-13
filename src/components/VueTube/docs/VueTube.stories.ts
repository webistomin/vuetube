import { Story } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import VueTube from '../VueTube';
import SVueTubeMDX from './VueTube.mdx';

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
    <vue-tube></vue-tube>
`,
});

export const Default = Template.bind({});
Default.args = {
  shareOptions: {
    url: 'https://github.com/',
    title: 'Title',
    text: 'Text',
  },
  useNativeBehavior: false,
};
