const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    tags: [String],
    fileUrl: String,
    createdAt: Date,
    updatedAt: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

const Article = mongoose.model('articles', articleSchema)

module.exports = Article
