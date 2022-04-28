import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { createUserRouter } from './routes/user/new';
import { showUserRouter } from './routes/user/show';
import { listUserRouter } from './routes/user/list';
import { updateUserRouter } from './routes/user/update';
import { createDonationRouter } from './routes/donation/new';
import { showDonationRouter } from './routes/donation/show';
import { listDonationRouter } from './routes/donation/list';
import { updateDonationRouter } from './routes/donation/update';
import { getDonationsRouter } from './routes/donation/getByUserid';
import { deleteUserRouter } from './routes/user/delete';
import { deleteDonationRouter } from './routes/donation/delete';
const cors = require('cors');

const app = express();
app.use(json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
})

/* User Router */
app.use(createUserRouter);
app.use(showUserRouter);
app.use(listUserRouter);
app.use(updateUserRouter);
app.use(deleteUserRouter);

/* Donation Router */
app.use(createDonationRouter);
app.use(showDonationRouter);
app.use(listDonationRouter);
app.use(updateDonationRouter);
app.use(deleteDonationRouter);
app.use(getDonationsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
