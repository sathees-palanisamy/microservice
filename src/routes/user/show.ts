import express, { Request, Response } from 'express';
import { NotFoundError } from '../../errors/not-found-error';
import { User } from '../../models/User';
import { validateRequest } from '../../middlewares/validate-request';
import axios from 'axios';

const router = express.Router();

router.get('/getuser/:id',validateRequest,async (req: Request, res: Response) => {

  try {
    const { data } = await axios.get<User>(`http://localhost:6000/user/${req.params.id}`)
    if (!data) {
      throw new NotFoundError();
    }

     res.status(201).send(data);
    }catch(err) {
      res.status(500).send({});
    }

});

export { router as showUserRouter };
