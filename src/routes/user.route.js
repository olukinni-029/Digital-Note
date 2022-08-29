const express = require("express");
const {
  userSignup,
  userLogin,
  addNote,
} = require("../controllers/user.controller");
const { isAuth } = require("../middleware/isAuth");

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.post("/create", isAuth, addNote);

module.exports = router;
