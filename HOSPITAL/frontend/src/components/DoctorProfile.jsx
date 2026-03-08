import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMd, FaSave } from 'react-icons/fa';

const DoctorProfile = () => {
    const [profile, setProfile] = useState({
        specialization: '',
        contactNumber: '',
    });
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/api/doctors/profile', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setProfile({
                    specialization: data.specialization || '',
                    contactNumber: data.contactNumber || ''
                });
                if (data.workingHours) {
                    const times = data.workingHours.split(' to ');
                    if (times.length === 2) {
                        setStartTime(times[0]);
                        setEndTime(times[1]);
                    } else {
                        // fallback
                        const fallbackTimes = data.workingHours.split(' - ');
                        if (fallbackTimes.length === 2) {
                            setStartTime(fallbackTimes[0]);
                            setEndTime(fallbackTimes[1]);
                        }
                    }
                }
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setMessage('Please complete your doctor profile by filling in the details below.');
                } else {
                    console.error(err);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user.token]);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        try {
            const formattedWorkingHours = startTime && endTime ? `${startTime} to ${endTime}` : '';
            const finalProfile = { ...profile, workingHours: formattedWorkingHours };

            await axios.post('http://localhost:3000/api/doctors/profile', finalProfile, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setMessage('Profile saved successfully!');
        } catch (err) {
            console.error(err);
            setMessage('Error saving profile: ' + (err.response?.data?.message || err.message));
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-muted)' }}>Loading your profile...</div>;

    return (
        <div className="glass-card animate-fade-in" style={{ maxWidth: '600px', margin: '2rem auto' }}>
            <h2 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaUserMd style={{ color: 'var(--primary)' }} /> My Doctor Profile
            </h2>

            {message && (
                <div className={`badge ${message.includes('success') ? 'badge-success' : 'badge-warning'}`} style={{ padding: '1rem', marginBottom: '1.5rem', borderRadius: '8px', display: 'block', textAlign: 'center' }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                    <label>Dr. Name (Read Only)</label>
                    <input type="text" value={user.name} disabled style={{ backgroundColor: '#f1f5f9', color: 'var(--text-muted)' }} />
                </div>

                <div className="form-group">
                    <label>Email (Read Only)</label>
                    <input type="text" value={user.email} disabled style={{ backgroundColor: '#f1f5f9', color: 'var(--text-muted)' }} />
                </div>

                <div className="form-group">
                    <label>Specialization</label>
                    <input
                        type="text"
                        name="specialization"
                        value={profile.specialization}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Cardiology, General Surgery..."
                    />
                </div>

                <div className="form-group">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={profile.contactNumber}
                        onChange={handleChange}
                        required
                        placeholder="e.g. 123-456-7890"
                    />
                </div>

                <div className="form-group">
                    <label>Working Hours</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <input
                            type="time"
                            name="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                        />
                        <span style={{ color: 'var(--text-muted)' }}>to</span>
                        <input
                            type="time"
                            name="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            required
                            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--card-bg)', color: 'var(--text-main)', outline: 'none', fontFamily: 'Inter, sans-serif' }}
                        />
                    </div>
                </div>

                <button type="submit" className="btn" disabled={saving} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1rem', marginTop: '1rem' }}>
                    <FaSave /> {saving ? 'Saving...' : 'Save Profile'}
                </button>
            </form>
        </div>
    );
};

export default DoctorProfile;
