const mongoose = require("mongoose"),
  User = require("./models/user")


mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  {useNewUrlParser: true}
);

mongoose.Promise = global.Promise;

var testUser;
User.create({
  name: {
    first: "Jon",
    last: "Wexler"
  },
  email: "jon@jonwexler.com",
  password: "pass123"
})
  .then(user => testUser = user)
  .catch(error => console.log(error.message));



