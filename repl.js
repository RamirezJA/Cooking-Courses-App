const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);
mongoose.Promise = global.Promise;

const 
  Subscriber = require("./models/subscriber"),
  User = require("./models/user")
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);
mongoose.Promise = global.Promise;

var testUser;
User.create({
  name: {
    first: "Rick",
    last: "Sanchez"
  },
  email: "rick@morty.com",
  password: "pass123"
}).then(user => testUser = user)
.catch(error => console.log(error.message));

