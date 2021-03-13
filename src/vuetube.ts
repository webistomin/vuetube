import _Vue, { PluginFunction } from 'vue';

/**
 * Import vue components
 */
import { VueTube } from '@/components';

/**
 * Install function executed by Vue.use()
 */
const install: PluginFunction<never> = function installVueTube(Vue: typeof _Vue) {
  Vue.component(VueTube.name, VueTube);
};

/**
 * Create module definition for Vue.use()
 */
export default install;

/**
 * To allow individual component use, export components
 * each can be registered via Vue.component()
 */
export { VueTube };
