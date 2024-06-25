import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const getToken = function (user) {
  return jwt.sign({ ...user }, process.env.SECRET_KEY, {
    expiresIn: 24 * 60 * 60 * 1000,
  });
};

export const Roles = {
  Director: ["director"],
  Admin: ["admin"],
  User: ["user"],
  Manager: ["manager"],
  Transporter: ["transporter"],
};

export default function authorize(roles = []) {
  if (!Array.isArray(roles)) roles = [roles];

  return (req, res, next) => {
    function sendError(msg) {
      return req.res.status(403).json({ message: msg });
    }
    try {
      const token =
        req.headers["Authorization"] || req.headers["authorization"];

      if (!token) return sendError("Error no token found !");
      if (token.indexOf("Bearer") != 0)
        return sendError("Error: Token format invalid");
      const tokenString = token.split(" ")[1];
      jwt.verify(tokenString, config.jwt.secret, (err, decodedToken) => {
        if (err) {
          console.log(err);
          return sendError("Error: Broken or Expired Token !");
        }
        console.log("Decoded Token:", decodedToken.dataValues.role);
        if (!decodedToken.dataValues.role)
          return sendError("Error : Role missing ! " + decodedToken.role);
        const userRole = decodedToken.dataValues.role;
        const allRoles = Object.values(Roles).flat();

        if (!allRoles.includes(userRole))
          return sendError("Error : User not authorized !");

        req.user = decodedToken.dataValues;
        next();
      });
    } catch (err) {
      console.log(err);
      return req.res.send
        .status(500)
        .json({ message: "Server error occoured !" });
    }
  };
}
