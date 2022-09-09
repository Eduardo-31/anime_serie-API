//* Dependencias
const express = require("express");
const passport = require("passport");
require("./middleware/auth.middleware")(passport);

//*Archivos de rutas
const userRouter = require("./users/users.router").router;
const authRouter = require("./auth/auth.router").router;
const programRouter = require("./programs/programs.router").router

const path = require('path')

//* Configuraciones iniciales
const app = express();

//? Esta configuracion es para habilitar el req.body
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({ message: "All ok!" });
});



// GET- obtener la imagen de nuestro programa - cover
app.get("/api/v1/uploads/serie/cover-img/:cover_image", (req, res) => {
  const imgName = req.params.cover_image
  res.status(200).sendFile(path.resolve('uploads/') + '/covers/' + imgName)
})

// GET - obtener nuestro video - chapter
app.get("/api/v1/uploads/serie/chapters/:chapter_video", (req, res) => {
  const videoChapter = req.params.chapter_video
  res.status(200).sendFile(path.resolve('uploads/') + '/chapters/' + videoChapter)
})


app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/programs", programRouter);


app.listen(8000, () => {
  console.log("Server started at port 8000");
});

exports.default = app
exports.app = app
module.exports = app