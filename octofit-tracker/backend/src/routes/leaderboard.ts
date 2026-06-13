import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ leaderboard: [] });
});

export default router;
