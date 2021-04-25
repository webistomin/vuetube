import { App, Plugin } from 'vue';

/**
 * Import vue components
 */
import { VueTube } from '@/components';

/**
 * Install function executed by Vue.use()
 */
const install: Exclude<Plugin['install'], undefined> = function installVueTube(app: App) {
  app.component(VueTube.name, VueTube);
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
