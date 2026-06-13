import { Router } from 'express';
import { LeaderboardEntry } from '../models';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').populate('team').lean();
  res.json({ leaderboard });
});

export default router;
