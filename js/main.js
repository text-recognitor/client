Vue.config.devtools = true

var poemApp = new Vue({
    el: '#app',
    data: {
        isLoggedIn: false,
        inputFile: null
    },
    methods: {
        uploadImage: function() {
            console.log(`enter file upload..`);
        }
    }
})