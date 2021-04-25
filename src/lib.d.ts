import { Plugin } from 'vue';
import VueTubeComponent from '@/components/VueTube';

declare const VueTubePlugin: Exclude<Plugin['install'], undefined>;
declare const VueTube: typeof VueTubeComponent;

export {
  VueTube,
};

export default VueTubePlugin;
