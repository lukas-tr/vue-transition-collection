# vue-transition-collection

[![Travis (.com) branch](https://img.shields.io/travis/com/lukas-tr/vue-transition-collection/master.svg)](https://travis-ci.com/lukas-tr/vue-transition-collection)
[![David](https://img.shields.io/david/dev/lukas-tr/vue-transition-collection.svg)](https://david-dm.org/lukas-tr/vue-transition-collection?type=dev)
[![David](https://img.shields.io/david/peer/lukas-tr/vue-transition-collection.svg)](https://david-dm.org/lukas-tr/vue-transition-collection?type=peer)
[![Codecov branch](https://img.shields.io/codecov/c/github/lukas-tr/vue-transition-collection/master.svg)](https://codecov.io/gh/lukas-tr/vue-transition-collection)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/lukas-tr/vue-transition-collection/blob/master/LICENSE)
![type definitions](https://img.shields.io/badge/types-TypeScript-blue.svg)
![npm](https://img.shields.io/npm/v/vue-transition-collection.svg)

<!-- [![codebeat badge](https://codebeat.co/badges/ab47d01b-9a17-43e0-b235-ace83771923d)](https://codebeat.co/projects/github-com-lukas-tr-vue-transition-collection-master) -->

Easy to use transitions for your vue project.

## Demo

[Demo](https://vue-transition-collection.netlify.com/)

## Typedoc

[Typedoc](https://lukas-tr.github.io/vue-transition-collection/)

## Usage

```bash
npm i vue-transition-collection animate.css
```

```javascript
import VueTransitionCollection from "vue-transition-collection"
import "animate.css/animate.min.css";

Vue.use(VueTransitionCollection)
```

```html
<vtc-fade mode="out-in" direction="right" duration="1000" delay="0">
  <div :key="someKey">some content</div>
</vtc-fade>
```

## Available transitions

- `vtc-fade`
- `vtc-zoom`
- `vtc-bounce`
- `vtc-flip`
- `vtc-fade-big`
- `vtc-rotate`
- `vtc-slide`

## Available props

- group: `boolean` - Use `<transition-group>` instead of `<transition>`
- mode: `"in-out"|"out-in"` - The transition mode
- direction: `"right"|"left"|"up"|"down"|"toggle"` - The direction of the transition
- inverse: `boolean` - Switch left/right and up/down
- delay: `number` - The delay until the transition starts
- duration: `number` - The duration of the transition
