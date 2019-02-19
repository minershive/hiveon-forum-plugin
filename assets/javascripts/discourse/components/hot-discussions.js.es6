import { observes } from "ember-addons/ember-computed-decorators";

export default Ember.Component.extend({
    classNames:['hiveon-topic-list', 'hot-discussions'],
    topics: Ember.inject.service('top'),

    init() {
        this._super();
        
        var self = this;
        Ember.run.schedule("afterRender", () => {
            self.$().addClass('ready');
        });
    }
});