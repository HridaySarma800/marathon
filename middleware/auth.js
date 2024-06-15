import jwt from "jsonwebtoken";
import config from "../config/index.js";

const authorize = function (roles = []) {
  if (!Array.isArray(roles)) {
    roles = [roles];
    return (req, res, next) => {
      function sendError(msg) {
        return req.res.status(403).json({ message: msg });
      }
    };
  }

  try {
    const token = req.headers["Authorization"] || req.headers["authorization"];

    if (!token) return sendError("Error no token");
    if (token.indexOf("Bearer") != 0)
      return sendError("Error: Token format invalid");
    const tokenString = token.split(" ")[1];
    jwt.verify(tokenString, config.jwt.secret, (err, decodedToken) => {
      if (err) {
        console.log(err);
        return sendError("Error: Broken or Expired Token !");
      }
      if (!decodedToken.role) return sendError("Error : Role missing !");
      const userRole = decodedToken.role;
      if (roles.indexOf(userRole) === -1)
        return sendError("Error : User not authorized !");

      req.user = decodedToken;
      next();
    });
  } catch (err) {
    console.log(err);
    return req.res.send
      .status(500)
      .json({ message: "Server error occoured !" });
  }
};
const getToken = function (user) {
  return jwt.sign({ ...user }, process.env.SECRET_KEY, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
};

const Roles = {
  Director: ["director"],
};

export default {
    authorize,
    Roles,
    getToken
}