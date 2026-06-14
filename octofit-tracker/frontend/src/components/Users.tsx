import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchResource, isCodespaceApi } from '../api';

type User = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  joinedAt?: string;
};

function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource<User>('users')
      .then(setUsers)
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
