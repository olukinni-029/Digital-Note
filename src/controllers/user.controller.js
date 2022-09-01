const User = require("../models/user.model");
const Note = require("../models/note.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  if (!firstName || !lastName || !email || !password) {
    res.status(403).json("input all fields");
  }
  try {
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });
    return res
      .status(200)
      .json({ message: "User created successfully", user: user });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: error.keyValue, message: "email already exists" });
  }
};

exports.userLogin = async (req, res) => {
  const { password, email } = req.body;
  try {
    if (!(password && email)) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // check if user exist in database
    const checkUser = await User.findOne({ email: email });

    // if user doesn't exist throw error
    if (!checkUser) {
      return res.status(404).json({ message: "user not found" });
    }

    // if user exist in database, check if user password is correct
    const checkPassword = await bcrypt.compare(password, checkUser.password);

    // if user password is not correct throw error ==> invalid credentials
    if (!checkPassword) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    // if user password is correct tokenize the payload
    const payload = {
      _id: checkUser._id,
    };

    const token = await jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });
    res.cookie("access_token", token);
    return res
      .status(202)
      .json({ message: "User logged in successfully", token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
};

exports.addNote = async (req, res) => {
  try {
    // Check if user exist in database using the id verified coming from the auth middleware
    const id = req.user._id;
    const user = await User.findById({_id: id});

   // validate user
    if (!user) {
      return res.status(401).json({ message: "User is not authorized" });
    }
    const { title, description } = req.body;
    if (!title || !description)
      return res.status(400).json("input field required");
    const note = await Note.create({ title, description, userId: user._id });
    res.status(201).json(note);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
