import mongoose from 'mongoose';
import { User, Team, Activity, LeaderboardEntry, Workout } from '../models';

// Seed the octofit_db database with test data
async function seed() {
  const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  await mongoose.connect(mongoUrl);
  console.log(`Connected to ${mongoUrl}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const users = await User.create([
    { name: 'Alex Rivera', email: 'alex@octofit.com', role: 'athlete' },
    { name: 'Maya Chen', email: 'maya@octofit.com', role: 'coach' },
    { name: 'Noah Patel', email: 'noah@octofit.com', role: 'athlete' }
  ]);

  const teams = await Team.create([
    { name: 'Velocity Vipers', description: 'Fast-paced runners team', members: [users[0]._id, users[2]._id] },
    { name: 'Fit Force', description: 'Strength and conditioning crew', members: [users[1]._id] }
  ]);

  const activities = await Activity.create([
    { user: users[0]._id, type: 'running', durationMinutes: 45, distanceKm: 8.2, caloriesBurned: 520 },
    { user: users[2]._id, type: 'cycling', durationMinutes: 60, distanceKm: 20, caloriesBurned: 680 },
    { user: users[1]._id, type: 'yoga', durationMinutes: 30, caloriesBurned: 160 }
  ]);

  const leaderboard = await LeaderboardEntry.create([
    { user: users[0]._id, team: teams[0]._id, score: 980, rank: 1 },
    { user: users[2]._id, team: teams[0]._id, score: 860, rank: 2 },
    { user: users[1]._id, team: teams[1]._id, score: 740, rank: 3 }
  ]);

  const workouts = await Workout.create([
    {
      user: users[0]._id,
      title: 'Morning HIIT Session',
      focus: 'Cardio',
      durationMinutes: 35,
      exercises: [
        { name: 'Jumping jacks', reps: 40, sets: 3 },
        { name: 'Burpees', reps: 15, sets: 4 }
      ],
      scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 2)
    },
    {
      user: users[2]._id,
      title: 'Endurance Ride',
      focus: 'Cycling',
      durationMinutes: 60,
      exercises: [{ name: 'Steady pace cycling', reps: 1, sets: 1 }],
      completed: true
    }
  ]);

  console.log('Seed data created:', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    leaderboard: leaderboard.length,
    workouts: workouts.length
  });

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB. Seed complete.');
}

seed().catch(error => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
