const models = require('../models')

async function articleAuthorization(req, res, next) {
    try {
        let articleData = await models.Article.findById(req.params.articleId).lean()
        if (!articleData) {
            throw { message: 'article is not found' }
        } else if (req.auth._id == articleData.user) {
            next()
        }
        else {
            throw { message: 'not your article' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

module.exports = { articleAuthorization }
