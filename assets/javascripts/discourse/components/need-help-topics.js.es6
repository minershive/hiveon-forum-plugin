import { observes } from "ember-addons/ember-computed-decorators";

export default Ember.Component.extend({
    classNames:['need-help-topics'],
    items: Ember.inject.service('latest'),

    init() {
        this._super();
        
        var self = this;
        Ember.run.schedule("afterRender", () => {
            self.$().addClass('ready');
        });
        
    }
});