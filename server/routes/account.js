// Packages
const express = require("express");
const argon2 = require("argon2");

// Models
const Users = require("../models/users");
const Links = require("../models/links");

const router = express.Router();

async function hashString(string) {
  try {
    const hash = await argon2.hash(string);
    return hash;
  } catch (err) {
    console.log("err");
  }
}

async function validatePassword(hash, string) {
  try {
    if (await argon2.verify(hash, string)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("err");
  }
}

async function emailInUse(email) {
  const user = await Users.findOne({ email: email });

  if (user) {
    return true;
  } else {
    return false;
  }
}

router.post("/newUser", async (req, res) => {
  let existCheck = await emailInUse(req.body.email);

  if (existCheck) {
    res.status(400).send({ success: false, msg: "Email already in use" });
    return { success: false, msg: "Email already in use" };
  }

  const new_user = {
    email: req.body.email,
    password: await hashString(req.body.password),
  };

  const u = new Users(new_user);

  await u
    .save()
    .then(() => {
      res.status(200).send({ success: true, msg: "User created", obj: u });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, msg: "Please try again", err });
    });
});

router.post("/login", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });

  if (user) {
    console.log("success");
    console.log(user);

    let validPassword = await validatePassword(user.password, req.body.password);

    if (validPassword) {
      res.send({ auth: true, msg: "Logged in", userId: user._id });
    } else {
      res.send({ auth: false, msg: "Wrong email/password" });
    }
  } else {
    // no user with that email
    res.send({ auth: false, msg: "Wrong email/password" });
  }
});

router.get("/allLinks/:userId", async (req, res) => {
  let links = await Links.find({ userId: req.params.userId });
  console.log(links);

  res.send(links);
});

module.exports = router;
