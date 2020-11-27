import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import indexRoute from './routes/index'
import path from 'path';


import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

const app = express();
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(indexRoute)
// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Export express instance
export default app;
