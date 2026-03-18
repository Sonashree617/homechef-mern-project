import jwt from "jsonwebtoken";

const token = jwt.sign(
  { id: "69b596b0287918bf59d90285", role: "user" }, 
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

console.log(token);