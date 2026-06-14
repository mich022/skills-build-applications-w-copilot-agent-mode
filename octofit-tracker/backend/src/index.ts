import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const host = process.env.HOST || '0.0.0.0';
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${port}`;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());
app.use('/api', routes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', port, host, apiBaseUrl, mongoUrl });
});

async function start() {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`Connected to MongoDB at ${mongoUrl}`);
    app.listen(port, host, () => {
      console.log(`OctoFit backend listening on ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
}

start();
