import React from 'react';
import { Route, Routes , Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AdvancedAuthentication from './pages/AdvancedAuthentication';
import Footer from './components/Footer';
import OurCompany from './pages/OurCompany';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import SinglesignOn from './pages/SinglesignOn';
import ProfilePage from './pages/ProfilePage';
import  { useState , useEffect } from 'react';
import Unauthorized from "./pages/Unauthorized";
import AdminPage from "./pages/AdminPage"; // Example admin page
import UserPage from "./pages/UserPage"; // Example user page
import ProtectedRoute from "./components/ProtectedRoute";
import TrackerPortal from './pages/TrackerPortal';
import { Link } from 'react-router-dom';
import PhotoGallery from './components/PhotoGallery';
import ChatPage from './pages/ChatPage';
import Dashboard from './pages/Dashboard';



function App() {
  const isAuthenticated = useIsAuthenticated();
  const { accounts , instance} = useMsal();
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null); 
  const userLoginMethod = accounts?.[0]?.idTokenClaims?.loginMethod; // Check login method (B2C or Entra)
  const roles = userDetails?.roles || []; 

  useEffect(() => {
    // Update userDetails after login
    if (isAuthenticated && accounts && accounts.length > 0) {
      const account = accounts[0];
      const idTokenClaims = account.idTokenClaims || {};
      let loginMethod = 'Unknown';
      if (idTokenClaims.tfp) {
        loginMethod = 'B2C';
      } else {
        loginMethod = 'EntraID';
      }
  
      console.log('Login Method:', loginMethod); // Add this line
      console.log('ID Token Claims:', idTokenClaims); // Add this line
  
      setUserDetails({
        name: idTokenClaims.name || account.username || 'User',
        username: account.username || 'Unknown User',
        roles: Array.isArray(idTokenClaims.roles) ? idTokenClaims.roles : [],
        idTokenClaims,
        loginMethod,
      });
    }
  }, [isAuthenticated, accounts]);
  
  
  return (
    <div className="App">
      <Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {userDetails?.loginMethod === 'B2C' ? (
    <Route path="/tracker" element={<TrackerPortal />} />
  ) : (
    <Route path="/profile" element={<ProfilePage />} />
  )}
        <Route path="/home" element={<HomePage />} />
        <Route path="/advanced-authentication" element={<AdvancedAuthentication />} />
        <Route path="/ourcompany" element={<OurCompany />} />
        <Route path="/single-signon" element={<SinglesignOn />} />
        <Route path="/profile" element={<ProfilePage user={userDetails} />} />
        <Route path="/import-photos" element={<PhotoGallery />} />
        <Route
  path="/chat"
  element={
    <ProtectedRoute isAuthenticated={!!userDetails}>
      <ChatPage />
    </ProtectedRoute>
  }
/>


        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
  path="/admin"
  element={
    <ProtectedRoute
      isAuthenticated={!!userDetails}
      roles={['Admin']}
      userRoles={userDetails?.roles || []}
    >
      <AdminPage />
    </ProtectedRoute>
  }

  />
  <Route
    path="/user"
    element={
      <ProtectedRoute roles={["User"]} userRoles={userDetails?.roles || []}>
        <UserPage />
      </ProtectedRoute>
    }
  />
  {/* Catch-all route */}
  <Route path="*" element={<Navigate to="/" />} />
  <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;