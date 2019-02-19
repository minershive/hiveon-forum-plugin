import { ajax } from 'discourse/lib/ajax';
import {
  default as computed,
  on,
  observes
} from "ember-addons/ember-computed-decorators";

export default Ember.Service.extend({
    items: null,
    categories: Ember.inject.service(),

    // init() {
    //     this._super(...arguments);
    //     this.set(items, []);

    //     this.getItems();
    // }

    @on('init')
    onInit() {
        var self = this;
        this.get('categories').getCategories().then(function() {
            self.getItems();
        });
    },

    getItems() {
  
        ajax("/latest.json", {
        data: { order: 'posts',
                ascending: true
            }
        }).then(result => {
            let self = this;

            let categories = self.get('categories').categories.category_list.categories;
            let topics = result.topic_list.topics.slice(0,8).map(obj => {
                    let slug = obj.slug || "";
                    
                    if (slug.trim().length === 0) {
                        slug = "topic";
                    }
                    obj.url = Discourse.getURL("/t/") + slug + "/" + obj.id;
                    obj.user = result.users.find(u => {
                        return u.id == obj.posters[0].user_id;
                    });

                    obj.user.avatar_template = obj.user.avatar_template.replace('{size}','370');

                    obj.category = categories.find(c => {
                        return obj.category_id == c.id;
                    });
                    return obj;
            });

            this.set('items', topics);
        });
    }

});





        //             needHelpTopics() {
        //                 ajax("/latest.json", {
        //                 data: { order: 'posts',
        //                         ascending: true
        //                     }
        //                 }).then(result => {
        //                     this.set('model', topic_lists.topics);
        //                 });

        //             }
