const models = require('../models')

class ArticleController {
    static async find(req, res) {
        try {
            let articleData = await models.Article.find({ user: req.auth._id })
                .sort({ createdAt: -1 }).populate('user').lean()
            res.status(200).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findAll(req, res) {
        try {
            let articleData = await models.Article.find()
                .sort({ createdAt: -1 }).populate('user').limit(100).lean()
            articleData = articleData.map(e => {
                e.user.email = ''
                e.user.password = ''
                return e
            })
            res.status(200).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let articleData = await models.Article.findOne({ _id: req.params.articleId })
                .populate('user').lean()
            res.status(200).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let articleData = await models.Article.create({
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags.split(',').map(e => e.trim().toLowerCase()),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: req.auth._id,
            })
            res.status(201).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let articleData = await models.Article.findOneAndUpdate(
                { _id: req.params.articleId },
                {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        tags: req.body.tags.split(',').map(e => e.trim().toLowerCase()),
                        updatedAt: new Date(),
                    }
                })
            res.status(201).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let articleData = await models.Article.findOneAndDelete({ _id: req.params.articleId })
            res.status(200).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async fileUpload(req, res) {
        try {
            let articleData = await models.Article.findById(req.params.articleId)
            if (!articleData) {
                throw { message: 'article not found' }
            }
            if (req.file) {
                articleData.fileUrl = req.file.cloudStoragePublicUrl
                articleData.save()
            }
            res.status(200).send(articleData)
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

}

module.exports = ArticleController
