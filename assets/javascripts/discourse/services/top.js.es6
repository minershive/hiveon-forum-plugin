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

        ajax("/top.json").then(result => {
            let self = this;
            let categories = self.get('categories').categories.category_list.categories;

            let topics = result.topic_list.topics.slice(0,6).map(obj => {
                    let slug = obj.slug || "";
                    
                    if (slug.trim().length === 0) {
                        slug = "topic";
                    }
                    obj.url = getURL("/t/") + slug + "/" + obj.id;
                    obj.user = result.users.find(u => {
                        return u.id == obj.posters[0].user_id;
                    });

                    obj.users = obj.posters.map(poster => {
                        
                        let posterUser = result.users.find(u => {
                                return u.id == poster.user_id;
                            });
                        posterUser.avatar_template = posterUser.avatar_template.replace('{size}','370');
                        return posterUser;
                    });

                    obj.user.avatar_template = obj.user.avatar_template.replace('{size}','370');

                    obj.category = categories.find(c => {
                        return obj.category_id == c.id;
                    });
                    return obj;
            });
          this.set('topics', topics);  
        });
    }
})