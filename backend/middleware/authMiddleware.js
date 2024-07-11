import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  if ( req.headers.authorization === null || req.headers.authorization === undefined) {
  return res.status(401).json({ message: "Token not found" });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token || token === null || token === undefined) {

    return res
      .status(401)
      .json({ message: "You are not authorized to access this resource" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this resource" });
  }
};
export default authMiddleware;
