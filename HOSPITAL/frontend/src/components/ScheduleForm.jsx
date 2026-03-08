import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendarPlus } from 'react-icons/fa';

const ScheduleForm = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        patient: '',
        doctor: '',
        otNumber: '',
        operationDate: '',
        startTime: '',
        endTime: '',
        anesthesiaType: '',
        anesthesiologist: '',
        remarks: ''
    });
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'Admin') {
            navigate('/');
            return;
        }

        const fetchData = async () => {
            try {
                const pRes = await axios.get('http://localhost:3000/api/patients', { headers: { Authorization: `Bearer ${user.token}` } });
                const dRes = await axios.get('http://localhost:3000/api/doctors', { headers: { Authorization: `Bearer ${user.token}` } });
                setPatients(pRes.data);
                setDoctors(dRes.data);
            } catch (err) {
                console.error('Error fetching data for form');
            }
        };
        fetchData();
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/schedules', formData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Error scheduling operation: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-card animate-fade-in" style={{ maxWidth: '800px', margin: '2rem auto' }}>
            <h2 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaCalendarPlus style={{ color: 'var(--primary)' }} /> Schedule Operation
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Select Patient</label>
                    <select name="patient" value={formData.patient} onChange={handleChange} required>
                        <option value="">-- Select Patient --</option>
                        {patients.map(p => <option key={p._id} value={p._id}>{p.name} - (Age: {p.age}, Contact: {p.contactNumber})</option>)}
                    </select>
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Lead Surgeon</label>
                    <select name="doctor" value={formData.doctor} onChange={handleChange} required>
                        <option value="">-- Select Surgeon --</option>
                        {doctors.map(d => <option key={d._id} value={d._id}>Dr. {d.name} ({d.specialization})</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label>Operation Theater (OT) No.</label>
                    <input type="text" name="otNumber" value={formData.otNumber} onChange={handleChange} required placeholder="e.g., OT-1A" />
                </div>

                <div className="form-group">
                    <label>Operation Date</label>
                    <input type="date" name="operationDate" value={formData.operationDate} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Start Time</label>
                    <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>End Time (Expected)</label>
                    <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Anesthesia Type</label>
                    <select name="anesthesiaType" value={formData.anesthesiaType} onChange={handleChange}>
                        <option value="">-- Select --</option>
                        <option value="General">General Anesthesia</option>
                        <option value="Local">Local Anesthesia</option>
                        <option value="Regional">Regional Anesthesia</option>
                        <option value="Epidural">Epidural</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Anesthesiologist Name</label>
                    <input type="text" name="anesthesiologist" value={formData.anesthesiologist} onChange={handleChange} placeholder="Dr. Name" />
                </div>

                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Special Remarks / Pre-op Notes</label>
                    <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" placeholder="Any specific instructions, required instruments..."></textarea>
                </div>

                <button type="submit" className="btn" disabled={loading} style={{ gridColumn: '1 / -1', padding: '1rem', marginTop: '1rem' }}>
                    {loading ? 'Scheduling...' : 'Confirm Schedule'}
                </button>
            </form>
        </div>
    );
};

export default ScheduleForm;
