const express = require("express");
const {
  allNote,
  updateNote,
  deleteNote,
  Note,
} = require("../controllers/note.controller");
const { isAuth } = require("../middleware/isAuth");

const router = express.Router();

router.delete("/notes/:id", isAuth, deleteNote); 
router.put("/notes/:id", isAuth, updateNote);
router.get("/notes", isAuth, allNote); 
router.get("/notes/:title", isAuth, Note);

module.exports = router;
