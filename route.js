import express from 'express';
import { validate } from './middleware/validate.js';
import controller from './src/controller.js';
import { getAnswer } from './validations/questionValidation.js';

const router = express.Router();

router.get('/fetch-question', validate(getAnswer), controller.fetchQuestion);
router.get('/fetch-question-list', controller.fetchQuestionList);

export default router;