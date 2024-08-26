import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'
import './styles/auth.css'

const Auth = () => {
    const [activeTab, setActiveTab] = useState('signin');
    const { setUser } = useUser(); // Use setUser from context
    const navigate = useNavigate();

    // Function to switch tabs
    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
    };
    
    const handleSignUp = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            password: formData.get('password'), // Never store passwords in localStorage in real apps
        };

        // Simulate storing to a backend
        localStorage.setItem(userData.email, JSON.stringify(userData));
        setUser(userData); // Set user in context
        navigate('/'); // Navigate to home
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const userData = JSON.parse(localStorage.getItem(email));

        if (userData && userData.password === password) {
            setUser(userData); // Set user in context
            navigate('/'); // Navigate to home
        } else {
            alert('Invalid credentials or user does not exist');
        }
    };

    return (
        <div className='page' id='auth-page'>
            <div id='title-container'>
                <span id='title'>FitMe</span>
                <span id='subtitle'>Comprehensive Fitness Solution</span>
            </div>
            
            <div id='tab-container'>
                <div id="tab-buttons">
                    <button 
                        className={`tab-btn ${activeTab === 'signin' ? 'active' : ''}`}
                        onClick={() => handleTabSwitch('signin')}
                    >
                    Sign In
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`} 
                        onClick={() => handleTabSwitch('signup')}
                    >
                    Sign Up
                    </button>
                </div>

                <div>
                    {activeTab === 'signin' ? (
                    <div className='tab-content'>
                        <h2>Sign In</h2>
                        {/* Sign In Form */}
                        <form className='auth-form' onSubmit={activeTab === 'signin' ? handleSignIn : handleSignUp}>
                            <input className='text-input' name='email' type="email" placeholder="Email" required />
                            <input className='text-input' name='password' type="password" placeholder="Password" required />
                            <button className='submit-btn' type="submit">Sign In</button>
                        </form>
                        <span>Don't have an account? Sign Up</span>
                    </div>
                    ) : (
                    <div className='tab-content'>
                        <h2>Sign Up</h2>
                        {/* Sign Up Form */}
                        <form className='auth-form' onSubmit={activeTab === 'signin' ? handleSignIn : handleSignUp}>
                            <input className='text-input' name='firstName' type="text" placeholder="First Name" required />
                            <input className='text-input' name='lastName' type="text" placeholder="Last Name" required />
                            <input className='text-input' name='email' type="email" placeholder="Email" required />
                            <input className='text-input' name='password' type="password" placeholder="Password" required />
                            <input className='text-input' name='password' type="password" placeholder="Confirm Password" required />
                            <button className='submit-btn' type="submit">Sign Up</button>
                        </form>
                        <span>Have an account? Sign In</span>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Auth