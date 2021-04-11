const express = require("express");
const Links = require("../models/links");

const router = express.Router();

router.post("/newLink", async (req, res) => {
  const new_link = {
    shortCode: generateShortCode(10),
    link: req.body.link,
  };

  if (req.body.userId != null && req.body.userId != undefined && req.body.userId != "") {
    new_link.userId = req.body.userId;
  }

  const l = new Links(new_link);

  await l
    .save()
    .then(() => {
      res.send({ success: true, msg: "worked?", shortCode: l.shortCode });
    })
    .catch((err) => {
      console.log(err);
      res.send({ success: false, msg: "err", err });
    });
});

function generateShortCode(length) {
  var result = [];
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join("");
}

module.exports = router;
