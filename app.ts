import bodyParser from "body-parser";
import express from "express";
import fs from "fs";
import bycrypt from "bcryptjs";
import { middleTest } from "./auth";
import jwt from "jsonwebtoken";
import cookieParse from "cookie-parser";
const app = express();
const PORT = 5000;

//express.static
// syntax -> express.static("public") --> index.html
//text -> express.text
//json -> express.json
//form data ->
//fetch
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse());

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  const salt = bycrypt.genSaltSync(10);

  const hashPassword = bycrypt.hashSync(password, salt);
  const newUser = { email, password: hashPassword };

  const existingData = fs.readFileSync("./data/userInfo.json", "utf-8");
  const existingArry = JSON.parse(existingData);
  const newData = [...existingArry, newUser];
  fs.writeFileSync("./data/userInfo.json", JSON.stringify(newData));
  res.redirect("/signin.html");
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const isValid = email && password;

  //validation
  if (!isValid) {
    return res.status(400).send(" information required");
  }

  const existingData = fs.readFileSync("./data/userInfo.json", "utf-8");
  const existingArry: { email: string; password: string }[] =
    JSON.parse(existingData);
  const foundedUser = existingArry.find((user) => user.email === email);
  if (!foundedUser) {
    return res.send("no user found");
  }
  const oldPassword = foundedUser.password;
  const isSame = bycrypt.compareSync(password, oldPassword);
  //jwt.sign('str/obj/Buffer' , secretOrPrivateKey ,options)
  const token = jwt.sign(
    { email: foundedUser.email },
    "EyCXS3524524UHhVL5Xykaadn0QVix",
    { expiresIn: "1h" }
  );
  console.log(token);

  // res.cookie("key", value)
  res.cookie("token", token);
  res.redirect("/");
});

app.get("/", middleTest, (req, res) => {
  res.send("hello");
});

app.get("/about.html", middleTest, (req, res) => {
  res.send("hello");
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/signin.html");
});

app.listen(PORT, () => console.log("serve is runing on port", PORT));
