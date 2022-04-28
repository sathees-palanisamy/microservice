import axios from 'axios';
import express, { Request, Response } from 'express';
import { Donation } from '../../models/Donation';

const router = express.Router();

router.get('/donationlist', async (req: Request, res: Response) => {

  try {
    const { data } = await axios.get<Donation[]>("http://localhost:6000/donation");   
     res.status(201).send(data);
    }catch(err) {
      res.status(500).send({});
    }
  
});

export { router as listDonationRouter };
