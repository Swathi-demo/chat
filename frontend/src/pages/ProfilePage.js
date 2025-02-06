import React from 'react';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProfilePage({ user }) {
    const navigate = useNavigate();

    if (!user) {
        return <p style={{ backgroundColor: '#0A1F44', color: 'white', padding: '20px' }}>Loading user profile...</p>;
    }

    const idTokenClaims = user.idTokenClaims || {};
    const name = idTokenClaims.name || user.username || 'User';
    const email = idTokenClaims.email || idTokenClaims.emails?.[0] || 'No email provided';
    const givenName = idTokenClaims.given_name || 'N/A';
    const surname = idTokenClaims.family_name || 'N/A';
    const objectId = idTokenClaims.oid || 'N/A';
    const state = idTokenClaims.state || 'Not Available';
    const userRoles = idTokenClaims.roles || [];

    const handleGoogleAuth = () => {
        window.location.href = 'http://localhost:5000/auth/google'; // Initiates Google OAuth
    };

    const handleViewPhotos = () => {
        navigate('/photo-gallery'); // Navigate to photo gallery
    };

    return (
        <div className="profile-page">
            <div className="profile-container">
                 {/* Background video */}
                 <div className="video-background">
                    <video autoPlay loop muted playsInline>
                        <source src="/images/profilepage.mp4" type="video/mp4" />
                        <source src="/images/profilepage.webm" type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                 {/* Profile content */}
                 <div className="profile-content">
                <h1>Welcome, {name}!</h1>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Given Name:</strong> {givenName}</p>
                <p><strong>Surname:</strong> {surname}</p>
                <p><strong>Object ID:</strong> {objectId}</p>
                <p><strong>State:</strong> {state}</p>
                <p className="user-roles">
                    <strong>User Roles:</strong>{' '}
                    {userRoles.length > 0 ? userRoles.join(', ') : 'No roles assigned'}
                </p>

                {/* Google Photos Buttons */}
                <div className="google-photos-actions">
                    <button className="btn-import" onClick={handleGoogleAuth}>
                        Import Google Photos
                    </button>
                    <button className="btn-view" onClick={handleViewPhotos}>
                        View Imported Photos
                    </button>
                </div>
                <div className="profile-actions">
        <button className='chat-app'>
          <Link to="/chat">Go to Chat App</Link>
        </button>
      </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
