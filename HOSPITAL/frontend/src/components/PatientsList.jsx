import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserInjured, FaSearch, FaHistory } from 'react-icons/fa';

const PatientsList = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/patients', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setPatients(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchPatients();
    }, [user.token]);

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.contactNumber.includes(searchTerm)
    );

    if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>Loading patients...</div>;

    return (
        <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FaUserInjured style={{ color: 'var(--primary)' }} /> Patients Registry
                </h2>
                <div style={{ position: 'relative', width: '300px' }}>
                    <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
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
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Contact Number</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map(patient => (
                            <tr key={patient._id}>
                                <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>
                                    <span className={`badge ${patient.gender === 'Female' ? 'badge-primary' : 'badge-success'}`}>
                                        {patient.gender}
                                    </span>
                                </td>
                                <td>{patient.contactNumber}</td>
                                <td style={{ color: 'var(--text-muted)' }}>{patient.address}</td>
                                <td>
                                    <button className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                        <FaHistory /> History
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredPatients.length === 0 && (
                    <div className="empty-state">
                        No patients found matching your criteria.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientsList;
