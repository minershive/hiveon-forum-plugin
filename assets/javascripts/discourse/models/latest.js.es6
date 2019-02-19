import RestModel from "discourse/models/rest";
//import Ababab from "discourse/plugins/hiveon-forum-plugin/discourse/models";

const Latest = RestModel.extend({
    // @on('init')
    // fillModel() {
    //     return ajax("/latest.json", {
    //         data: { order: 'posts',
    //                 ascending: true
    //             }
    //         }).then(result => {
    //             this.set('needHelp', topic_lists.topics);
    //         });

    // }
});

export default Latest;