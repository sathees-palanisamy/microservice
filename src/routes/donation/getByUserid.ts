import express, { Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found-error';
import { Donation } from '../../models/Donation';
import { validateRequest } from '../../middlewares/validate-request';
import axios from 'axios';

const router = express.Router();

router.get('/userdonations/:id',validateRequest,async (req: Request, res: Response) => {


  try {
    const { data } = await axios.get<Donation[]>(`http://localhost:6000/donation/?userid=${req.params.id}`)
    if (!data) {
      throw new NotFoundError();
    }

     res.status(201).send(data);
    }catch(err) {
      res.status(500).send({});
    }

});

export { router as getDonationsRouter };
