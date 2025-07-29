
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Appcontext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import About from './components/About';
import Login from './components/Login';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile';
import FeaturesPage from './components/Feature';

import Contact from './components/Contact';

function App() {
  return (
    <AuthProvider>
      <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] min-h-screen">
      <ToastContainer/>
      <Navbar/>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<FeaturesPage />} />

          <Route 
            path="/chatbot" 
            element={
              <ProtectedRoute>
                <Chatbot />
              // </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;