const User = require("../model/user");
const SystemSetting = require("../model/systemSetting");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = { email: "", password: "" };

  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.cashirRegister = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userName, email, password } = req.body;
    console.log(req.body);
    const user = await User.create({
      email,
      password,
      userName,
      role: "cashir",
    });
    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { userName, email, password, expireDate } = req.body;
    const user = await User.create({
      email,
      password,
      userName,
      expireDate,
      role: "doctor",
    });

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    await SystemSetting.findOneAndUpdate(
      {},
      { mangerDoctor: user._id, expireDate: req.body.expireDate }
    );

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.editAcount = async (req, res, next) => {
  try {
    const userId = req.body.id; // Assuming the user ID is passed in the URL parameter
    console.log(req.body);
    // Update user information using the User.findByIdAndUpdate method or a similar method
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      { new: true } // To get the updated user object
    );
    if (req.body.expireDate) {
      await SystemSetting.findOneAndUpdate(
        {},
        {expireDate: req.body.expireDate }
      );
    }

    if (!updatedUser) {
      // Handle the case where the user with the given ID was not found
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: updatedUser, updated: true });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, status: false });
  }
};
