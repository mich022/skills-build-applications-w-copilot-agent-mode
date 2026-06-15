import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().lean();
  res.json({ users });
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body);
  res.status(201).json({ message: 'User created', user: newUser });
});

export default router;
