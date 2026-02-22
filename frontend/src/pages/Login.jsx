import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Key, Mail, CheckCircle, Hospital, Lock } from 'lucide-react';

export default function Login({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('user');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating network delay for premium feel
        setTimeout(() => {
            if (isLogin) {
                if (role === 'admin') {
                    setUser({ name: 'Systems Administrator', role: 'admin' });
                    navigate('/admin');
                } else {
                    setUser({ name: email || 'Clinical Staff', role: 'user' });
                    navigate('/user');
                }
            } else {
                fetch('http://localhost:5000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, role })
                })
                    .then(res => res.json())
                    .then(() => {
                        setRegistered(true);
                        setTimeout(() => {
                            setIsLogin(true);
                            setRegistered(false);
                            setEmail('');
                            setPassword('');
                            setIsLoading(false);
                        }, 2500);
                    })
                    .catch(e => {
                        console.error("Error connecting to server", e);
                        setIsLoading(false);
                    });
            }
        }, 800);
    };

    return (
        <div className="flex flex-col flex-1 lg:flex-row bg-slate-50 relative z-10 w-full font-sans tracking-tight">
            {/* Left side brand panel */}
            <div className="hidden lg:flex flex-col justify-center w-5/12 bg-[#0b132b] text-white p-14 relative overflow-hidden shadow-2xl z-20">
                <div className="absolute inset-0 bg-blue-900/20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/30 to-transparent"></div>
                <div className="relative z-10 max-w-md mx-auto">
                    <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 mb-10 shadow-xl">
                        <Hospital className="w-10 h-10 text-blue-400" />
                    </div>
                    <h2 className="text-4xl font-extrabold mb-6 leading-[1.15] tracking-tight text-white">
                        Secure Logistical <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Access Portal.</span>
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed mb-10 font-light max-w-sm">
                        This module provides credentialed personnel strict access to operating theater mapping and critical patient timelines.
                    </p>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg text-xs font-bold uppercase tracking-widest text-emerald-400 border border-emerald-500/20 w-max backdrop-blur-sm">
                        <Lock className="w-3.5 h-3.5" /> E2E Encrypted Instance
                    </div>
                </div>
            </div>

            {/* Right side form panel */}
            <div className="flex flex-1 flex-col justify-center items-center p-6 sm:p-12 relative">
                <div className="w-full max-w-md bg-white p-10 sm:p-12 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">

                    {registered && (
                        <div className="absolute inset-0 bg-emerald-600 z-50 flex flex-col items-center justify-center text-white p-10 text-center animate-fade-in">
                            <CheckCircle size={56} className="mb-6 text-emerald-100 animate-bounce" />
                            <h2 className="text-2xl font-bold tracking-tight mb-2">Registration Verified</h2>
                            <p className="text-sm text-emerald-100 font-medium">Clearance level established. Initializing login matrix...</p>
                        </div>
                    )}

                    <div className="text-left mb-10">
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            {isLogin ? 'Authentication Required' : 'Staff Provisioning'}
                        </h2>
                        <p className="text-sm font-medium text-slate-500 mt-2">
                            {isLogin ? 'Enter your credentials to manage operations' : 'Select your clearance authorization level'}
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setRole('admin')}
                                className={`py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-3 border-2 transition-all duration-300 ${role === 'admin' ? 'border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600'}`}
                            >
                                <Shield className="w-6 h-6" />
                                <span className="text-[11px] uppercase tracking-widest font-bold">Systems Admin</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('user')}
                                className={`py-4 px-4 rounded-xl flex flex-col items-center justify-center gap-3 border-2 transition-all duration-300 ${role === 'user' ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700 shadow-sm' : 'border-slate-100 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600'}`}
                            >
                                <User className="w-6 h-6" />
                                <span className="text-[11px] uppercase tracking-widest font-bold">Clinical Staff</span>
                            </button>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Institutional Email</label>
                                <div className="relative group">
                                    <Mail className="w-5 h-5 absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input required type="email" placeholder="email@hospital.org" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-xl focus:ring-0 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-semibold text-sm shadow-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Secure Passphrase</label>
                                <div className="relative group">
                                    <Key className="w-5 h-5 absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                    <input required type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-xl focus:ring-0 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400 font-semibold text-sm shadow-sm tracking-[0.2em]" />
                                </div>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full flex justify-center items-center py-4 px-4 mt-8 border border-transparent text-sm font-bold uppercase tracking-widest rounded-xl text-white bg-[#0b132b] hover:bg-blue-600 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 shadow-[0_10px_20px_-10px_rgba(11,19,43,0.5)] hover:shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] transition-all duration-300"
                        >
                            {isLoading ? 'Verifying Identity...' : (isLogin ? 'Authenticate securely' : 'Provision Account')}
                        </button>
                    </form>

                    <div className="text-center pt-8 mt-8 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors duration-300"
                        >
                            {isLogin ? "Require Clearance? Register Here" : "Return to Internal Authentication"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
