const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const RegisterValidator = require("../validation/Register");
const LoginValidator = require("../validation/Login");

exports.Register = async (req, res) => {
  //Check if value is not provide , Show error
  const { errors, isValid } = RegisterValidator(req.body);
  if (!isValid) return res.status(400).send(errors);
  //Find Existing email if found , show error message
  let user;
  user = await User.findOne({ email: req.body.email });
  errors.email = "User already registered";
  if (user) return res.status(400).send(errors);
  //create new user
  user = new User(req.body);
  //hasing pasword
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  //save database
  user = await user.save();
  res.send(user);
};

exports.Login = async (req, res) => {
  //Check if value is not provide , Show error message
  const { errors, isValid } = LoginValidator(req.body);
  if (!isValid) return res.status(400).send(errors);
  //Find Existing email if found , create login
  let user = await User.findOne({ email: req.body.email });
  // if doesn't found email , show error message
  // errors.email = "Invalid Email";
  if (!user) return res.status(400).send(errors);
  errors.email = "Email is invalid";

  // compare password , if password match , create token
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  // if doesn't found password , show error message
  errors.password = "Invalid password";
  if (!validPassword) return res.status(400).send(errors);
  //generate token for user data
  user.generateToken((err, user) => {
    if (err) return res.status(400).send(err);
    res
      .cookie("w_auth", user.token)
      .status(200)
      .send(user.token);
  });
};

exports.Logout = async (req, res) => {
  let user = await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
  if (!user) return res.status(400).send("Invalid ID with logout");
  res.status(200).send({
    success: true
  });
};

exports.User = async (req, res) => {
  // const user = await User.findById(req.user._id).select("-password -token");
  res.status(200).send({
    isAuth: true,
    isAdmin: true,
    cart: req.user.cart,
    history: req.user.history,
    name: req.user.name,
    email: req.user.email
  });
};
