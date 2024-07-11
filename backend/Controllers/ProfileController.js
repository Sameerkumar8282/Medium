import { generateRandomNum, imageValidator } from "../utils/helper.js";
import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine";

class ProfileController {
  static async index(req, res) {
    try {
      const user = req.user;
      return res.status(200).json({
        message: "User Fetched!",
        data: user,
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
  static async store(req, res) {}
  static async show(req, res) {}
  static async update(req, res) {
    try {
      const { id } = req.params;
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "No files were uploaded." });
      }
      const profile = req.files.profile;
      const message = imageValidator(profile?.size, profile.mimetype);
      console.log(message);
      if (!message) {
        return res.status(400).json({ message: message });
      }

      const imgExt = profile?.name.split(".");

      const imageName = generateRandomNum() + "." + imgExt[1];

      const uploadPath = process.cwd() + "/public/images/" + imageName;
      profile.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
      });

      const updatedUser = await prisma.user.update({
        where: { id:Number(id) },
        data: { profile: imageName },
      });

      return res.json({
        message: "Profile Updated",
        data: updatedUser,
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
  static async destroy(req, res) {}
}

export default ProfileController;
