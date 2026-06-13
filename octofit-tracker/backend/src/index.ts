import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());
app.use('/api', routes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', port, mongoUrl });
});

async function start() {
  try {
    await mongoose.connect(mongoUrl);
    console.log(`Connected to MongoDB at ${mongoUrl}`);
    app.listen(port, () => {
      console.log(`OctoFit backend listening on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
}

start();
