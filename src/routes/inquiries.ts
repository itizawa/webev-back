import { Router, Response } from 'express';
import { body } from 'express-validator';
import { SlackNotificationService } from '../services/SlackNotificationService';
import { InquiryRepository } from '../infrastructure/InquiryRepository';
import { PostInquiryUseCase } from '../usecases/inquiry/PostInquiryUseCase';
import { apiValidatorMiddleware } from '../middlewares/api-validator';
import { WebevRequest } from '../interfaces/webev-request';

const router = Router();

const validator = {
  postInquiry: [
    body('type').isString().isLength({ min: 1 }),
    body('email')
      .if((value) => value != null)
      .isEmail(),
    body('text').isString().isLength({ min: 1 }),
  ],
};

export const inquiries = (): Router => {
  /**
   * @swagger
   * /inquiries/:
   *   post:
   *     description: create inquiries
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             type:
   *               type: string
   *             email:
   *               type: string
   *             text:
   *               type: string
   *     responses:
   *       200:
   *         description: Return inquiries after post
   */
  router.post('/', validator.postInquiry, apiValidatorMiddleware, async (req: WebevRequest, res: Response) => {
    const { type, email, text } = req.body;

    const inquiryRepository = new InquiryRepository();
    const slackNotificationService = new SlackNotificationService();
    const useCase = new PostInquiryUseCase(inquiryRepository, slackNotificationService);

    try {
      const result = await useCase.execute({ type, email, text });

      return res.status(200).json(result);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  });

  return router;
};
