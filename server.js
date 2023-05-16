import express from 'express';
import cors from 'cors';
import router from './routes/ArticleRoutes.js';
import AuthRouter from './routes/AuthRoutes.js';
import bodyParser from 'body-parser';
import fs from 'fs';
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log("Backend server live on " + port));
import connectDB from './config/dbConnect.js';
import Auth from './middlewares/authentification/authMiddleware.js';
const directory = './uploads';

if (!fs.existsSync(directory)){
    fs.mkdirSync(directory);
}
connectDB();
app.use('/articles',Auth,router);
app.use('/', AuthRouter);