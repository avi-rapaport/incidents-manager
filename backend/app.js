import 'dotenv/config';
import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { router as authRouter } from './routes/auth.routes.js';
import { router as incidentsRouter } from './routes/incidents.routes.js';
import { initIo } from './utils/socket.js';
import { errorHandler } from './utils/errorHandler.js';

const PORT = process.env.PORT || 3000;

const app = express();
const httpServer = http.createServer(app);
initIo(httpServer);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN,
  })
);
app.use(cookieParser());
app.use(helmet());

app.use('/auth', authRouter);
app.use('/incidents', incidentsRouter);

app.use((req, res) => {
  res.status(404).json(`${req.url} doesn't have ${req.method} method!`);
});

app.use(errorHandler);

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${3000}...`);
});
