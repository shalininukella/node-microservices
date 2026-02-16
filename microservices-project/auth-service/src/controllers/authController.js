import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      role: req.body.role || "USER",
    });

    res.json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found");

  const ok = await bcrypt.compare(req.body.password, user.password);
  if (!ok) return res.status(401).send("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({ token });
};

export const validate = (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json(decoded);
  } catch {
    res.status(401).send("Invalid token");
  }
};
