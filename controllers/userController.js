const User = require("../models/User");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors/index");
const { StatusCodes } = require("http-status-codes");
const { createTokenUser, attachCookiesToReponse, checkPermissions } = require("../utils/index");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  if (!users) {
    throw new NotFoundError("No users exist!");
  }

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUsers = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    return res.send(StatusCodes.NOT_FOUND).json({ msg: "token not found!" });
  }
  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).send(req.user);
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) throw new BadRequestError("Please enter both fields!");

  const user = await User.findOneAndUpdate(
    {
      _id: req.user.userId,
    },
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  const tokenUser = createTokenUser(user);
  attachCookiesToReponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    throw new NotFoundError("Please enter all the fields!");
  let user = await User.findOne({ _id: req.user.userId });

  if (!user.comparePassword(oldPassword))
    throw new UnauthorizedError("Please enter the correct password!");

  user.password = newPassword;

  try {
    await user.save();
    res
      .status(StatusCodes.OK)
      .json({ msg: "Successfully updated the password!" });
  } catch (error) {
    throw new BadRequestError("Failed saving the new user password!");
  }
};

module.exports = {
  getAllUsers,
  getSingleUsers,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
