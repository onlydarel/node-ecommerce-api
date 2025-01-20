const { required } = require("joi");
const { UnauthorizedError, UnauthenticatedError } = require("../errors/index");
const { isTokenValid } = require("../utils");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError("Authentication Failed/Invalid");
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Failed/Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthenticatedError("Authentication Failed/Invalid");

    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
