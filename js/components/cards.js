Vue.component('image-card', {
    props : ["allPictures"], 
    filters: {
      truncate: function (text, length, suffix) {
        if (text.length > 15) {
          return text.substring(0, length) + suffix;
        } else return text
      }
    },
    methods: {
      url(picture) {
        return `https://twitter.com/intent/tweet/?text=I%20digitalized%20my%20handwriting%20!%20COOL!%20http://localhost:8080%20%20Here%20:%20${picture.imgURL}`
      }
    },
    template :`<div>
    <div class="mt-4 row justify-content-center align-self-center" >
    <div id="display-card" v-for="picture in allPictures" class="card mx-2 mt-2" style="width: 18rem;" data-aos="flip-up">
    <img v-bind:src="picture.imgURL" class="card-img-top" alt="">
    <div class="card-body">
      {{ picture.imgText }}
    </div>
    <a class="resp-sharing-button__link" v-bind:href="url(picture)" target="_blank" rel="noopener" aria-label="Share on Twitter">
      <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--solid">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z"/></svg>
      </div>Share on Twitter</div>
    </a>
    </div>
  </div>
  </div>`
})
