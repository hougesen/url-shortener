const express = require("express");
const Links = require("../models/links");

const router = express.Router();

router.get("/:shortCode", async (req, res) => {
  const link = await Links.findOne({ shortCode: req.params.shortCode });

  if (link) {
    res.status(200).send({ to: link.link });
    link.clickCount++;
    await link.save();
  } else {
    res.status(404).send({ msg: "error" });
  }
});

module.exports = router;
