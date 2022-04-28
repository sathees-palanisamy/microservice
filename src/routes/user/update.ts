import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {validateRequest} from '../../middlewares/validate-request';
import {NotFoundError} from '../../errors/not-found-error';
import { User } from '../../models/User';
import axios from 'axios';

const router = express.Router();

router.patch(
  '/updateuser/:id',
  [
    body('email').not().isEmpty().withMessage('email is empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

    const { email } = req.body;

    try {
      const { data } = await axios.patch<User>(`http://localhost:6000/user/${req.params.id}`, { email })
      if (!data) {
        throw new NotFoundError();
      }
  
       res.status(201).send(data);
      }catch(err) {
        res.status(500).send({});
      }
      
  }
);

export { router as updateUserRouter };
