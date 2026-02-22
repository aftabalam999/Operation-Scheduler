import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <div className="bg-blue-700 p-1.5 rounded-lg shadow-sm shadow-blue-700/20">
                                <Activity className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900">Medi<span className="text-blue-700">Track</span> OS</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="hidden md:flex flex-col text-right mr-4 border-r border-slate-200 pr-5 py-1">
                                    <span className="text-sm font-bold text-slate-900">{user.name || 'Staff Member'}</span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.role === 'admin' ? 'Systems Admin' : 'Clinical Staff'}</span>
                                </div>
                                <Link to={user.role === 'admin' ? '/admin' : '/user'} className="text-slate-600 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-semibold transition-colors">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 text-sm font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg text-white bg-blue-700 hover:bg-blue-800 transition-all shadow-sm shadow-blue-700/20"
                            >
                                <UserIcon className="w-4 h-4" />
                                Staff Portal
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
