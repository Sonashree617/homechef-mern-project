import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    // Verify token
    console.log("SECRET:", process.env.JWT_SECRET);
console.log("TOKEN:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure decoded contains 'id' and 'role'
    if (!decoded.id) {
      return res.status(401).json({ message: "Invalid token: no user ID" });
    }

    req.user = {
      id: decoded.id,
      role: decoded.role || "user",
    };

    next();
  } catch (err) {
    console.log("AUTH ERROR", err);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;