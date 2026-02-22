import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  const [user, setUser] = useState(null); // { name: 'admin', role: 'admin' | 'user' }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-200">
        <Navbar user={user} setUser={setUser} />
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
    </Router>
  );
}

export default App;
