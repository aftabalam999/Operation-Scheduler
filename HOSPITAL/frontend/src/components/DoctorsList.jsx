import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMd, FaSearch, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';

const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/doctors', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setDoctors(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchDoctors();
    }, [user.token]);

    const filteredDoctors = doctors.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>Loading medical staff...</div>;

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaUserMd style={{ color: 'var(--primary)' }} /> Medical Staff
                </h2>
                <div style={{ position: 'relative', width: '300px' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by name or specialization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', background: 'var(--card-bg)' }}
                    />
                </div>
            </div>

            <div className="dashboard-grid">
                {filteredDoctors.map(doc => (
                    <div key={doc._id} className="glass-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                            <div style={{
                                width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', color: 'white',
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {doc.name.charAt(0)}
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>Dr. {doc.name}</h3>
                                <div style={{ marginTop: '0.25rem' }}>
                                    <span className="badge badge-success" style={{ padding: '0.2rem 0.5rem' }}>
                                        {doc.specialization}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaPhoneAlt style={{ color: 'var(--info)' }} /> <strong>Contact:</strong> {doc.contactNumber}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaEnvelope style={{ color: 'var(--info)' }} /> <strong>Email:</strong> {doc.email}
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaClock style={{ color: 'var(--warning)' }} /> <strong>Hours:</strong> {doc.workingHours || 'Standard Shift'}
                        </p>
                    </div>
                ))}
                {filteredDoctors.length === 0 && (
                    <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                        No medical staff found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorsList;
