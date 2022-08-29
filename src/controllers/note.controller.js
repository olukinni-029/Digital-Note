const Note = require("../models/note.model");
const User = require("../models/user.model")

// view all created Note
exports.allNote = async (req, res) => {
  try {
    const note = await Note.find();
    return res.status(200).json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "internal server error" });
  }
};

// search all created Note with Title
exports.Note = async (req, res) => {
  try {
    const note = await Note.findOne({ title: req.params.title });
    return res.status(200).json(note);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "internal server error" });
  }
};
// Edit Note created by id
exports.updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const note = await Note.findByIdAndUpdate(
      { _id: id },
      { title, description },
      {
        new: true,
      }
    );
    return res.status(200).json({message:"updated successfully",note});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "internal server error" });
  }
};
//   Delete a Note by id
exports.deleteNote = async (req, res) => {
  try {

    const id = req.user._id
    const user = await User.findById({_id:id})

    if(user.role != "admin"){
      return res.status(401).json({
        message:"Unauthorized to perform this action🙊🙊🙊🙉"
      })
    }
    
    const note = await Note.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json(`Deleted Successfully`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "internal server error" });
  }
};
