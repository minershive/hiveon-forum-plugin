import { ajax } from 'discourse/lib/ajax';
import getURL from "discourse-common/lib/get-url";
import Service, { inject as service } from '@ember/service';

import {
    on
} from "discourse-common/utils/decorators";

export default Service.extend({
    topics: null,
    categories: service(),

    @on('init')
    onInit() {
        var self = this;
        this.get('categories').getCategories().then(function() {
            self.getTopics();
        });
    },

    getTopics() {

        ajax("/topics/created-by/hiveos.json").then(result => {
            let self = this;
            
            let categories = self.get('categories').categories.category_list.categories;

            let topics = result.topic_list.topics.slice(0,6).map(obj => {
                    let slug = obj.slug || "";
                    
                    if (slug.trim().length === 0) {
                        slug = "topic";
                    }
                    obj.url = getURL("/t/") + slug + "/" + obj.id;

                    obj.category = categories.find(c => {
                        return obj.category_id == c.id;
                    });
                    return obj;
            });
          this.set('topics', topics);  
        });
    }
})