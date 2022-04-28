import { app } from './app';

const start = async () => {
  app.listen(5001, () => { 
    console.log('Listening on port 5001');
  });
};

start();
