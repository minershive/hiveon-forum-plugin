import { observes } from "ember-addons/ember-computed-decorators";

export default Ember.Component.extend({
    classNames:['hiveon-topic-list', 'hive-announcements'],
    topics: Ember.inject.service('announcements'),

    init() {
        this._super();
        
        var self = this;
        Ember.run.schedule("afterRender", () => {
            self.$().addClass('ready');
        });
    }
});