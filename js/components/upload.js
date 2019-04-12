const INITIAL = 0, SAVING = 1, SUCCESS = 2, FAILED = 3;
const baseURL = "http://localhost:3000"

Vue.component('upload-form', {
    data() {
      return {
        uploadedFile: null,
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'image',
        image: ""
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === INITIAL;
      },
      isSaving() {
        return this.currentStatus === SAVING;
      },
      isSuccess() {
        return this.currentStatus === SUCCESS;
      },
      isFailed() {
        return this.currentStatus === FAILED;
      }
    },
    methods: {
      reset() {
        // reset form to initial state
        this.currentStatus = INITIAL;
        this.uploadedFile = null;
        this.uploadError = null;
      },
      save(formData) {

        console.log(formData.get("image"), "<= formdata get");
        this.currentStatus = SAVING;
        axios.post(`${baseURL}/pictures`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          return axios.post(`${baseURL}/analyze`, 
            {
              imgURL: data.imgURL
            })
          // data.imgURL
          // Munculin modal di sini
          // console.log(data, "<= ini response client");
        })
        .then(({ data }) => {
          Swal.fire({
            title: 'Sweet!',
            text: `${data.imgText}`,
            imageUrl: `${data.imgURL}`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'analyzed image',
            animation: false,
            confirmButtonText: "OK"
          })
          .then(result => {
            if (result.value) {
              
            }
          })
          this.currentStatus = INITIAL
          console.log(response, "<= ini response abis analyze");
        })
        .catch(err => {
          console.log(err);
        })
      },
      onFileChange(fieldName, fileList) {
        const formData = new FormData();
        if (!fileList.length) return;
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            // formData.append(fieldName, fileList[x], fileList[x].name);
            formData.append("image", fileList[x])
          });

        let timerInterval;
        Swal.fire({
          title: 'Processing image...',
          html: '<strong></strong> seconds.',
          timer: 15000,
          onBeforeOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
              Swal.getContent().querySelector('strong')
                .textContent = (Swal.getTimerLeft() / 1000)
                .toFixed(0)
            }, 100)
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.timer
          ) {
            console.log('I was closed by the timer')
          }
        })

        // save it
        this.save(formData);
      },
    },
    created() {
      console.log(`created...`);
      this.reset();
    },
    template:
        `
    <div class="container" data-aos="zoom-in" data-aos-duration="1400" data-aos-delay="1000">
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <div class="dropbox mt-4">
            <input type="file" multiple @change="onFileChange($event.target.name, $event.target.files)"
                accept="image/*" class="input-file">
                <p v-if="isInitial">
                Drag a photo with text on it...
                </p>
                <p v-if="isSaving">
                    Uploading files...
                </p>
            </div>
        </form>
        <!--SUCCESS-->
        <div v-if="isSuccess">
            <h2>Uploaded file: {{ uploadedFile }} successfully.</h2>
            <p>
            <a href="javascript:void(0)" @click="reset()">Please upload again</a>
            </p>
            <img :src="uploadedFile.url" class="img-responsive img-thumbnail" :alt="uploadedFile.originalName">
        </div>
        <!--FAILED-->
        <div v-if="isFailed">
            <h2>Upload failed.</h2>
            <p>
            <a href="javascript:void(0)" @click="reset()">Try again</a>
            </p>
            <pre>{{ uploadError }}</pre>
        </div>
    </div>
        `
    })