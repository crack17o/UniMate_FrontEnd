import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/auth.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Modification en cours...');

    setTimeout(() => {
      toast.update(toastId, {
        render: 'Mot de passe modifié avec succès !',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <i className="fas fa-lock logo-icon"></i>
          <h1>Nouveau mot de passe</h1>
          <p>Choisissez un nouveau mot de passe sécurisé</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              Nouveau mot de passe
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button 
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <i className="fas fa-lock"></i>
              Confirmer le mot de passe
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="button-loader">
                <div></div><div></div><div></div>
              </div>
            ) : (
              <>
                <i className="fas fa-check"></i>
                Confirmer
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;