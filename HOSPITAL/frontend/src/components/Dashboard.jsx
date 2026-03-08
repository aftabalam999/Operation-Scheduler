import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaProcedures, FaCheckCircle, FaSpinner, FaSearch } from 'react-icons/fa';

const Dashboard = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const fetchSchedules = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/schedules', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setSchedules(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchSchedules();
    }, [user, navigate]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Scheduled': return 'badge-primary';
            case 'Ongoing': return 'badge-warning';
            case 'Completed': return 'badge-success';
            case 'Cancelled': return 'badge-danger';
            case 'Postponed': return 'badge-warning';
            default: return 'badge-primary';
        }
    };

    const filteredSchedules = schedules.filter(s =>
        (s.patient?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.doctor?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.otNumber.toString().includes(searchTerm)
    );

    if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>Loading operations schedule...</div>;

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h2 style={{ margin: 0 }}>Operation Theater Overview</h2>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{new Date().toDateString()}</div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0369a1', fontSize: '1.8rem' }}>
                        <FaProcedures />
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', margin: 0 }}>Total Procedures</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)', marginTop: '0.2rem' }}>{schedules.length}</div>
                    </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#047857', fontSize: '1.8rem' }}>
                        <FaCheckCircle />
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', margin: 0 }}>Completed Today</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                            {schedules.filter(s => s.status === 'Completed').length}
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309', fontSize: '1.8rem' }}>
                        <FaSpinner />
                    </div>
                    <div>
                        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', margin: 0 }}>Ongoing</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)', marginTop: '0.2rem' }}>
                            {schedules.filter(s => s.status === 'Ongoing').length}
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card" style={{ marginTop: '2.5rem', padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Surgical Schedule</h3>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by patient, doctor, or OT..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--card-bg)' }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    {filteredSchedules.length === 0 ? (
                        <div className="empty-state">No surgeries matched your criteria.</div>
                    ) : (
                        <table style={{ minWidth: '800px', width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Patient</th>
                                    <th>OT Number</th>
                                    <th>Surgeon</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSchedules.map(schedule => (
                                    <tr key={schedule._id}>
                                        <td style={{ fontWeight: '600', color: 'var(--text-main)' }}>{schedule.patient?.name || 'Unknown Patient'}</td>
                                        <td>
                                            <span style={{ fontWeight: '500' }}>OT - {schedule.otNumber}</span>
                                        </td>
                                        <td>Dr. {schedule.doctor?.name || 'Unassigned'}</td>
                                        <td>{new Date(schedule.operationDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</td>
                                        <td>{schedule.startTime} - {schedule.endTime}</td>
                                        <td>
                                            <span className={`badge ${getStatusBadge(schedule.status)}`}>
                                                {schedule.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
