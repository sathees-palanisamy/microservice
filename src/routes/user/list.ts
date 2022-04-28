import axios from 'axios';
import express, { Request, Response } from 'express';
import { User } from '../../models/User';

const router = express.Router();

router.get('/userlist', async (req: Request, res: Response) => {

  try {
    const { data } = await axios.get<User[]>("http://localhost:6000/user");   
     res.status(201).send(data);
    }catch(err) {
      res.status(500).send({});
    }
  
});

export { router as listUserRouter };
