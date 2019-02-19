import { ajax } from 'discourse/lib/ajax';
import {
  default as computed,
  on,
  observes
} from "ember-addons/ember-computed-decorators";
import KeyValueStore from "discourse/lib/key-value-store";

const keyValueStore = new KeyValueStore("hiveon");

export default Ember.Service.extend({
    categories: null,
    store: Ember.inject.service(),
    
    @on('init')
    getCategories() {        
        let categories = keyValueStore.getObject("categories");

        if (categories === undefined) {
            return ajax("/categories.json").then(result => {
                keyValueStore.setObject({key: "categories", value: result});
                return this.set('categories', result);
            });
        }

        this.set('categories', categories);
        return new Ember.RSVP.Promise(resolve => {

            return resolve();
        });
    },
})