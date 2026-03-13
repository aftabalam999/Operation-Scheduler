import React, { useState } from 'react';
import { Shield, Search, Edit2, Check, X, UserPlus, Mail, ChevronDown } from 'lucide-react';

const ROLES = ['Admin', 'Doctor', 'Nurse', 'Patient', 'User'];

const ROLE_COLORS = {
    Admin: 'bg-blue-100 text-blue-700 border-blue-200',
    Doctor: 'bg-teal-100 text-teal-700 border-teal-200',
    Nurse: 'bg-pink-100 text-pink-700 border-pink-200',
    Patient: 'bg-purple-100 text-purple-700 border-purple-200',
    User: 'bg-gray-100 text-gray-600 border-gray-200',
};

const AVATAR_COLORS = ['bg-blue-500', 'bg-teal-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-indigo-500', 'bg-red-400'];

const initialUsers = [
    { id: 'USR-001', name: 'Dr. Admin Kumar', email: 'admin@hospital.com', role: 'Admin', status: 'Active', joinedOn: '2026-01-01' },
    { id: 'USR-002', name: 'Dr. Arjun Smith', email: 'doctor@hospital.com', role: 'Doctor', status: 'Active', joinedOn: '2026-01-15' },
    { id: 'USR-003', name: 'Nurse Sarah Ali', email: 'nurse@hospital.com', role: 'Nurse', status: 'Active', joinedOn: '2026-02-01' },
    { id: 'USR-004', name: 'John Doe', email: 'patient@hospital.com', role: 'Patient', status: 'Active', joinedOn: '2026-03-01' },
    { id: 'USR-005', name: 'New User', email: 'user@hospital.com', role: 'User', status: 'Pending', joinedOn: '2026-03-08' },
    { id: 'USR-006', name: 'Priya Sharma', email: 'priya@hospital.com', role: 'User', status: 'Pending', joinedOn: '2026-03-08' },
];

// Load self-registered users from localStorage and merge
const loadAllUsers = () => {
    let registered = [];
    try { registered = JSON.parse(localStorage.getItem('ot_registered_users') || '[]'); } catch { }
    const registeredMapped = registered.map((u, i) => ({
        id: `USR-${String(100 + i).padStart(3, '0')}`,
        name: u.name,
        email: u.email,
        role: u.role || 'User',
        status: 'Pending',
        joinedOn: u.joinedOn || new Date().toISOString().split('T')[0],
    }));
    // Merge, avoid duplicates by email
    const all = [...initialUsers];
    registeredMapped.forEach(r => {
        if (!all.find(u => u.email.toLowerCase() === r.email.toLowerCase())) {
            all.push(r);
        }
    });
    return all;
};

