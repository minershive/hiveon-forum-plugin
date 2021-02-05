import { observes } from "discourse-common/utils/decorators";
import { inject as service } from '@ember/service';
import { run } from '@ember/runloop';
import Component from '@ember/component';

export default Component.extend({
    classNames:['need-help-topics'],
    items: service('latest'),

    init() {
        this._super();
        
        var self = this;
        run.schedule("afterRender", () => {
            self.$().addClass('ready');
        });
        
    }
});