import { ApiError } from "../utils/apiError.js";
import { pick } from "../utils/pick.js";
import service from "./service.js";

export default {
  fetchQuestion: async (req, res, next) => {
    try {
      const filter = pick(req.query, ["model", "question"]);
      const result = await service.fetchQuestion(filter);
      return res.status(200).json({
        success: true,
        message: "Answer fetch successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  },
  fetchQuestionList: async (req, res, next) => {
    try {
      const filter = pick(req.query, ["question"]);
      const result = await service.fetchQuestionList(filter);
      return res.status(200).json({
        success: true,
        message: "Questions fetch successfully",
        result: result,
      });
    } catch (error) {
      next(error);
    }
  },
};
