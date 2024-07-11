import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine";

class ProfileController {
  static async index(req, res) {
    try {
      const user = req.user;
      const profile = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      return res.status(200).json({
        message: "User Fetched!",
        data: profile,
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

  static async update(req, res) {
    try {
      const { id } = req.params;
      const dataToUpdate = { ...req.body };

      const existingUser = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      delete dataToUpdate.password
      delete dataToUpdate.email
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: dataToUpdate,
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
  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      await prisma.user.delete({
        where: { id: Number(id) },
      });
      return res.json({ message: "Profile deleted" });
    } catch (error) {}
  }
}

export default ProfileController;
