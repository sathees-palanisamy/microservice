import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate-request';
import { User } from '../../models/User';
import axios from 'axios';

const router = express.Router();

router.post(
  '/newuser',
  [
    body('id').not().isEmpty().withMessage('id is empty'),
    body('firstName').not().isEmpty().withMessage('firstName is empty'),
    body('lastName').not().isEmpty().withMessage('lastName is empty'),
    body('email').not().isEmpty().withMessage('email is empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id } = req.body;
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { email } = req.body;

    try {
    const { data } = await axios.post<User>('http://localhost:6000/user', { id,firstName, lastName, email })
    res.status(201).send(data);
    }catch(err) {
      res.status(500).send({});
    }
   
  }
);

export { router as createUserRouter };
