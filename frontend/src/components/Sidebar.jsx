import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Calendar, Stethoscope, Users,
    ActivitySquare, Package, FileText, LogOut, Shield
} from 'lucide-react';

const ROLE_COLORS = {
    Admin: 'bg-blue-500',
    Doctor: 'bg-teal-500',
    Nurse: 'bg-pink-500',
    Patient: 'bg-purple-500',
    User: 'bg-gray-400',
};

const Sidebar = ({ user, onLogout }) => {
    const adminLinks = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={19} /> },
        { name: 'Surgeries', path: '/surgeries', icon: <ActivitySquare size={19} /> },
        { name: 'Calendar', path: '/calendar', icon: <Calendar size={19} /> },
        { name: 'Doctors', path: '/doctors', icon: <Stethoscope size={19} /> },
        { name: 'Patients', path: '/patients', icon: <Users size={19} /> },
        { name: 'Resources', path: '/resources', icon: <Package size={19} /> },
        { name: 'Reports', path: '/reports', icon: <FileText size={19} /> },
        { name: 'User Management', path: '/users', icon: <Shield size={19} />, adminOnly: true },
    ];

    const doctorLinks = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={19} /> },
        { name: 'Surgeries', path: '/surgeries', icon: <ActivitySquare size={19} /> },
        { name: 'Calendar', path: '/calendar', icon: <Calendar size={19} /> },
        { name: 'Patients', path: '/patients', icon: <Users size={19} /> },
        { name: 'Reports', path: '/reports', icon: <FileText size={19} /> },
    ];

    const nurseLinks = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={19} /> },
        { name: 'Surgeries', path: '/surgeries', icon: <ActivitySquare size={19} /> },
        { name: 'Resources', path: '/resources', icon: <Package size={19} /> },
    ];

    const linksByRole = {
        Admin: adminLinks,
        Doctor: doctorLinks,
        Nurse: nurseLinks,
    };

    const links = (linksByRole[user?.role] || doctorLinks).filter(
        l => !l.adminOnly || user?.role === 'Admin'
    );

    return (
        <div className="h-screen w-64 bg-[#2563EB] text-white flex flex-col shadow-xl fixed z-40">
            {/* Logo */}
            <div className="p-6 border-b border-blue-400/50">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                        <ActivitySquare size={20} className="text-[#2563EB]" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-wide">OT-SCHED</h1>
                        <p className="text-xs text-blue-200">Hospital Management</p>
                    </div>
                </div>
            </div>

            {/* Role badge */}
            <div className="mx-4 mt-4 mb-2">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/15`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${ROLE_COLORS[user?.role] || 'bg-gray-400'} bg-opacity-90`} />
                    {user?.role} Access
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 overflow-y-auto">
                <ul className="space-y-0.5">
                    {links.map((link) => (
                        <li key={link.name}>
                            <NavLink
                                to={link.path}
                                end={link.path === '/'}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium ${isActive
                                        ? 'bg-white text-[#2563EB] shadow-md font-semibold'
                                        : 'text-blue-100 hover:bg-white/15 hover:text-white'
                                    }`
                                }
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-blue-400/50">
                <div className="flex items-center gap-3 mb-3 px-1">
                    <div className={`w-9 h-9 rounded-full ${ROLE_COLORS[user?.role] || 'bg-gray-400'} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                        {user?.name?.[0] || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-blue-200 truncate">{user?.email || ''}</p>
                    </div>
                </div>
                <button onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white transition-all text-sm font-medium">
                    <LogOut size={15} /> Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
