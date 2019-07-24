const express = require("express"),
    app = express(),
    homeController = require("./controllers/homeController"),
    errorController = require("./controllers/errorController"),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose");

    mongoose.connect(
        "mongodb:localhost//27017/recipe_db",
        {useNewUrlParser: true}
    );
    const db = mongoose.connection;

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

    app.get("/courses", homeController.showCourses);
    app.get("/contact", homeController.showSignUp);
    app.get("/contact", homeController.postedSignUpForm);

    app.use(errorController.pageNotFoundError);
    app.use(errorController.internalServerError);

    app.listen(app.get("port"), () => {
        console.log(
            `Server running at htpp://localhost:${app.get("port")}`
        );
    });
