const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose"),
    subscribersController = require("./controllers/subscribersController"),
    Subscriber = require("./models/subscriber");

    mongoose.Promise = global.Promise;

    mongoose.connect(
        "mongodb://localhost:27017/recipe_db",
        {useNewUrlParser: true}
    );
    const db = mongoose.connection;
    db.once("open", () => {
        console.log("Successfully connected to MongoDB using Mongoose!")
    })

    var myQuery = Subscriber.findOne({ name: "Jon Wexler"}).where("email", /wexler/);
    myQuery.exec((error, data) => {
        if(data) console.log(data.name)
    })

    app.set("view engine", "ejs");
    app.set("port", process.env.PORT || 3000);

    app.use(
        express.urlencoded({
            extended: false
        })
    );
    app.use(express.json());
    app.use(layouts);
    app.use(express.static("public"));

    app.get("/", (req, res) => {
        res.render("index");
    });
    app.get("/contact", subscribersController.getSubscriptionPage);
    app.get("/courses", homeController.showCourses);
    app.get("/contact", homeController.showSignUp);
    app.get("/contact", homeController.postedSignUpForm);
    app.get("/subscribers", subscribersController.getAllSubscribers,
    (req,res, next) => {
        
        res.render("subscribers", {subscribers: req.data});
    });

    app.post("/subscribe", subscribersController.saveSubscriber);
    
    //At end
    app.use(errorController.pageNotFoundError);
    app.use(errorController.internalServerError);

    app.listen(app.get("port"), () => {
        console.log(
            `Server running at htpp://localhost:${app.get("port")}`
        );
    });
