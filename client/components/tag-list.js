Vue.component('tag-list', {
    props: ['articleTags', 'articles'],
    data() {
        return {}
    },
    methods: {
        tagSelect(tag) {
            this.$emit('tag-select', tag)
        }
    },
    template: `
<div>
    <div v-for="tag in articleTags" class="list-group">
        <a href="#" v-on:click="tagSelect(tag)"
            class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            {{tag}}
            <span class="badge badge-primary badge-pill">
                {{articles.filter(e => e.tags.includes(tag)).length}}
            </span>
        </a>
    </div>
</div>
    `
})
