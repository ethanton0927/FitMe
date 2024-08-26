import React, { useState, useRef } from 'react'
import './styles/profile.css'
import { FaAngleRight, FaChartLine, FaWeight, FaRunning } from "react-icons/fa"
import { FaGear } from "react-icons/fa6"
import { GoGoal } from "react-icons/go"
import { TbLogout2 } from "react-icons/tb"
import { useNavigate } from 'react-router-dom'
import { useUser } from '../contexts/UserContext'

const Profile = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(user ? user.imageUrl : 'default_profile.png');
    const fileInputRef = useRef(null)
    // Handle user logout
    const handleLogout = () => {
        setUser(null); // Clear user in context
        navigate('/auth');
    };
    // Handle profile picture change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result);
            setUser({...user, imageUrl: reader.result}); // Update user context with new image URL
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    // handle click on profile picture to trigger hidden file input
    const handleClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='page'>
            <div className="header">
                <h2>Profile</h2>
            </div>

            <div className="row" id='name-container'>
                <span className='name'>{user ? user.firstName : 'N/A'}</span> 
                <span className='name'>{user ? user.lastName : 'N/A'}</span>
            </div>

            {/* Profile picture */}
            <div className="profile-picture-container column">
                <img src={profilePic} alt="Profile" className="profile-picture"/>
                <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="file-input" />
                <button onClick={handleClick} className="upload-button submit-btn">Change Profile Picture</button>
            </div>

            <div className="container" id='settings-container'>
                <h3>Settings</h3>

                <div className="row">
                    <div className="row settings-item">
                        <GoGoal className='icon'/>
                        <span>Goals</span>
                    </div>
                    <FaAngleRight className='icon'/>
                </div>
                <div className="row">
                    <div className="row settings-item">
                        <FaChartLine className='icon'/>
                        <span>Progress</span>
                    </div>
                    <FaAngleRight className='icon'/>
                </div>
                <div className="row">
                    <div className="row settings-item">
                        <FaWeight className='icon'/>
                        <span>Measurements</span>
                    </div>
                    <FaAngleRight className='icon'/>
                </div>
                <div className="row">
                    <div className="row settings-item">
                        <FaRunning className='icon'/>
                        <span>Exercises</span>
                    </div>
                    <FaAngleRight className='icon'/>
                </div>
                <div className="row">
                    <div className="row settings-item">
                        <FaGear className='icon'/>
                        <span>Settings</span>
                    </div>
                    <FaAngleRight className='icon'/>
                </div>
                <div className="row" onClick={handleLogout}>
                    <div className="row settings-item">
                        <TbLogout2 className='icon'/>
                        <span id='log-out-txt'>Log out</span>
                    </div>
                    <FaAngleRight className='icon'/>
                </div>
            </div>
        </div>
    )
}

export default Profile