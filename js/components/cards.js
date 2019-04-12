Vue.component('image-card', {
    props : ["allPictures"], 
    filters: {
      truncate: function (text, length, suffix) {
        if (text.length > 15) {
          return text.substring(0, length) + suffix;
        } else return text
      }
    },
    template :`<div>
    <div class="mt-4 row justify-content-center" >
    <div id="display-card" v-for="picture in allPictures" class="card mx-2 mt-2" style="width: 18rem;">
    <img v-bind:src="picture.imgURL" class="card-img-top" alt="">
    <div class="card-body">
      {{ picture.imgText | truncate(15, '...')  }}
    </div>
    </div>
  </div>
  </div>`
})
