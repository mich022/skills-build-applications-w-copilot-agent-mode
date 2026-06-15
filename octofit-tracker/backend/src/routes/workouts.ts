import { Router } from 'express';
import { Workout } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().populate('user').lean();
  res.json({ workouts });
});

router.post('/', async (req, res) => {
  const newWorkout = await Workout.create(req.body);
  res.status(201).json({ message: 'Workout created', workout: newWorkout });
});

export default router;