export default function UserManagement() {
    const [users, setUsers] = useState(loadAllUsers);
    const [search, setSearch] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editRole, setEditRole] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
    const [toast, setToast] = useState('');

    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    const startEdit = (user) => {
        setEditingId(user.id);
        setEditRole(user.role);
    };

    const saveRole = (userId) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: editRole, status: 'Active' } : u));
        setEditingId(null);
        showToast(`Role updated to "${editRole}" successfully`);
    };

    const toggleStatus = (userId) => {
        setUsers(prev => prev.map(u => u.id === userId
            ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
            : u
        ));
    };

    const addUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) return;
        const user = {
            id: `USR-${String(users.length + 1).padStart(3, '0')}`,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: 'Active',
            joinedOn: new Date().toISOString().split('T')[0],
        };
        setUsers(prev => [...prev, user]);
        setNewUser({ name: '', email: '', role: 'User' });
        setShowAddModal(false);
        showToast(`User "${user.name}" added with role "${user.role}"`);
    };

    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );

    const counts = {
        total: users.length,
        pending: users.filter(u => u.status === 'Pending').length,
        active: users.filter(u => u.status === 'Active').length,
    };

    return (
        <div className="p-8">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium animate-bounce">
                    <Check size={16} /> {toast}
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Shield size={28} className="text-[#2563EB]" /> User Management
                    </h1>
                    <p className="text-gray-500 mt-1">Assign roles and manage system access for all hospital staff</p>
                </div>
                <button onClick={() => setShowAddModal(true)}
                    className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl shadow font-medium flex items-center gap-2 transition-all">
                    <UserPlus size={18} /> Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: 'Total Users', val: counts.total, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
                    { label: 'Active', val: counts.active, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Pending Role', val: counts.pending, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map(({ label, val, color, bg }) => (
                    <div key={label} className={`${bg} rounded-2xl p-5 flex items-center gap-4`}>
                        <p className={`text-4xl font-bold ${color}`}>{val}</p>
                        <p className="text-sm text-gray-600 font-medium">{label}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search by name, email or role..."
                    value={search} onChange={e => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-white text-sm" />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((user, i) => (
                            <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                {/* User */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-9 h-9 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} text-white flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                                            <p className="text-xs text-gray-400">{user.id}</p>
                                        </div>
                                    </div>
                                </td>
                                {/* Email */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                                        <Mail size={13} className="text-gray-400" /> {user.email}
                                    </div>
                                </td>
                                {/* Role — editable */}
                                <td className="px-6 py-4">
                                    {editingId === user.id ? (
                                        <div className="flex items-center gap-2">
                                            <select value={editRole} onChange={e => setEditRole(e.target.value)}
                                                className="border border-[#2563EB] rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
                                                {ROLES.map(r => <option key={r}>{r}</option>)}
                                            </select>
                                            <button onClick={() => saveRole(user.id)} className="w-7 h-7 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-all">
                                                <Check size={13} />
                                            </button>
                                            <button onClick={() => setEditingId(null)} className="w-7 h-7 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-lg flex items-center justify-center transition-all">
                                                <X size={13} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${ROLE_COLORS[user.role] || ROLE_COLORS.User}`}>
                                            {user.role}
                                        </span>
                                    )}
                                </td>
                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        user.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                            'bg-red-100 text-red-600'
                                        }`}>
                                        {user.status === 'Pending' && '⏳ '}{user.status}
                                    </span>
                                </td>
                                {/* Joined */}
                                <td className="px-6 py-4 text-sm text-gray-500">{user.joinedOn}</td>
                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => startEdit(user)} title="Assign Role"
                                            className="flex items-center gap-1.5 text-xs border border-[#2563EB] text-[#2563EB] hover:bg-blue-50 px-3 py-1.5 rounded-lg font-medium transition-all">
                                            <Edit2 size={12} /> Assign Role
                                        </button>
                                        <button onClick={() => toggleStatus(user.id)} title="Toggle Status"
                                            className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${user.status === 'Active'
                                                ? 'border-red-200 text-red-500 hover:bg-red-50'
                                                : 'border-green-200 text-green-600 hover:bg-green-50'
                                                }`}>
                                            {user.status === 'Active' ? 'Suspend' : 'Activate'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-400 text-sm">No users found matching your search.</div>
                )}
            </div>

            {/* Add User Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Add New User</h2>
                            <button onClick={() => setShowAddModal(false)}><X size={22} className="text-gray-400 hover:text-gray-600" /></button>
                        </div>
                        <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-sm text-blue-700 mb-5">
                            ℹ Users added here are immediately active. Their login email becomes their unique identifier.
                        </div>
                        <form onSubmit={addUser} className="space-y-4">
                            {[
                                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Dr. Jane Smith' },
                                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'jane@hospital.com' },
                            ].map(({ label, key, type, placeholder }) => (
                                <div key={key}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                                    <input type={type} placeholder={placeholder} value={newUser[key]}
                                        onChange={e => setNewUser(prev => ({ ...prev, [key]: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all" />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assign Role</label>
                                <select value={newUser.role} onChange={e => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-all">
                                    {ROLES.map(r => <option key={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all">
                                    Add User
                                </button>
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-3 rounded-xl font-semibold transition-all">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
