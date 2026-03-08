import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            };
            const { data } = await axios.post('http://localhost:3000/api/auth/login', { email, password }, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
            window.location.reload(); // Quick state refresh
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }} className="glass-card animate-fade-in">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
            {error && <div className="badge badge-danger" style={{ padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>{error}</div>}
            <form onSubmit={submitHandler}>
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
                        placeholder="Enter password"
                    />
                </div>
                <button type="submit" className="btn" style={{ marginTop: '1rem', width: '100%' }}>
                    Sign In
                </button>
            </form>
            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </div>
    );
};

export default Login;
