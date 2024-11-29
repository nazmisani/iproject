const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw { name: "Unauthorized" };

    const access_token = authorization.split(" ")[1];
    const payload = verifyToken(access_token);
    const user = await User.findOne({ where: { email: payload.email } });

    if (!user) throw { name: "Unauthorized" };

    req.loginInfo = {
      userId: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = authentication;
