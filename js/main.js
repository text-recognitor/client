Vue.config.devtools = true

var poemApp = new Vue({
    el: '#poemApp',
    data: {
        isLoggedIn: false,
        inputFile: null,
        allUserInput : ['a','a','a','a','a']
    },
    methods: {
        uploadImage: function() {
            console.log(`enter file upload..`);
        }
    }
})