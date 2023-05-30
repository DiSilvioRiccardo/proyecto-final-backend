const jwt = require("jsonwebtoken");
import User from "./user/user.model";

export async function verifyToken (req, res, next) {
    const token =
      req.headers.authorization;

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
      req.user = await User.findById(decoded.user_id);
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
};