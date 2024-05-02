import express, { Express } from "express";
import { Request, Response, NextFunction } from "express";
import 'dotenv/config';
import cors from 'cors';
import authRouter from './routes/user-router'
// import logger from 'morgan';

const app: Express = express();

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// app.use(logger(formatsLogger))
app.use(cors());
app.use(express.json());

app.use('/users',  authRouter)



app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not found' })
  })
  
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = 'Server error' } = err ;
    res.status(status).json({ message })
  })

export default app;