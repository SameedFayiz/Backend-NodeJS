const jwt = require("jsonwebtoken");
require("dotenv").config();

const authJWT = async (req, res, next) => {
  console.log(req.headers);
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    console.log("token-->", token);
    if (token) {
      const isVerified = jwt.verify(token, process.env.jwtSecret);

      if (isVerified && isVerified.data) {
        req.user = isVerified.data;
        next();
      }
      throw Error;
      // } else {
      //   res.status(403).send({
      //     error: true,
      //     msg: "Token not valid",
      //     status: 403,
      //   });
      // }
    }
  } catch (error) {
    res.status(403).send({
      status: 403,
      error: true,
      msg: "Token not valid",
    });
  }
};

module.exports = authJWT;
