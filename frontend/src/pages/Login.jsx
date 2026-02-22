import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, User, Key, Mail, CheckCircle } from 'lucide-react';

export default function Login({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('user');

    // Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            // Logic for SignIn
            if (role === 'admin') {
                setUser({ name: 'Admin Account', role: 'admin' });
                navigate('/admin');
            } else {
                setUser({ name: email || 'Regular User', role: 'user' });
                navigate('/user');
            }
        } else {
            // Logic for Registration (Mock push to Node Backend)
            fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            })
                .then(res => res.json())
                .then(data => {
                    setRegistered(true);
                    setTimeout(() => {
                        setIsLogin(true);
                        setRegistered(false);
                        setEmail('');
                        setPassword('');
                    }, 2000);
                })
                .catch(e => console.error("Error connecting to server", e));
        }
    };

    return (
        <div className="flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 h-[80vh]">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl border border-gray-100 relative overflow-hidden">

                {registered && (
                    <div className="absolute inset-0 bg-green-500 z-50 flex flex-col items-center justify-center text-white p-10 text-center animate-fade-in">
                        <CheckCircle size={64} className="mb-4 text-green-200" />
                        <h2 className="text-2xl font-bold">Successfully Registered!</h2>
                        <p className="mt-2 text-sm text-green-100">Redirecting to login...</p>
                    </div>
                )}

                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 border-b pb-4">
                        {isLogin ? 'Sign in to platform' : 'Register New Member'}
                    </h2>
                    <p className="text-center text-sm text-gray-500 mt-2">
                        Using secure Node + Firebase Mock Services
                    </p>
                </div>
                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div className="flex justify-center flex-col gap-3">
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            className={`p-3 rounded-xl flex items-center justify-center gap-2 border-2 transition-all shadow-sm ${role === 'admin' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 hover:border-indigo-300'}`}
                        >
                            <ShieldAlert className="w-5 h-5" /> Admin Privilege
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('user')}
                            className={`p-3 rounded-xl flex items-center justify-center gap-2 border-2 transition-all shadow-sm ${role === 'user' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 hover:border-blue-300'}`}
                        >
                            <User className="w-5 h-5" /> Medical Staff / User Privilege
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                            <input required type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
                        </div>
                        <div className="relative">
                            <Key className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                            <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition-all"
                        >
                            {isLogin ? 'Sign In Confirm' : 'Complete Registration'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        {isLogin ? "Don't have an account? Register Now" : "Already have an account? Sign In"}
                    </button>
                </div>

            </div>
        </div>
    );
}
