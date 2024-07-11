import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./CustomeErrorReporter.js";

vine.errorReporter = () => new CustomErrorReporter();

export const newsSchema = vine.object({
  title : vine.string().minLength(10).maxLength(250),
  content: vine.string().minLength(10).maxLength(40000),
})
