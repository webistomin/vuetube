import { mount } from '@vue/test-utils';
import VueTube from '@/components/VueTube';

describe('VueTube.vue', () => {
  const factory = (propsData = {}, options = {}) => mount(VueTube, {
    propsData: {
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
      ...propsData,
    },
    ...options,
  });

  it('set correct image urls and types, when using webp', () => {
    const wrapper = factory();
    const sources = wrapper.findAll('source');
    const image = wrapper.find('img');
    const sourceWebp = sources.at(0).element as HTMLSourceElement;
    const sourceJpeg = sources.at(1).element as HTMLSourceElement;
    const sourceImg = image.element as HTMLImageElement;

    const WEBP_SRCSET = 'https://i.ytimg.com/vi_webp/dQw4w9WgXcQ/sddefault.webp';
    const JPEG_SRCSET = 'https://i.ytimg.com/vi/dQw4w9WgXcQ/sddefault.jpg';
    const WEBP_TYPE = 'image/webp';
    const JPEG_TYPE = 'image/jpeg';

    expect(sources.length).toEqual(2);
    expect(sourceWebp.srcset).toEqual(WEBP_SRCSET);
    expect(sourceWebp.type).toEqual(WEBP_TYPE);
    expect(sourceJpeg.srcset).toEqual(JPEG_SRCSET);
    expect(sourceJpeg.type).toEqual(JPEG_TYPE);
    expect(sourceImg.src).toEqual(JPEG_SRCSET);
  });

  it('set correct image urls and types, when webp is disabled', () => {
    const wrapper = factory(
      {
        disableWebp: true,
      },
    );
    const sources = wrapper.findAll('source');
    const image = wrapper.find('img');
    const sourceJpeg = sources.at(0).element as HTMLSourceElement;
    const sourceImg = image.element as HTMLImageElement;

    const JPEG_SRCSET = 'https://i.ytimg.com/vi/dQw4w9WgXcQ/sddefault.jpg';
    const JPEG_TYPE = 'image/jpeg';

    expect(sources.length).toEqual(1);
    expect(sourceJpeg.srcset).toEqual(JPEG_SRCSET);
    expect(sourceJpeg.type).toEqual(JPEG_TYPE);
    expect(sourceImg.src).toEqual(JPEG_SRCSET);
  });

  it('load iframe on component click', async () => {
    const wrapper = factory();
    await wrapper.trigger('click');

    const iframe = wrapper.find('iframe');

    expect(iframe.exists()).toBe(true);
  });

  it('load iframe on button click', async () => {
    const wrapper = factory();
    const button = wrapper.find('button');
    await button.trigger('click');

    const iframe = wrapper.find('iframe');

    expect(iframe.exists()).toBe(true);
  });

  it('match snapshot when iframe is loaded', async () => {
    const wrapper = factory();
    await wrapper.trigger('click');

    const html = wrapper.html();

    expect(html).toMatchSnapshot();
  });

  it('match snapshot when using custom button icon', () => {
    const wrapper = factory({}, {
      scopedSlots: {
        icon: '<svg class="my-custom-icon"></svg>',
      },
    });
    const html = wrapper.html();

    expect(html).toMatchSnapshot();
  });

  it('match snapshot when using custom thumbnail', () => {
    const wrapper = factory({}, {
      scopedSlots: {
        thumbnail: '<img src="#" alt="" class="my-custom-thumbnail" />',
      },
    });
    const html = wrapper.html();

    expect(html).toMatchSnapshot();
  });
});
