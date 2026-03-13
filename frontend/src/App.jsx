import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Surgeries from './pages/Surgeries';
import CalendarPage from './pages/CalendarPage';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Resources from './pages/Resources';
import Reports from './pages/Reports';
import Login from './pages/Login';
import PatientPortal from './pages/PatientPortal';
import UserManagement from './pages/UserManagement';

// Shown to newly registered users with no role yet
function PendingRolePage({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-md p-10 max-w-md text-center">
        <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">⏳</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Awaiting Role Assignment</h2>
        <p className="text-gray-500 text-sm mb-4">
          Welcome, <strong>{user.name}</strong>! Your account has been created successfully. An Administrator will assign your role (Doctor, Nurse, or Patient) shortly.
        </p>
        <p className="text-gray-400 text-xs mb-6">Once assigned, log in again to access your dashboard.</p>
        <button onClick={onLogout} className="bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-semibold transition-all">
          Sign Out
        </button>
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={(u) => setUser(u)} />;
  }

  // Patient → Patient Portal (no sidebar)
  if (user.role === 'Patient') {
    return <PatientPortal user={user} onLogout={() => setUser(null)} />;
  }

  // Newly registered users with no real role yet
  if (user.role === 'User') {
    return <PendingRolePage user={user} onLogout={() => setUser(null)} />;
  }

  // Admin / Doctor / Nurse → Full sidebar layout
  return (
    <Router>
      <div className="flex bg-[#F3F4F6] min-h-screen font-sans text-[#111827]">
        <Sidebar user={user} onLogout={() => setUser(null)} />
        <div className="flex-1 ml-64 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/surgeries" element={<Surgeries />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/reports" element={<Reports />} />
            {/* Admin only */}
            {user.role === 'Admin' && (
              <Route path="/users" element={<UserManagement />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
