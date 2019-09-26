const express = require("express");
const morgan = require("morgan");
const models = require('./models');
const PORT = 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public/stylesheets"));

app.use(express.urlencoded({ extended: false }));

app.use("/wiki", require("./routes/wiki"));
app.use("/user", require("./routes/user"));

app.get("/", (req, res) => {
    res.redirect('/wiki');
  })

  models.db.authenticate().
  then(() => {
    console.log('connected to the database');
  })

  
  const init=async()=>{
      await models.db.sync()

      app.listen(PORT,()=>{
          console.log(`server is listening on port ${PORT}`)
      })
  }
  init()

  
// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });