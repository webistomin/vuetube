<h1 align="center">
  <font align="center" size="120">
    🚀
  </font>
  VueTube
</h1>

<p align="center">
  Vue component acting as a thin layer over the YouTube IFrame Player API which renders fast.
  <br/>
  <a href="https://vuetube-ten.vercel.app/"><strong>Explore website »</strong></a>
</p>

<br/>

<p align="center">
  <a href="https://npmjs.org/package/vuetube">
    <img alt="NPM version" src="https://img.shields.io/npm/v/vuetube.svg?color=%23F00" />
</a>
  <a href="https://npmjs.org/package/vuetube">
<img alt="NPM downloads" src="https://img.shields.io/npm/dm/vuetube.svg?color=%23F00">
</a>
 <a href="https://github.com/webistomin/vuetube">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/webistomin/vuetube?color=%23F00">
</a>
 <a href="https://github.com/webistomin/vuetube">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/webistomin/vuetube?color=%23F00">
</a>
 <a href="https://github.com/webistomin/vuetube">
    <img alt="npm type definitions" src="https://img.shields.io/npm/types/vuetube?color=%23F00">
</a>
<a href="https://bundlephobia.com/result?p=vuetube">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/vuetube?color=%23F00">
  </a>
</p>

<p align="center">
  <a href="#key-features-">Key Features</a> •
  <a href="#installation-">Installation</a> •
  <a href="#documentation-">Documentation</a> •
  <a href="#faq-%EF%B8%8F">FAQ</a> •
  <a href="#browsers-support-">Browsers support</a> •
  <a href="#license-">License</a>  •
  <a href="#inspiration-">Inspiration</a>  •
  <a href="#support-the-project-">Support the project</a>  •
  <a href="#contributing-">Contributing</a>
</p>

## Key Features ✨

* **Small** `~2KB` js (minified and gzipped) and `~1KB` css
* **No dependencies**
* **Lazy load** support
* **Webp support**, and fallback to `jpg` if the browser doesn't support it
* **Render fast**, improve your web's performance  
* Built with **a11y** in mind

## Installation  ⚙️

**npm**
```shell
npm install vuetube
```

**yarn**
```shell
yarn add vuetube
```

**Install plugin**
```js
import Vue from 'vue'
import VueTube from 'vuetube';
import 'vuetube/dist/vuetube.css'

Vue.use(VueTube)
```

or

**Install component**
```js
import Vue from 'vue'
import { VueTube } from 'vuetube';
import 'vuetube/dist/vuetube.css'

Vue.component('VueTube', VueTube)
```


## Documentation 🤗

