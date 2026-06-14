import { useEffect, useState } from 'react';
import { apiBaseUrl, fetchResource, isCodespaceApi } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource('teams')
      .then(setTeams)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <p className="text-muted">
        API base: <code>{apiBaseUrl}</code>
      </p>
      {!isCodespaceApi && (
        <div className="alert alert-warning" role="alert">
          <strong>VITE_CODESPACE_NAME is not defined.</strong> The frontend is using a localhost fallback. Add it to <code>.env.local</code> when running in Codespaces.
        </div>
      )}
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id ?? team.name} className="list-group-item">
              <h5>{team.name || 'Unnamed Team'}</h5>
              <p className="mb-0">
                Members: {team.members?.map((member) => member.name).join(', ') || 'None'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
