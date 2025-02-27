import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';

import updateUserProfile from '../features/auth/authSlice'
import './Profile.css';
const Profile = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);

    const [updatedInfo, setUpdatedInfo] = useState({
        name: user.name,
        bio: user.bio || '',
    })

    const handleChange = (e) => {
        setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
    };

    const handleSave = (updatedInfo) => {
        dispatch(updateUserProfile(updatedInfo));
        setIsEditing(false);
    }

    return(
        <div className="profile-container">
      <div className="profile-header">
        <img 
          src={'/goat.png'} 
          alt="Profile" 
          className="profile-avatar" 
        />
        <h2>{isEditing ? 'Edit Profile' : 'Profile'}</h2>
      </div>
      
      <div className="profile-info">
        {isEditing ? (
          <div className="profile-edit">
            <label>
              Name:
              <input 
                type="text" 
                name="name" 
                value={updatedInfo.name} 
                onChange={handleChange}
              />
            </label>
            <label>
              Bio:
              <textarea 
                name="bio" 
                value={updatedInfo.bio} 
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input 
                type="email" 
                name="email" 
                value={updatedInfo.email} 
                onChange={handleChange}
              />
            </label>
            <button onClick={handleSave}>Save Changes</button>
          </div>
        ) : (
          <div className="profile-display">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>

      {/* Other sections */}
      <div className="profile-activity">
        <h3>Your Workouts</h3>
        {/* Loop through the workouts here */}
      </div>

      <div className="profile-footer">
        <button>Logout</button>
        <button>Delete Account</button>
      </div>
    </div>
  );
};
export default Profile;