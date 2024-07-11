import vine, { errors } from "@vinejs/vine";
import prisma from "../DB/db.config.js";
import { loginSchema, registerSchema } from "../validations/authValidtion.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  static async register(req, res) {
    const dataToCreate = req.body;
    try {
      const validator = vine.compile(registerSchema);
      const payload = await validator.validate(dataToCreate);

      // * Check if email Exist
      const emailExist = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (emailExist) {
        return res.status(400).json({ message: "Email already exist" });
      }

      // * Encrypt the pass
      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);

      const user = await prisma.user.create({
        data: payload,
      });

      res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        console.log(err.messages);
        return res
          .status(400)
          .json({ message: "Validation error", errors: err.messages });
      }
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    try {

      const validator = vine.compile(loginSchema)
      const payload = await validator.validate({ email, password })
      const user = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
     
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ id: user.id,
        email: user.email,
        profile:user.profile
       }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      delete user.password
      res.status(200).json({ message: "Login successfully", token:`Bearer ${token}`,
        data:user
       });
    } catch (err) {
      if (err instanceof errors.E_VALIDATION_ERROR) {
        console.log(err.messages);
        return res
          .status(400)
          .json({ message: "Validation error", errors: err.messages });
      }
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
}

export default AuthController;
