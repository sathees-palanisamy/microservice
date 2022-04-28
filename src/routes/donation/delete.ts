import express, { Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found-error';
import { Donation } from '../../models/Donation';
import { validateRequest } from '../../middlewares/validate-request';
import axios from 'axios';

const router = express.Router();

router.delete('/deletedonation/:id',validateRequest,async (req: Request, res: Response) => {

  try {
    const { data } = await axios.delete<Donation>(`http://localhost:6000/donation/${req.params.id}`)
    if (!data) {
      throw new NotFoundError();
    }

     res.status(201).send(data);
    }catch(err) {
      res.status(500).send({});
    }

});

export { router as deleteDonationRouter };
