import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express, { json, static as static_, urlencoded } from 'express';
import logger from 'morgan';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { connectToMongoDB } from './config/connectToDB.js';
import { verifyJWT } from './middleware/verifyJWT.js';
import { verifyManager } from './middleware/verifyManager.js';
import indexRouter from './routes/index.js';
import managerRouter from './routes/manager.js';
import userRouter from './routes/user.js';
import cors from 'cors';
config();

await connectToMongoDB(process.env.MONGODB_CONNECTION_URI);

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// view engine setupf
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(static_(join(__dirname, 'public')));
app.use(cors());

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/manager', verifyManager, managerRouter);


export default app;
