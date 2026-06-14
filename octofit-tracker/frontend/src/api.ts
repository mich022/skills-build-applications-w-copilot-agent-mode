const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const apiBaseUrl = codespaceName && codespaceName.trim()
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const isCodespaceApi = Boolean(codespaceName && codespaceName.trim());

export async function fetchResource<T>(resource: string): Promise<T[]> {
  const url = `${apiBaseUrl}/${resource}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  const data =
    payload.data ||
    payload.items ||
    payload.results ||
    payload.users ||
    payload.activities ||
    payload.teams ||
    payload.workouts ||
    payload.leaderboard;

  return Array.isArray(data) ? data : [];
}
