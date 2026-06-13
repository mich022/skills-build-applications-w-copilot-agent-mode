import { Router } from 'express';
import { Team } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ teams });
});

router.post('/', async (req, res) => {
  const newTeam = await Team.create(req.body);
  res.status(201).json({ message: 'Team created', team: newTeam });
});

export default router;
