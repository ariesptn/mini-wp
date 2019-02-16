Vue.component('article-form', {
    props: ['articleFormTitleCopy', 'articleFormTagsCopy', 'articleFormContentCopy', 'articleEditIdCopy'],
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    data() {
        return {
            articleFormTitle: this.articleFormTitleCopy,
            articleFormTags: this.articleFormTagsCopy,
            articleFormContent: this.articleFormContentCopy,
            articleEditId: this.articleEditIdCopy,
        }
    },
    methods: {
        switchPanel(panel) {
            this.$emit('switch-panel', panel)
        },
        async articleFormSubmit() {
            let method = 'POST'
            if (this.articleEditId !== '') {
                method = 'PUT'
            }
            let response = await axios({
                baseURL: baseUrl,
                url: `/api/articles/${this.articleEditId}`,
                method,
                headers: { token },
                data: {
                    title: this.articleFormTitle,
                    tags: this.articleFormTags,
                    content: this.articleFormContent,
                }
            }).catch(err => this.$emit('display-error', err))
            let formData = new FormData();
            let articleFormFile = document.querySelector('#articleFormFile');
            formData.append('articleFile', articleFormFile.files[0]);
            let fileResponse = await axios({
                baseURL: baseUrl,
                url: `/api/articles/file/${response.data._id}`,
                method: 'POST',
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data',
                },
                data: formData,
            }).catch(err => this.$emit('display-error', err))
            this.$emit('get-articles')
        }
    },
    template: `
<div>
    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Title</span>
        </div>
        <input type="text" v-model="articleFormTitle" class="form-control" id="basic-url"
            placeholder="Title" aria-describedby="basic-addon3">
        <div class="input-group-append">
            <span class="input-group-text">:)</span>
        </div>
    </div>

    <div class="input-group mb-3">
        <div class="input-group-prepend">
            <span class="input-group-text">Tags</span>
        </div>
        <input type="text" v-model="articleFormTags" class="form-control"
            placeholder="tag1,tag2,tag3" aria-label="Amount">
        <div class="input-group-append">
            <span class="input-group-text">Comma separated tags</span>
        </div>
    </div>

    <div>
        <wysiwyg v-model="articleFormContent" />
    </div>

    <div class="custom-file">
        <input type="file" class="custom-file-input" id="articleFormFile">
        <label class="custom-file-label" for="articleFormFile">Choose file</label>
    </div>

    <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" v-on:click="articleFormSubmit" class="btn btn-secondary">Save</button>
        <button type="button" v-on:click="switchPanel('articles')"
            class="btn btn-secondary">Cancel</button>
    </div>
</div>`
})
