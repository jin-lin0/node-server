const express = require("express");
const userServer = require("../../server/userServer");
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("user");
});

router.get("/findAll", function (req, res, next) {
  userServer.findAll(res);
});

module.exports = router;