Browse [online documentation here](https://vuetube-ten.vercel.app/)

### Props

<table>
  <tr>
    <td>
      Prop
    </td>
    <td>
      Type
    </td>
    <td>
      Description
    </td>
    <td>
      Default value
    </td>
  </tr>
  <tr>
    <td>
      <code>videoId</code>
    </td>
    <td>
      <code>string</code>
    </td>
    <td>
      The ID of YouTube video (required)
    </td>
    <td>
      -
    </td>
  </tr>
  <tr>
    <td>
      <code>isPlaylist</code>
    </td>
    <td>
      <code>boolean</code>
    </td>
    <td>
      Should embed a playlist of several videos
    </td>
    <td>
      <code>false</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>aspectRatio</code>
    </td>
    <td>
      <code>number</code>
    </td>
    <td>
      The aspect ratio for iframe
    </td>
    <td>
      <code>16 / 9</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>enableCookies</code>
    </td>
    <td>
      <code>boolean</code>
    </td>
    <td>
      Change video host to <code>www.youtube.com</code>. By default, video loaded from <code>https://www.youtube-nocookie.com</code>.
    </td>
    <td>
      <code>false</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>playerVars</code>
    </td>
    <td>
      <code>object</code>
    </td>
    <td>
      <a href="https://developers.google.com/youtube/player_parameters#Parameters">Parameters</a> that are available in the YouTube embedded player.
    </td>
    <td>
      <code>{}</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>disableWarming</code>
    </td>
    <td>
      <code>boolean</code>
    </td>
    <td>
      Disable warming up connections to origins that are in the critical path on component hover.
    </td>
    <td>
      <code>false</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>disableWebp</code>
    </td>
    <td>
      <code>boolean</code>
    </td>
    <td>
      Disable webp thumbnail.
    </td>
    <td>
      <code>false</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>imageAlt</code>
    </td>
    <td>
      <code>string</code>
    </td>
    <td>
      Alt attribute for image
    </td>
    <td>
      <code>''</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>imageLoading</code>
    </td>
    <td>
      <code>string</code>
    </td>
    <td>
      <a href="https://caniuse.com/loading-lazy-attr">Loading attribute</a> for image
    </td>
    <td>
      <code>'lazy'</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>resolution</code>
    </td>
    <td>
      <code>string</code>
    </td>
    <td>
      <a href="https://stackoverflow.com/a/18400445/13374604">Thumbnail resolution</a> from YouTube API. 
    </td>
    <td>
      <code>'sddefault'</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>buttonLabel</code>
    </td>
    <td>
      <code>string</code>
    </td>
    <td>
      Aria-label attribute for button
    </td>
    <td>
      <code>'Play video'</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>iframeTitle</code>
    </td>
    <td>
      <code>string</code>
    </td>
    <td>
      Title attribute for iframe
    </td>
    <td>
      <code>''</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>iframeAllow</code>
    </td>
    <td>
      <code>string</code>
    </td>
    <td>
      Allow attribute for iframe
    </td>
    <td>
      <code>'accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture'</code>
    </td>
  </tr>
</table>

### Events

<table>
  <tr>
    <td>Event name</td>
    <td>Description</td>
  </tr>
  <tr>
    <td><code>player:play</code></td>
    <td>The user clicked on the play button</td>
  </tr>
  <tr>
    <td><code>player:load</code></td>
    <td>Iframe has been loaded</td>
  </tr>
  <tr>
    <td><code>player:ready</code></td>
    <td>This event fires whenever a player has finished loading and is ready to begin receiving API calls. <br/><br/> <strong>Make sure you pass <code>enablejsapi: 1</code> to the <code>playerVars</code> props object</strong> <br/><br/> This event is similar to <code>onReady</code> event from <a href="https://developers.google.com/youtube/iframe_api_reference#Events">Youtube API documentation</a>.</td>
  </tr>
  <tr>
    <td><code>player:statechange</code></td>
    <td>This event fires whenever the player's state changes. <br/><br/> <strong>Make sure you pass <code>enablejsapi: 1</code> to the <code>playerVars</code> props object</strong> <br/><br/> This event is similar to <code>onStateChange</code> event from <a href="https://developers.google.com/youtube/iframe_api_reference#Events">Youtube API documentation</a>.</td>
  </tr>
  <tr>
    <td><code>player:playbackqualitychange</code></td>
    <td>This event fires whenever the video playback quality changes. <br/><br/> <strong>Make sure you pass <code>enablejsapi: 1</code> to the <code>playerVars</code> props object</strong> <br/><br/> This event is similar to <code>onPlaybackQualityChange</code> event from <a href="https://developers.google.com/youtube/iframe_api_reference#Events">Youtube API documentation</a>.</td>
  </tr>
  <tr>
    <td><code>player:playbackratechange</code></td>
    <td>This event fires whenever the video playback rate changes.  <br/><br/> <strong>Make sure you pass <code>enablejsapi: 1</code> to the <code>playerVars</code> props object</strong> <br/><br/> This event is similar to <code>onPlaybackRateChange</code> event from <a href="https://developers.google.com/youtube/iframe_api_reference#Events">Youtube API documentation</a>.</td>
  </tr>
  <tr>
    <td><code>player:error</code></td>
    <td>This event fires if an error occurs in the player. <br/><br/> <strong>Make sure you pass <code>enablejsapi: 1</code> to the <code>playerVars</code> props object</strong> <br/><br/> This event is similar to <code>onError</code> event from <a href="https://developers.google.com/youtube/iframe_api_reference#Events">Youtube API documentation</a>.</td>
  </tr>
  <tr>
    <td><code>player:apichange</code></td>
    <td>This event is fired to indicate that the player has loaded (or unloaded) a module with exposed API methods. <br/><br/> <strong>Make sure you pass <code>enablejsapi: 1</code> to the <code>playerVars</code> props object</strong> <br/><br/> This event is similar to <code>onApiChange</code> event from <a href="https://developers.google.com/youtube/iframe_api_reference#Events">Youtube API documentation</a>.</td>
  </tr>
</table>

## FAQ 🗯️

### How to get access to player API?

You need to pass <code>enablejsapi: 1</code> to the <code>playerVars</code> props object. Then subscribe on <code>player:ready</code> event.

```vue
  <template>
    <vue-tube @player:ready="onPlayerReady"></vue-tube>
  </template>

  <script>
    export default {
      data() {
        return {
          playerInstance: null,
        }
      },
      
      methods: {
        onPlayerReady(event) {
          this.playerInstance = event.target
        }
      }
    }
  </script>
```

Now you have a player instance in the `playerInstance`. You can do whatever you want with video. 

`this.playerInstance.playVideo()`, `this.playerInstance.pauseVideo()` etc. All methods can be found [here](https://developers.google.com/youtube/iframe_api_reference#Playback_controls).

### How to use my play button?

You can pass your button through the `icon` slot.

```vue
  <template>
    <vue-tube>
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="#fff"
            d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"
          />
        </svg>
      </template>
    </vue-tube>
  </template>
```

### How to use my thumbnail?

You can pass your thumbnail through the `thumbnail` slot.

```vue
  <template>
    <vue-tube>
      <template #thumbnail>
        <img src="#" alt="">
      </template>
    </vue-tube>
  </template>
```

## Browsers support 🌎

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/yandex/yandex_48x48.png" alt="Yandex" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Yandex |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge 80 | 60+ | 60+ | 10+ | 10+ | 12+ | 50+ | 14.4+

## License 📄

### [MIT](https://github.com/webistomin/vuetube/blob/master/LICENSE)

## Inspiration 👏

Vuetube is a vue component version of the popular package [lite-youtube-embed](https://github.com/paulirish/lite-youtube-embed).

## Support the project ⭐

If you feel awesome and want to support me in a small way, please consider starring and sharing the repo!

## Contributing 🎉

Found a bug? Missing a specific feature?
Your contributions are always welcome! Please have a look at the [contribution guidelines](https://github.com/webistomin/vuetube/blob/master/CONTRIBUTING.md) first.

## Contributors ❤️


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://webistom.in/en"><img src="https://avatars.githubusercontent.com/u/30475699?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alexey Istomin</b></sub></a><br /><a href="#a11y-webistomin" title="Accessibility">️️️️♿️</a> <a href="https://github.com/webistomin/vuetube/commits?author=webistomin" title="Tests">⚠️</a> <a href="https://github.com/webistomin/vuetube/commits?author=webistomin" title="Code">💻</a> <a href="#ideas-webistomin" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
