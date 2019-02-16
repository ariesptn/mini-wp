Vue.component('page-menu', {
    props: ['articles'],
    computed: {
        totalTagsOfArticles: function () {
            return new Set(
                this.articles.map(e => e.tags).reduce((a, b) => a.concat(b), [])).size
        },
    },
    data() {
        return {}
    },
    methods: {
        showEmptyForm() {
            this.$emit('show-empty-form')
        },
        switchPanel(panel) {
            this.$emit('switch-panel', panel)
        },
        getArticles(scope) {
            this.$emit('get-articles', scope)
        }
    },
    template: ` 
<div>
    <div class="list-group">
        <a v-on:click="getArticles('all')" class="list-group-item list-group-item-action" href="#">Everyone's Articles</a>
        <a v-on:click="getArticles()" class="list-group-item list-group-item-action" href="#">Your Articles</a>
        <a v-on:click="showEmptyForm" class="list-group-item list-group-item-action" href="#">New
            Article</a>
    </div>
    <hr class="my-4">
    <ul class="list-group">
        <a href="#" v-on:click="switchPanel('articles')"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            Articles
            <span class="badge badge-primary badge-pill">{{articles.length}}</span>
        </a>
        <a href="#" v-on:click="switchPanel('tags')"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            Tags
            <span class="badge badge-primary badge-pill">
                {{totalTagsOfArticles}}
            </span>
        </a>
    </ul>
</div>`
})
