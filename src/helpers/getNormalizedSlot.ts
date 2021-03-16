/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types */
import { isFunction } from '@/helpers/inspect';
import { ScopedSlot } from 'vue/types/vnode';
import { PropsDefinition } from 'vue/types/options';
import { VNode } from 'vue/types/umd';

/**
 * Get normalized vue slot
 */
function getNormalizeSlot(name: string, props: PropsDefinition<any>, $slots: any, $scopedSlots: { [key: string]: ScopedSlot | undefined }): VNode | VNode[] {
  const slot = $scopedSlots[name] || $slots[name];

  return isFunction(slot) ? slot(props) : slot;
}

export { getNormalizeSlot };
