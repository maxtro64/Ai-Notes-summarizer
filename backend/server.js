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

// Initialize express app FIRST
const app = express();

// Connect to database
connect();

// Middleware
app.use(cors({
  origin: 'https://ai-notes-summarizer-jstr.vercel.app',
  credentials: true
}));


app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Error handler
app.use(errorHandler);

const PORT =  process.env.PORT ;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);
});
