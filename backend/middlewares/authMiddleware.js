import User from "../models/userModel.js";
import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

const authenticate = errorHandler(async(req, res, next) => {
    let token;
  
    // Read JWT from the 'jwt' cookie
    token = req.cookies.access_token;
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed.");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token.");
    }
  });
// authorization checking

const adminCheck = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { adminCheck, authenticate };
