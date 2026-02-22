import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function AppLayout({ user, setUser }) {
  const location = useLocation();
  const isDashboard = location.pathname.includes('/admin') || location.pathname.includes('/user');

  return (
    <div className={`min-h-screen flex flex-col font-sans text-slate-900 selection:bg-blue-200 ${isDashboard ? 'bg-[#f8f6f2]' : 'bg-slate-50'}`}>
      {!isDashboard && <Navbar user={user} setUser={setUser} />}
      <main className="flex-1 w-full flex flex-col relative z-0 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/admin"
            element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/user"
            element={user && user.role === 'user' ? <UserDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null); // { name: 'admin', role: 'admin' | 'user' }

  return (
    <Router>
      <AppLayout user={user} setUser={setUser} />
    </Router>
  );
}

export default App;
