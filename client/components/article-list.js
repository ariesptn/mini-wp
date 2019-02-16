Vue.component('article-list', {
    props: ['articles'],
    data() {
        return {}
    },
    methods: {
        showEditForm(article) {
            this.$emit('show-edit-form', article)
        },
        articleDelete(article) {
            this.$emit('article-delete', article)
        },
        tagSelect(tag) {
            this.$emit('tag-select', tag)
        }
    },
    template: `
<div>
    <div v-for="article in articles" class="card">
        <div class="card-header">
            {{article.createdAt.split('T').join(' ').split('.')[0]}}
        </div>
        <div class="card-body">
            <h5 class="card-title">{{article.title}}</h5>
            <p class="card-text"><strong>Author</strong> : {{article.user.name}}</p>
            <div class="card-text" v-html="article.content"></div>
            <p class="card-text">
                <strong>Tags</strong> :
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-secondary" v-for="tag in article.tags"
                        v-on:click="tagSelect(tag)">{{tag}}</button>
                </div>
            </p>
            <img class="card-img-bottom" v-if="article.fileUrl" v-bind:src="article.fileUrl"
                alt="Card image cap">
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary"
                    v-on:click="showEditForm(article)">Edit</button>
                <button type="button" class="btn btn-secondary"
                    v-on:click="articleDelete(article)">Delete</button>
            </div>
        </div>
    </div>
</div>
    `
})
