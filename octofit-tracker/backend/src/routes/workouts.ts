import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ workouts: [] });
});

router.post('/', (req, res) => {
  const newWorkout = req.body;
  res.status(201).json({ message: 'Workout created', workout: newWorkout });
});

export default router;
