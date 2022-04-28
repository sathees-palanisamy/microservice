import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { Donation } from '../../models/Donation';
import axios from 'axios';

const router = express.Router();

router.post(
  '/newdonation',
  [
    body('id').not().isEmpty().withMessage('id is empty'),
    body('userid').not().isEmpty().withMessage('userid is empty'),
    body('amount').not().isEmpty().withMessage('amount is empty'),
    body('tip').not().isEmpty().withMessage('tip is empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const { userid } = req.body;
    const { amount } = req.body;
    const { tip } = req.body;

    console.log('id:' + id);
    console.log('userid:' + userid);
    console.log('amount:' + amount);
    console.log('tip:' + tip);

    try {
    const { data } = await axios.post<Donation>('http://localhost:6000/donation', { id,userid, amount, tip })
    res.status(201).send(data);
    }catch(err) {
      console.log('err:' + err);
      res.status(500).send({});
    }
   
  }
);

export { router as createDonationRouter };
