import vine, { errors } from "@vinejs/vine";
import { newsSchema } from "../validations/newsValidation.js";
import prisma from "../DB/db.config.js";

class NewsController {
  static async index(req, res) {
    try {
      let page = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 1;

      if (page <= 0) {
        page = 1;
      }
      if (limit <= 0 || limit > 10) {
        limit = 10;
      }
      //not skip the data from 1st page
      const skip = (page - 1) * limit;

      const news = await prisma.news.findMany({
        skip: skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      // Map the news to select only the required fields from the news model
      const result = news.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        image: item.image,
        user: item.user,
      }));

      const totalCount = await prisma.news.count();
      const totalPages = Math.ceil(totalCount / limit);

      res.status(200).json({
        status: "success",
        data: result,
        metaData:{
          totalPages: totalPages,
          currentPage: page,
          totalNews: totalCount,
          currentLimit:limit
        }
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the news." });
    }
  }

  static async store(req, res) {
    const user = req.user;
    const dataToCreate = { ...req.body };
    try {
      const validator = vine.compile(newsSchema);
      const payload = await validator.validate(dataToCreate);
      payload.user_id = user.id;
      console.log(dataToCreate);
      const news = await prisma.news.create({
        data:payload,
      });

      
      return res.status(201).json({
        message: "News created successfully",
        data: news,
       
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

  static async update(req, res) {}

  static async show(req, res) {}

  static async destroy(req, res) {}
}

export default NewsController;
