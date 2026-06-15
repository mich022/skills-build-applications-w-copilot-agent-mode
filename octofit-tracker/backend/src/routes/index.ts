import { Router } from 'express';
import users from './users';
import teams from './teams';
import activities from './activities';
import leaderboard from './leaderboard';
import workouts from './workouts';

const router = Router();
router.use('/users', users);
router.use('/teams', teams);
router.use('/activities', activities);
router.use('/leaderboard', leaderboard);
router.use('/workouts', workouts);

export default router;
