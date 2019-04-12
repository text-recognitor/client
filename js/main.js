Vue.config.devtools = true

var poemApp = new Vue({
    el: '#app',
    data: {
        isLoggedIn: false,
        inputFile: null,
        allPictures : []
    },
    methods: {
        uploadImage: function() {
            console.log(`enter file upload..`);
        },
        addNewPicture(picture) {
          this.allPictures.push(picture)
        },
        fetchAllData() {
            axios.get(`${baseURL}/pictures`)
            .then((response) => {
              console.log(response.data);
              this.allPictures = response.data
            })
            .catch(err => {
              console.log(err);
              // swal("Something is wrong", "Please reload the page", "error")
            })
        }
    },
    created() {
      this.fetchAllData();
    }
    
})