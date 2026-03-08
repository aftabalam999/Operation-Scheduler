import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            const { data } = await axios.post('http://localhost:3000/api/auth/register', { name, email, password, age, gender, contactNumber }, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
            window.location.reload(); // Quick state refresh
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="glass-card animate-fade-in">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
            {error && <div className="badge badge-danger" style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>{error}</div>}
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter your name"
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Create a password"
                    />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                            placeholder="Patient age"
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                        placeholder="e.g. 123-456-7890"
                    />
                </div>
                <button type="submit" className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                    Register
                </button>
            </form>
            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </div>
        </div>
    );
};

export default Register;
