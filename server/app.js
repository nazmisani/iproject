if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const AuthController = require("./controllers/authController");
const ProfileController = require("./controllers/profileController");
const ActivityController = require("./controllers/activityController");
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");
const errorHandler = require("./middlewares/errorHandler");
const upload = require("./utils/multer");

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", AuthController.register);
app.post("/login", AuthController.login);
app.post("/google-login", AuthController.googleLogin);

app.use(authentication);

app.get("/profile", authorization, ProfileController.read);
app.post("/profile", upload.single("file"), authorization, ProfileController.post);
app.put("/profile", upload.single("file"), authorization, ProfileController.update);
app.patch("/profile", upload.single("file"), authorization, ProfileController.patch);

app.get("/activity", authorization, ActivityController.read);
app.post("/activity", authorization, ActivityController.create);
app.get("/generate-activity", authorization, ActivityController.generate);
app.delete("/activity/:id", authorization, ActivityController.delete);

app.use(errorHandler);

module.exports = app;
