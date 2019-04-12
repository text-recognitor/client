Vue.config.devtools = true

var poemApp = new Vue({
    el: '#app',
    data: {
        isLoggedIn: false,
        inputFile: null,
        allPictures : [{
            imgURL : "https://storage.googleapis.com/textrecognitor/1554999826733sample.jpeg",
            imgText : 'Haasdfagdhbwufhijowerj ckjernjciervjernjverjvnerivu3r9j3ro'
        }, {
            imgURL : "https://storage.googleapis.com/textrecognitor/1554999826733sample.jpeg",
            imgText : 'Hao'
        }, {
            imgURL : "https://storage.googleapis.com/textrecognitor/1554999826733sample.jpeg",
            imgText : 'Hao'
        }, {
            imgURL : "https://storage.googleapis.com/textrecognitor/1554999826733sample.jpeg",
            imgText : 'Hao'
        }, {
            imgURL : "https://storage.googleapis.com/textrecognitor/1554999826733sample.jpeg",
            imgText : 'Hao'
        }, {
            imgURL : "https://storage.googleapis.com/textrecognitor/1554999826733sample.jpeg",
            imgText : 'Hao'
        }]
    },
    methods: {
        uploadImage: function() {
            console.log(`enter file upload..`);
        },
    },
    created : {
        fetchAllData() {
            axios.get(`${baseURL}/pictures`)
            .then((response) => {
                response.data = allPictures
            })
            .catch(err => {
              swal("Something is wrong", "Please reload the page", "error")
            })
        }
    }
    
})