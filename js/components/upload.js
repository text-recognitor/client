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
        this.currentStatus = SAVING;
        axios.post(`${baseURL}/pictures`, {
          data: {
            formData
          },
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        })
        console.log(`upload event arrived....`);
      },
      onFileChange(fieldName, fileList) {
        const formData = new FormData();
        if (!fileList.length) return;
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            console.log(fieldName, "<= fieldName");
            console.log(fileList[x], "<= fileList[x]");
            console.log(fileList[x].name, "<= fileList[x].name");
            // formData.append(fieldName, fileList[x], fileList[x].name);
            formData.append("image", fileList[x])
          });
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
    <div class="container">
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