import express, { Application } from 'express';
import cors from 'cors';
import { UserRouter } from './app/modules/user/user.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use('/api/users', UserRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
export default app;
