import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ teams: [] });
});

router.post('/', (req, res) => {
  const newTeam = req.body;
  res.status(201).json({ message: 'Team created', team: newTeam });
});

export default router;
