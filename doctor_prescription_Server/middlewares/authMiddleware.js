const User = require("../model/user");
const jwt = require("jsonwebtoken");
const SystemSetting = require("../model/systemSetting"); // Make sure to adjust the path as needed

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  const pharmaceuticalCount = await SystemSetting.findOne({});

  if (token) {
    jwt.verify(
      token,
      "kishan sheth super secret key",
      async (err, decodedToken) => {
        if (err) {
          res.json({ status: false });
          next();
        } else {
          const user = await User.findById(decodedToken.id);
          if (user)
            res.json({
              status: true,
              user: user.email,
              userId: user._id,
              userName: user.userName,
              role: user.role,
              expireDate: pharmaceuticalCount.expireDate,
            });
          else res.json({ status: false });
          next();
        }
      }
    );
  } else {
    res.json({ status: false });
    next();
  }
};
