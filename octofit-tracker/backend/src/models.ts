import { Schema, model, Types } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
  joinedAt: { type: Date, default: Date.now }
});

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

const ActivitySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  caloriesBurned: Number,
  createdAt: { type: Date, default: Date.now }
});

const LeaderboardEntrySchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  team: { type: Types.ObjectId, ref: 'Team' },
  score: { type: Number, default: 0 },
  rank: Number,
  updatedAt: { type: Date, default: Date.now }
});

const WorkoutSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: [{ name: String, reps: Number, sets: Number }],
  scheduledAt: Date,
  completed: { type: Boolean, default: false }
});

export const User = model('User', UserSchema);
export const Team = model('Team', TeamSchema);
export const Activity = model('Activity', ActivitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', LeaderboardEntrySchema);
export const Workout = model('Workout', WorkoutSchema);
