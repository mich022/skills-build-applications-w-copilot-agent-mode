import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ activities: [] });
});

router.post('/', (req, res) => {
  const newActivity = req.body;
  res.status(201).json({ message: 'Activity logged', activity: newActivity });
});

export default router;
