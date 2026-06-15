import { useEffect, useState } from 'react';
import { apiBaseUrl, isCodespaceApi } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const baseUrl = codespaceName && codespaceName.trim()
      ? `https://${codespaceName}-8000.app.github.dev/api/users`
      : 'http://localhost:8000/api/users';

    fetch(baseUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
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
        setUsers(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <p className="text-muted">
        API base: <code>{apiBaseUrl}</code>
      </p>
      {!isCodespaceApi && (
        <div className="alert alert-warning" role="alert">
          <strong>VITE_CODESPACE_NAME is not defined.</strong> The frontend is using a localhost fallback. Add it to <code>.env.local</code> when running in Codespaces.
        </div>
      )}
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.email}>
                  <td>{user.name || 'Unknown'}</td>
                  <td>{user.email || '—'}</td>
                  <td>{user.role || '—'}</td>
                  <td>{user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
