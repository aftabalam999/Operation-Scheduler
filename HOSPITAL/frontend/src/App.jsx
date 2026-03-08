import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import DoctorsList from './components/DoctorsList';
import PatientsList from './components/PatientsList';
import ScheduleForm from './components/ScheduleForm';
import UsersList from './components/UsersList';
import DoctorProfile from './components/DoctorProfile';

function MainLayout({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar" style={{ padding: '1rem 3rem' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.8rem' }}>🏥</span> OT Scheduler
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              {user.role === 'Admin' && (
                <>
                  <Link to="/doctors">Doctors</Link>
                  <Link to="/patients">Patients</Link>
                  <Link to="/schedule/new">Post Schedule</Link>
                  <Link to="/users">Users</Link>
                </>
              )}
              {user.role === 'Doctor' && (
                <>
                  <Link to="/profile">My Profile</Link>
                  <Link to="/doctors">Medical Staff</Link>
                  <Link to="/patients">Patients</Link>
                </>
              )}
              {user.role === 'User' && (
                <>
                  <Link to="/doctors">Find Doctor</Link>
                </>
              )}
              <span style={{ color: 'var(--border)' }}>|</span>
              <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{user.name}</span>
              <button className="btn btn-danger" onClick={logoutHandler} style={{ padding: '0.5rem 1rem' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn" style={{ color: 'white' }}>Register</Link>
            </>
          )}
        </div>
      </nav>
      <main className="container animate-fade-in">
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<DoctorProfile />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/patients" element={<PatientsList />} />
          <Route path="/schedule/new" element={<ScheduleForm />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
