import pick from "lodash/pick";

let backboneMixin = {
  created() {
    var backbone = this.$options.backbone,
      data = {};

    // need backbone options
    if (!backbone) {
      return;
    }

    if (typeof backbone !== "function") {
      throw `Vue Backbone Migration: 'backbone' initialization option must be a function`;
    }
    this._backbone = backbone(); // remember, it's a function

    if (!this._backbone.model && !this._backbone.collection) {
      throw `Vue Backbone Migration: you need to specify a model or collection`;
    }

    if (!this._backbone.data) {
      throw `Vue Backbone Migration: you must specify model properties`;
    }

    // sync events
    if (this._backbone.events) {
      this._backbone.events.forEach(event => {
        // trigger event on vue instance
        this._backbone.model.on(event, args => {
          this.$emit(event, args);
        });

        // trigger event on backbone model
        this.$on(event, event => {
          this._backbone.model.trigger(event);
        });
      });
    }

    // sync data
    if (this._backbone.data) {
      // get data and values
      if (this._backbone.model) {
        data = pick(
          this._backbone.model.toJSON(),
          Object.keys(this._backbone.data)
        );
      } else {
        data = pick(
          this._backbone.collection.toJSON(),
          Object.keys(this._backbone.data)
        );
      }

      // add listeners
      Object.keys(data).forEach(key => {
        let vmKey = this._backbone.data[key];
        // add each to data
        this.$data[vmKey] = this._backbone.model.get(key);

        // watch for vm changes and update model
        this.$watch(vmKey, val => {
          this._backbone.model.set(key, val);
        });

        // watch for model changes and update vm
        this._backbone.model.on("change:" + key, (model, value) => {
          this[vmKey] = value;
        });
      });
    }
  }
};

const backboneVue = {
  install(Vue, options) {
    Vue.mixin(backboneMixin);
  }
};

export default backboneVue;
