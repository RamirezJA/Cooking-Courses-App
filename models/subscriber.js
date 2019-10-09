const mongoose = require("mongoose"),
    {Schema} = mongoose,
    User = require("./user"),

    subscriberSchema = new Schema({
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        zipCode:{
            type: Number,
            min: [10000, "zip code too short"],
            max: 99999
        },
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course"}],
        userAccount: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },   
    {
        timestamps: true
    });

    subscriberSchema.methods.getInfo = function() {
        return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
    };

    subscriberSchema.methods.findLocalSubscribers = function() {
        return this.model("Subsciber")
            .find({zipCode: this.zipCode})
            .exec();
    };

    subscriberSchema.pre("save", function(next) {
        let subscriber = this;
        if (subscriber.userAccount === undefined) {
            User.findOne({
                email: subscriber.email
            })
                .then(user => {
                    subscriber.userAccount = user;
                    next();
                })
                .catch(error => {
                    console.log(`Error in connecting subscriber:${error.message}`);
                    next(error);
                });
        }else {
            next();
        }
    });

    module.exports = mongoose.model("Subscriber", subscriberSchema);