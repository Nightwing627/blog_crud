import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import dao from './repositories/dao';
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blogs.routes';

const port = 3000;
export const app = express();

app.listen(port, () => console.log(`Blog posting app listening on port ${port}!`));
app.use(express.json())
app.use(bodyParser.urlencoded())

//  Script to setup sqlite DB in memory //
dao.setupDbForDev();
////////////////////////////////////

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);