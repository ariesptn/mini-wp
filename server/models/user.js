const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        validate: [
            {
                validator: function (value) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value)
                },
                message: 'invalid email'
            }, {
                validator: function (value) {
                    return new Promise(async (resolve, reject) => {
                        try {
                            let member = await User.findOne({ email: value })
                            if (member) {
                                if (member._id.toString() == this._id.toString()) {
                                    resolve(true)
                                } else {
                                    reject(false)
                                }
                            } else {
                                resolve(true)
                            }
                        } catch (err) {
                            reject(err)
                        }
                    })
                },
                message: 'duplicate email'
            }
        ]
    },
    password: String,
    googleClientId: String,
})

userSchema.pre('save', function (next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // hash the password
    bcrypt.hash(user.password, 1, function (err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('users', userSchema)

module.exports = User
