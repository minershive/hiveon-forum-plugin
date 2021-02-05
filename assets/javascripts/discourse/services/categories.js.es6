import { ajax } from 'discourse/lib/ajax';
import {
  default as computed,
  on,
  observes
} from "discourse-common/utils/decorators";
import KeyValueStore from "discourse/lib/key-value-store";
import Service, { inject as service } from '@ember/service';
import { Promise } from "rsvp";

const keyValueStore = new KeyValueStore("hiveon");

export default Service.extend({
    categories: null,
    store: service(),
    
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
        return new Promise(resolve => {

            return resolve();
        });
    },
})