import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Utilisateur temporaire pour le développement
  const tempUser = {
    displayName: 'Joël Stone',
    role: 'Étudiant',
    department: 'Sciences Informatiques',
    level: 'L3',
    matricule: 'SI007322',
    faculty: 'Sciences'
  };

  const handleLogout = () => {
    const toastId = toast.loading("Déconnexion en cours...");
    
    setTimeout(() => {
      toast.update(toastId, {
        render: "Déconnexion réussie !",
        type: "success",
        isLoading: false,
        autoClose: 1500,
        onClose: () => {
          setIsDropdownOpen(false);
          navigate('/login');
        }
      });
    }, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="user-info">
          <div 
            className="user-avatar"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{getInitials(tempUser.displayName)}</span>
          </div>
          <div className="user-details">
            <div className="user-name">{tempUser.displayName}</div>
            <div className="user-meta">
              <span className="user-role">{tempUser.role}</span>
              <span className="separator">•</span>
              <span className="user-department">{tempUser.department}</span>
              {tempUser.role === 'Étudiant' && (
                <>
                  <span className="separator">•</span>
                  <span className="user-faculty">{tempUser.faculty}</span>
                  <span className="separator">•</span>
                  <span className="user-promotion">{tempUser.level}</span>
                </>
              )}
            </div>
            <div className="matricule-badge">
              {tempUser.matricule}
            </div>
          </div>
          {isDropdownOpen && (
            <div className="profile-dropdown" ref={dropdownRef}>
              <Link to="/profile" className="dropdown-item">
                <i className="fas fa-user"></i>
                <span>Modifier mon profil</span>
              </Link>
              <button onClick={handleLogout} className="dropdown-item">
                <i className="fas fa-sign-out-alt"></i>
                <span>Se déconnecter</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="navbar-right">
        <label className="theme-switch">
          <input 
            type="checkbox"
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
          <span className="slider">
            <i className="fas fa-sun"></i>
            <i className="fas fa-moon"></i>
          </span>
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
