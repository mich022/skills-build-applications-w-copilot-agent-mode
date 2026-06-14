import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchResource, isCodespaceApi } from '../api';

type Activity = {
  _id?: string;
  type?: string;
  durationMinutes?: number;
  distanceKm?: number;
  caloriesBurned?: number;
  createdAt?: string;
  user?: { name?: string; email?: string };
};

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource<Activity>('activities')
      .then(setActivities)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <p className="text-muted">
        API base: <code>{apiBaseUrl}</code>
      </p>
      {!isCodespaceApi && (
        <div className="alert alert-warning" role="alert">
          <strong>VITE_CODESPACE_NAME is not defined.</strong> The frontend is using a localhost fallback. Add it to <code>.env.local</code> when running in Codespaces.
        </div>
      )}
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.createdAt}`}>
                  <td>{activity.type || '—'}</td>
                  <td>{activity.user?.name || activity.user?.email || 'Unknown'}</td>
                  <td>{activity.durationMinutes ?? '—'} min</td>
                  <td>{activity.distanceKm ?? '—'} km</td>
                  <td>{activity.caloriesBurned ?? '—'}</td>
                  <td>{activity.createdAt ? new Date(activity.createdAt).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
