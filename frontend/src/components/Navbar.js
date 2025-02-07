import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchModal from './SearchModal';
import './SearchModal.css';
import { jwtDecode } from "jwt-decode";
import { useMsal } from '@azure/msal-react';
import entraMsalInstance from '../msalInstance'; // Adjust path based on your structure


function Navbar({ userDetails, setUserDetails }) {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    // Extract roles and login method from token
    const extractRolesFromToken = (token) => {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Debug log
      return {
        roles: Array.isArray(decodedToken.roles) ? decodedToken.roles : [], // Ensure roles is an array
        loginMethod: decodedToken.loginMethod || 'Unknown',
      };
    };
    

  // Handle B2C Login
  const handleB2CLogin = async () => {
    try {
      const loginResponse = await instance.loginRedirect({
        scopes: ['openid', 'profile', 'email'],
      });
      const tokenResponse = await instance.acquireTokenSilent({
        account: loginResponse.account || accounts[0],
        scopes: ['openid', 'profile', 'email'],
      });

      const token = tokenResponse.idToken;
      const { roles, loginMethod } = extractRolesFromToken(token);

      setUserDetails({
        name: accounts[0].name,
        loginMethod,
        roles,
      });
      navigate('/auth/google');
      navigate('/chat');
    } catch (error) {
      console.error('B2C Login Failed:', error);
    }
  };

  const handleEntraLogin = async () => {
    try {
      const loginResponse = await entraMsalInstance.loginPopup({
        scopes: ['openid', 'profile', 'User.Read'],
      });
  
      const account = loginResponse.account;
      const tokenResponse = await entraMsalInstance.acquireTokenSilent({
        account,
        scopes: ['openid', 'profile', 'User.Read'],
      });
  
      const token = tokenResponse.idToken; // Get the ID token
      const decodedToken = jwtDecode(token); // Decode the token
      console.log('Decoded EntraID Token:', decodedToken); // Debug log
  
      const roles = decodedToken.roles || []; // Extract roles
      console.log('Extracted Roles:', roles); // Debug log
  
      setUserDetails({
        name: account?.name || 'User',
        username: account?.username,
        roles: Array.isArray(roles) ? roles : [], // Ensure roles is an array
        loginMethod: 'EntraID',
      });
  
      navigate('/home'); // Redirect after successful login
    } catch (error) {
      console.error('Entra Login Failed:', error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await instance.logoutRedirect();
      setUserDetails(null); // Clear user details
      navigate('/'); // Redirect to the home page after logout
    } catch (error) {
      console.error('Logout Failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img
            src="images/aramex4.png"
            alt="CIAM"
            style={{
              height: '40px',
              width: '130px',
              marginRight: '10px',
             /* animation: 'rotate360 2s linear infinite',*/
            }}
          />
        </Link>
      </div>

      <ul className="navbar-menu">
        <li><Link to="/home" style={{ fontWeight: 300 }}>Home</Link></li>
       
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" style={{ fontWeight: 300 }}>
            Solutions <span className="dropdown-icon">▼</span>
          </a>
          <ul className="dropdown-menu">
            <li><Link to="/advanced-authentication" style={{ fontWeight: 300, fontSize: '14px' }}>Advanced Authentication</Link></li>
            <li><Link to="/single-signon" style={{ fontWeight: 300, fontSize: '14px' }}>Single-Sign On</Link></li>
            <li><Link to="/comparisons" style={{ fontWeight: 300, fontSize: '14px' }}>Comparisons</Link></li>
          </ul>
        </li>
        <li><Link to="/documentation" style={{ fontWeight: 300 }}>Documentation</Link></li>

                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" style={{ fontWeight: 300 }}>
                        Features <span className="dropdown-icon">▼</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li><Link to="/secops" style={{ fontWeight: 300, fontSize: '14px' }}><span className="icon">⚙️</span> SecOps</Link></li>
                        <li><Link to="/ai-copilot" style={{ fontWeight: 300, fontSize: '14px' }}><span className="icon">🤖</span> AI & Copilot</Link></li>
                        <li><Link to="/comparisons" style={{ fontWeight: 300, fontSize: '14px' }}><span className="icon">📊</span> Comparisons</Link></li>
                        <li><Link to="/multi-cloud" style={{ fontWeight: 300, fontSize: '14px' }}><span className="icon">☁️</span> Multi-Cloud</Link></li>
                        <li><Link to="/siem" style={{ fontWeight: 300, fontSize: '14px' }}><span className="icon">🔒</span> SIEM</Link></li>
                        <li><Link to="/xdr" style={{ fontWeight: 300, fontSize: '14px' }}><span className="icon">📈</span> XDR</Link></li>
                        <li><Link to="/edr" style={{ fontWeight: 300, fontSize: '14px' }}><span className="icon">🛡️</span> EDR</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <a href="#" className="dropdown-toggle" style={{ fontWeight: 300 }}>
                        About <span className="dropdown-icon">▼</span>
                    </a>
                    <ul className="dropdown-menu" style={{ color: '#FFFFFF' }}>
                        <li><Link to="/ourcompany" style={{ fontWeight: 300, fontSize: '14px' }}><span className="icon">🏢</span> Our Company</Link></li>
                        <li><span className="icon">👥</span> Our People and Culture</li>
                        <li><span className="icon">📜</span> Our Principles</li>
                        <li><span className="icon">🤝</span> Our Partners</li>
                        <li><span className="icon">🏆</span> Awards & Accolades</li>
                        <li><span className="icon">🌍</span> Corporate Social Responsibility</li>
                        <li><span className="icon">🌱</span> Afforestation</li>
                    </ul>
                </li>
      </ul>
      {userDetails && (
  <>
    {/* Show Tracker Portal only for B2C login */}
    {userDetails.loginMethod === 'B2C' && (
      <li style={{ display: 'block', margin: '10px 0' }}>
        <Link to="/tracker" className="styled-button">Tracker Portal</Link>
      </li>
    )}
    {/* Show Profile button only for B2C login */}
    {userDetails.loginMethod === 'B2C' && (
      <li style={{ display: 'block', margin: '10px 0' }}>
        <Link to="/profile" className="styled-button">Profile</Link>
      </li>
    )}
  </>
)}

{(Array.isArray(userDetails?.roles) ? userDetails.roles : []).includes('Admin') && (
  <Link  className='admin-dash' to="/admin" style={{ marginLeft: '10px', color: 'black' }}>
    Admin Dashboard
  </Link>
)}

      <div className="navbar-actions">
        {userDetails ? (
          <div className="user-actions">
            <span className="welcome-message">
              Hello, {userDetails.name} <span style={{ fontSize: 'small', color: '#888' }}>(Signed with {userDetails.loginMethod})</span>
            </span>
            
            <button className="logout-button" onClick={handleLogout}>Logout</button>




{/*{(Array.isArray(userDetails?.roles) ? userDetails.roles : []).includes('User') && (
  <Link to="/user">User Dashboard</Link>
)} */}


          </div>
        ) : (
          <>
            <button className="btwoc" onClick={handleB2CLogin}>Login with B2C</button>
            <button className="entraid" onClick={handleEntraLogin}>Employee Login</button>
          </>
        )}
      </div>

      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />
    </nav>
  );
}

export default Navbar;