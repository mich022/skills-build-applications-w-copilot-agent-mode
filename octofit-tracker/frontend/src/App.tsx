import { NavLink, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBaseUrl = codespaceName && codespaceName.trim()
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Home() {
  return (
    <div className="container py-5">
      <h1>OctoFit Tracker</h1>
      <p className="lead">
        Modern fitness tracker frontend built with React 19, Vite, and Bootstrap.
      </p>
      <div className="alert alert-info">
        <p className="mb-1">
          API base: <code>{apiBaseUrl}</code>
        </p>
        <p className="mb-0">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the
          GitHub Codespaces API URL. Otherwise, the app falls back to <code>http://localhost:8000/api</code>.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofitNavbar"
            aria-controls="octofitNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofitNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {['', 'users', 'activities', 'teams', 'workouts', 'leaderboard'].map((path) => (
                <li key={path} className="nav-item">
                  <NavLink
                    to={path ? `/${path}` : '/'}
                    end={path === ''}
                    className={({ isActive }) =>
                      `nav-link${isActive ? ' active' : ''}`
                    }
                  >
                    {path === '' ? 'Home' : path.charAt(0).toUpperCase() + path.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
