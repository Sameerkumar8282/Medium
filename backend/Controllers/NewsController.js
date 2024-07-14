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

      const news = await prisma.posts.findMany({
        where: {
          published: true
        },
        skip: skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          id: 'desc' // Sort by id in descending order
        }
      });
      // Map the news to select only the required fields from the news model
      const result = news.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        publishedAt:item.updatedAt,
        user: item.author,
      }));

      const totalCount = await prisma.posts.count();
      const totalPages = Math.ceil(totalCount / limit);

      res.status(200).json({
        status: "success",
        data: result,
        metaData: {
          totalPages: totalPages,
          currentPage: page,
          totalNews: totalCount,
          currentLimit: limit,
        },
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
      payload.author_id = user.id;
      payload.published = true;
      const news = await prisma.posts.create({
        data: payload,
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
      }else if (err.code === 'P2002' && err.meta.target.includes('title')) {
        return res.status(409).json({
          message: "A post with this title already exists. Please choose a different title."
        });
      }
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id;
      const user = req.user;
      const dataToUpdate = { ...req.body };
      const validator = vine.compile(newsSchema);
      const payload = await validator.validate(dataToUpdate);
      const news = await prisma.posts.update({
        where: { id: Number(id) ,
          author_id: Number(user.id)
        },
        data: payload,
      });
      return res.status(200).json({
        message: "News updated successfully",
        data: news,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.messages });
    }
  }

  static async show(req, res) {
    try {
      const id = req.params.id;
      const news = await prisma.posts.findUnique({
        where: { id: Number(id) },
        include:{
          author:{
             select:{
            id: true,
            name: true,
          }
        }
      }
      });
      return res.status(200).json({
        message: "News fetched successfully",
        data: news,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }

  static async destroy(req, res) {
    try {
      const id = req.params.id;
      const news = await prisma.posts.delete({
        where: { id: id },
      });
      return res.status(200).json({
        message: "News deleted successfully",
        data: news,
        });
    } catch (error) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
}

export default NewsController;
