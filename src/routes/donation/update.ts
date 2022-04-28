import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {validateRequest} from '../../middlewares/validate-request';
import {NotFoundError} from '../../errors/not-found-error';
import { Donation } from '../../models/Donation';
import axios from 'axios';

const router = express.Router();

router.patch(
  '/updatedonation/:id',
  [
    body('amount').not().isEmpty().withMessage('amount is empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { amount } = req.body;

    try {
      const { data } = await axios.patch<Donation>(`http://localhost:6000/donation/${req.params.id}`, { amount })
      if (!data) {
        throw new NotFoundError();
      }
  
       res.status(201).send(data);
      }catch(err) {
        res.status(500).send({});
      }
      
  }
);

export { router as updateDonationRouter };
