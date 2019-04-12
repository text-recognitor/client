Vue.component('image-card', {
    props : ["allUserInput"]
    , methods : {
        // fetchAllData() {
        //     axios.get(`${baseURL}/images`)
        // }

    },
    template : 
    `<div>
    <div class="mt-4 row">
    <div v-for="i in 3" class="card" style="width: 18rem;">
    <img class="card-img-top" src="..." alt="Card image cap">
    <div class="card-body">
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    </div>
  </div>
  </div>`
})
