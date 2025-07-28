import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connect from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import notesRoutes from './routes/notesRoutes.js';
import errorHandler from './middleware/errorHandler.js';

connect();
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth',authRoutes)
app.use('/api/notes',notesRoutes)

app.use(errorHandler);

const app=express()
const PORT=3000





app.listen(PORT,()=>{
    console.log("App Started")
})