import { spawn, spawnSync } from "child_process";
import Question from "../model/question.js";
import { ApiError } from "../utils/apiError.js";

export default {
  fetchQuestion: async (filter) => {
    try {

      let resultData = "";
      let result = "";

      const pythonProgress = spawnSync("python", [
        "app.py",
        filter?.model,
        filter?.question,
      ]);

      if (pythonProgress.status !== 0) {
        throw new ApiError(400, "Something went wrong", "Response time out");
      };

      resultData += pythonProgress.output.join('');
      const jsonResult = JSON.parse(resultData);

      if (jsonResult.error) {
        throw new ApiError(400, "Something went wrong", resultData);
      };

      for (const [question, answer] of Object.entries(jsonResult)) {
        const newQuestionAnswer = new Question({ question, answer });
        result = await newQuestionAnswer.save();
        return result;
      };
    } catch (error) {
      throw error;
    };
  },
  fetchQuestionList: async (filter) => {
    try {
      const result = await Question.find().sort({ createdAt: -1 });
      if (!result.length) {
        throw new ApiError(404, "Question not found", null);
      }
      return result;
    } catch (error) {
      throw error;
    }
  },
};
