Vue.filter('striphtml', function (value) {
    var div = document.createElement("div")
    div.innerHTML = value
    var text = div.textContent || div.innerText || ""
    return text
})

let app = new Vue({
    el: '#app',
    components: {
    },
    created: function () {
    },
    mounted: function () {
    },
    data: {
        userName: '',
        userEmail: '',
        loggedIn: false,
        articleFormTitle: '',
        articleFormTags: '',
        articleFormContent: '',
        articleEditId: '',
        errorMessage: '',
        allArticles: [],
        articles: [],
        articleTags: [],
        searchBox: '',
        showError: false,
        showArticles: false,
        showTags: false,
        showArticleForm: false,
    },
    watch: {
        searchBox() {
            this.searchArticles()
        }
    },
    computed: {
    },
    methods: {
        switchPanel: function (panel) {
            this.showArticles = panel === 'articles'
            this.showTags = panel === 'tags'
            this.showArticleForm = panel === 'articleForm'
        },
        showEmptyForm: function () {
            this.switchPanel('articleForm')
            this.articleFormTitle = ''
            this.articleFormTags = ''
            this.articleEditId = ''
            this.articleFormContent = ''
        },
        showEditForm: function (article) {
            this.switchPanel('articleForm')
            this.articleFormTitle = article.title
            this.articleFormTags = article.tags.join(',')
            this.articleEditId = article._id
            this.articleFormContent = article.content
        },
        searchArticles: function () {
            this.switchPanel('articles')
            let searchQuery = this.searchBox.slice(0, this.searchBox.indexOf('tag:')).trim()
            this.articles = this.allArticles.filter(e => {
                return e.title.includes(searchQuery) || e.content.includes(searchQuery) || e.tags.some(f => f.includes(searchQuery))
            })
            if (this.searchBox.includes('tag:')) {
                let searchTag = this.searchBox.substring(this.searchBox.indexOf('tag:') + 4)
                this.articles = this.articles.filter(e => e.tags.includes(searchTag))
            }
            this.articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            this.articleTags = Array.from(
                new Set(
                    this.articles
                        .map(e => e.tags)
                        .reduce((a, b) => a.concat(b), [])))
            this.articleTags.sort((a, b) => a - b)
        },
        tagSelect: function (tag) {
            this.searchBox = 'tag:' + tag
            this.searchArticles()
        },
        getArticles: async function (scope) {
            let url = `/api/articles`
            if (scope == 'all') {
                url = `/api/articles/all`
            }
            let response = await axios({
                baseURL: baseUrl,
                url,
                headers: { token },
            }).catch(err => this.displayError(err))
            this.allArticles = response.data
            this.searchArticles()
        },
        articleDelete: async function (article) {
            let response = await axios({
                baseURL: baseUrl,
                url: `/api/articles/${article._id}`,
                method: 'DELETE',
                headers: { token },
            }).catch(err => this.displayError(err))
            this.getArticles()
        },
        logout() {
            signOut()
        },
        loginCheck: function (isSuccess, response) {
            if (isSuccess) {
                this.loggedIn = true
                this.userName = response.name
                this.userEmail = response.email
                this.getArticles()
            } else {
                this.loggedIn = false
                this.userName = ''
                this.userEmail = ''
                this.displayError(response)
            }
        },
        displayError: function (error) {
            if (error.response) {
                this.errorMessage = error.response.data.message
            } else if (error.message) {
                this.errorMessage = error.message
            } else {
                this.errorMessage = '<pre>' + JSON.stringify(error, null, 2) + '</pre>'
            }
            this.showError = true
            setTimeout(() => {
                this.errorMessage = ''
                this.showError = false
            }, 10000)
        },
    }
})

function onLoginChecked(isSuccess, response) {
    app.loginCheck(isSuccess, response)
}
