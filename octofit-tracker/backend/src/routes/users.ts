import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ users: [] });
});

router.post('/', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created', user: newUser });
});

export default router;
