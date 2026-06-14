import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchResource, isCodespaceApi } from '../api';

type Workout = {
  _id?: string;
  title?: string;
  description?: string;
  durationMinutes?: number;
  caloriesBurned?: number;
};

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource<Workout>('workouts')
      .then(setWorkouts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <p className="text-muted">
        API base: <code>{apiBaseUrl}</code>
      </p>
      {!isCodespaceApi && (
        <div className="alert alert-warning" role="alert">
          <strong>VITE_CODESPACE_NAME is not defined.</strong> The frontend is using a localhost fallback. Add it to <code>.env.local</code> when running in Codespaces.
        </div>
      )}
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {workouts.map((workout) => (
            <div key={workout._id ?? workout.title} className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.title || 'Unnamed Workout'}</h5>
                  <p className="card-text">{workout.description || 'No description'}</p>
                  <p className="mb-0">
                    Duration: {workout.durationMinutes ?? '—'} minutes
                  </p>
                  <p>Calories: {workout.caloriesBurned ?? '—'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
