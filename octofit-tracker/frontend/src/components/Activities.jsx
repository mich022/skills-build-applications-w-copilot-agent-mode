import { useEffect, useState } from 'react';
import { apiBaseUrl, isCodespaceApi } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName && codespaceName.trim()
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    fetch(`${baseUrl}/activities`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch activities: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((payload) => {
        const data =
          payload.data ||
          payload.items ||
          payload.results ||
          payload.activities ||
          payload.users ||
          payload.teams ||
          payload.workouts ||
          payload.leaderboard;
        setActivities(Array.isArray(data) ? data : []);
      })
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
