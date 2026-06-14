import { useEffect, useState } from 'react';
import { apiBaseUrl, isCodespaceApi } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName && codespaceName.trim()
      ? `https://${codespaceName}-8000.app.github.dev/api`
      : 'http://localhost:8000/api';

    fetch(`${baseUrl}/leaderboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch leaderboard: ${response.status} ${response.statusText}`);
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
        setEntries(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <p className="text-muted">
        API base: <code>{apiBaseUrl}</code>
      </p>
      {!isCodespaceApi && (
        <div className="alert alert-warning" role="alert">
          <strong>VITE_CODESPACE_NAME is not defined.</strong> The frontend is using a localhost fallback. Add it to <code>.env.local</code> when running in Codespaces.
        </div>
      )}
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? `${entry.rank}-${entry.points}`}>
                  <td>{entry.rank ?? '—'}</td>
                  <td>{entry.user?.name || 'Unknown'}</td>
                  <td>{entry.points ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
