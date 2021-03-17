import { getNormalizeSlot } from '@/helpers/getNormalizedSlot';

describe('getNormalizeSlot.ts', () => {
  it('return undefined if slot is not found', () => {
    const name = 'my-slot';
    const props = {};
    const $slots = {};
    const $scopedSlots = {};

    const result = getNormalizeSlot(name, props, $slots, $scopedSlots);

    expect(result).toEqual(undefined);
  });

  it('return content from $slots if it exists', () => {
    const component = document.createElement('div');
    const name = 'my-slot';
    const props = {};
    const $slots = {
      [name]: component,
    };
    const $scopedSlots = {};

    const result = getNormalizeSlot(name, props, $slots, $scopedSlots);

    expect(result).toEqual(component);
  });

  it('return content from $scopedSlots if it exists', () => {
    const component = null;
    const name = 'my-slot';
    const props = {};
    const $slots = {};
    const $scopedSlots = {
      [name]: () => component,
    };

    const result = getNormalizeSlot(name, props, $slots, $scopedSlots);

    expect(result).toEqual(component);
  });
});
