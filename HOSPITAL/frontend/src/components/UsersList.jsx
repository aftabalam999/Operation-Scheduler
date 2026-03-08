import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaUserEdit, FaSearch } from 'react-icons/fa';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/auth/users', {
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            setUsers(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`http://localhost:3000/api/auth/users/${userId}/role`, { role: newRole }, {
                headers: { Authorization: `Bearer ${currentUser.token}` },
            });
            setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            alert('User role updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to update user role');
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>Loading users...</div>;

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaUsers style={{ color: 'var(--primary)' }} /> User Management
                </h2>
                <div style={{ position: 'relative', width: '300px' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--card-bg)' }}
                    />
                </div>
            </div>

            <div className="glass-card" style={{ overflowX: 'auto', padding: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user._id}>
                                <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{user.name}</td>
                                <td style={{ color: 'var(--text-muted)' }}>{user.email}</td>
                                <td>
                                    <span className={`badge ${user.role === 'Admin' ? 'badge-danger' : user.role === 'Doctor' ? 'badge-primary' : 'badge-success'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <FaUserEdit style={{ color: 'var(--text-muted)' }} />
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            style={{ padding: '0.3rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border)', background: 'white' }}
                                            disabled={user._id === currentUser._id}
                                        >
                                            <option value="User">User</option>
                                            <option value="Doctor">Doctor</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="empty-state">
                        No users found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersList;
