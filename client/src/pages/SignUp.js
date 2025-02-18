import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.auth);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser(formData)).then((res) => {
            if (!res.error) navigate('/'); // Redirect after signup
        });
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default Signup;
