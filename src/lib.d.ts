import { PluginFunction } from 'vue';
import VueTubeComponent from '@/components/VueTube';

declare const VueTubePlugin: PluginFunction<never>;
declare const VueTube: typeof VueTubeComponent;

export {
  VueTube,
};

export default VueTubePlugin;
