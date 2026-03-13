import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, Activity, ArrowRight, UserPlus } from 'lucide-react';

// --- Demo user database (simulates backend lookup) ---
// In production these come from MongoDB via /api/auth/login
const DEMO_USERS = [
    { email: 'admin@hospital.com', password: 'admin123', name: 'Dr. Admin Kumar', role: 'Admin', patientId: null },
    { email: 'doctor@hospital.com', password: 'doctor123', name: 'Dr. Arjun Smith', role: 'Doctor', patientId: null },
    { email: 'nurse@hospital.com', password: 'nurse123', name: 'Nurse Sarah Ali', role: 'Nurse', patientId: null },
    { email: 'patient@hospital.com', password: 'patient123', name: 'John Doe', role: 'Patient', patientId: 'PAT-001' },
    { email: 'user@hospital.com', password: 'user123', name: 'New User', role: 'User', patientId: null },
];

const ROLE_BADGE_COLORS = {
    Admin: 'text-blue-600   bg-blue-50   border-blue-200',
    Doctor: 'text-teal-600   bg-teal-50   border-teal-200',
    Nurse: 'text-pink-600   bg-pink-50   border-pink-200',
    Patient: 'text-purple-600 bg-purple-50 border-purple-200',
    User: 'text-gray-600   bg-gray-50   border-gray-200',
};

export default function Login({ onLogin }) {
    const [view, setView] = useState('login'); // 'login' | 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Helper: load all registered users from localStorage
    const getRegisteredUsers = () => {
        try {
            return JSON.parse(localStorage.getItem('ot_registered_users') || '[]');
        } catch { return []; }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) { setError('Please enter your email and password.'); return; }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            // First check hardcoded demo users
            let user = DEMO_USERS.find(
                u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
            );

            // Then check localStorage-registered users
            if (!user) {
                const registered = getRegisteredUsers();
                user = registered.find(
                    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
                );
            }

            if (user) {
                onLogin({ name: user.name, email: user.email, role: user.role, patientId: user.patientId || null });
            } else {
                setError('Invalid email or password. Please try again.');
            }
        }, 1000);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        if (!name || !email || !password || !confirmPassword) { setError('Please fill in all fields.'); return; }
        if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }

        // Check for duplicate email in demo users
        const alreadyDemo = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (alreadyDemo) { setError('An account with this email already exists.'); return; }

        // Check for duplicate email in registered users
        const registered = getRegisteredUsers();
        const alreadyRegistered = registered.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (alreadyRegistered) { setError('An account with this email already exists.'); return; }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            // Save new user to localStorage with default 'Patient' role
            const newUser = {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password,
                role: 'Patient',
                patientId: null,
                joinedOn: new Date().toISOString().split('T')[0],
            };
            const updatedList = [...registered, newUser];
            localStorage.setItem('ot_registered_users', JSON.stringify(updatedList));

            // Redirect to login with success message and pre-fill email
            setSuccess('Account created! You have been registered as a Patient. You can now log in.');
            setView('login');
            setEmail(newUser.email);  // pre-fill email so user can log in immediately
            setPassword('');
            setName('');
            setConfirmPassword('');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2563EB] via-blue-600 to-[#14B8A6] flex items-center justify-center p-4">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 rounded-full bg-white/5 -top-20 -left-20" />
                <div className="absolute w-80 h-80 rounded-full bg-white/5 bottom-10 right-10" />
                <div className="absolute w-48 h-48 rounded-full bg-white/10 top-1/2 left-1/4" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#2563EB] to-[#14B8A6] px-8 py-8 text-white text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Activity size={32} className="text-[#2563EB]" />
                        </div>
                        <h1 className="text-2xl font-bold">OT Scheduler</h1>
                        <p className="text-blue-100 text-sm mt-1">Hospital Management System</p>
                    </div>

                    <div className="px-8 py-8">
                        {/* Tab switcher */}
                        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                            <button onClick={() => { setView('login'); setError(''); setSuccess(''); }}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${view === 'login' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                                Sign In
                            </button>
                            <button onClick={() => { setView('register'); setError(''); setSuccess(''); }}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${view === 'register' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                                <UserPlus size={14} /> Register
                            </button>
                        </div>

                        {/* Success message */}
                        {success && (
                            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3">
                                ✅ {success}
                            </div>
                        )}

                        {/* Error message */}
                        {error && (
                            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                                ⚠ {error}
                            </div>
                        )}

                        {/* LOGIN FORM */}
                        {view === 'login' && (
                            <form onSubmit={handleLogin} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all" />
                                        <button type="button" onClick={() => setShowPass(!showPass)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button type="submit" disabled={loading}
                                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 mt-2">
                                    {loading
                                        ? <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                                        : <><span>Sign In</span><ArrowRight size={16} /></>
                                    }
                                </button>

                                {/* Demo credentials hint */}
                                <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Demo Credentials</p>
                                    <div className="space-y-1.5">
                                        {DEMO_USERS.filter(u => u.role !== 'User').map(u => (
                                            <button key={u.email} type="button"
                                                onClick={() => { setEmail(u.email); setPassword(u.password); }}
                                                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg border text-xs font-medium transition-all hover:shadow-sm ${ROLE_BADGE_COLORS[u.role]}`}>
                                                <span>{u.email}</span>
                                                <span className="font-bold">{u.role}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">Click any row to auto-fill credentials</p>
                                </div>
                            </form>
                        )}

                        {/* REGISTER FORM */}
                        {view === 'register' && (
                            <form onSubmit={handleRegister} className="space-y-4">
                                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-700">
                                    ℹ New accounts are registered as <strong>Patient</strong> by default. Contact the Admin to change your role if you are a Doctor or Nurse.
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)}
                                        placeholder="Dr. John Doe"
                                        className="w-full border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                                            placeholder="At least 6 characters"
                                            className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all" />
                                        <button type="button" onClick={() => setShowPass(!showPass)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                                    <div className="relative">
                                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                                            placeholder="Re-enter password"
                                            className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all" />
                                    </div>
                                </div>

                                <button type="submit" disabled={loading}
                                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70">
                                    {loading
                                        ? <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>
                                        : <><UserPlus size={16} /><span>Create Account</span></>
                                    }
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <p className="text-center text-white/50 text-xs mt-4">
                    Secure access for authorized hospital personnel only
                </p>
            </div>
        </div>
    );
}
