# backbone-vue

A lightweight Vue.js Plugin to facilitate gradual migration from Backbone.

## Features

- 2-way binding of Vue instance to model attributes
- 2-way binding of events.
- Extremely light - whitelist only attributes you want synced.

## Installation

1. Install via npm or yarn.

```bash
npm install vue-backbone
```

2. Import and use the plugin on your Vue instance:

```bash
import Vue from "vue";
import BackboneVue from "backbone-vue";
Vue.use(BackboneVue);
```

## Usage

```js
var vm = new Vue({
  el: "#app",

  // pass backbone as a function
  backbone: () => {
    return {
      // pass a reference to a view's model
      model: this.model,

      // whitelist model attributes you want for 2-way binding
      // bind backbone attributes to vue data
      // backbone attribute => vue data
      data: {
        comment_content: "content",
        controls: "controls",
        focus: "focus"
      },

      // whitelist events you want to bubble down to and up from vue instance
      events: ["submit", "resetTextArea"]
    };
  }
});
```

## Alternatives

### [Vue-Backbone](https://github.com/mikeapr4/vue-backbone)

This is a great library that offers a more comprehensive approach to Vue-backbone syncing. However, it will automatically attempt to sync up ALL attributes in your model/collections, which can be computationally expensive in some cases.

We take a whitelist-style approach to model attributes, which gives you more control over attribute syncing from Backbone views to Vue instances. The additional benefit is you can sync a specific Backbone attribute to a Vue data attribute instead.
