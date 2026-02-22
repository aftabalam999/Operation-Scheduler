import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, User } from 'lucide-react';

export default function Login({ setUser }) {
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate authentication
        if (role === 'admin') {
            setUser({ name: 'Admin User', role: 'admin' });
            navigate('/admin');
        } else {
            setUser({ name: 'Regular User', role: 'user' });
            navigate('/user');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 h-[80vh]">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 border-b pb-4">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="flex justify-center flex-col gap-4">
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            className={`p-4 rounded-xl flex items-center justify-center gap-2 border-2 transition-all shadow-sm ${role === 'admin' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold' : 'border-gray-200 hover:border-indigo-300'}`}
                        >
                            <ShieldAlert className="w-5 h-5" /> Admin Login
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('user')}
                            className={`p-4 rounded-xl flex items-center justify-center gap-2 border-2 transition-all shadow-sm ${role === 'user' ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 hover:border-blue-300'}`}
                        >
                            <User className="w-5 h-5" /> User Login
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-md transition-all"
                        >
                            Sign In Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
