import { Router } from 'express';
import { Activity } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const newActivity = await Activity.create(req.body);
  res.status(201).json({ message: 'Activity logged', activity: newActivity });
});

export default router;
