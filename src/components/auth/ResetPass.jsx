import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/resetpass.css';

const ResetPass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Le nouveau mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading('Modification du mot de passe...');

    setTimeout(() => {
      toast.update(toastId, {
        render: 'Mot de passe modifié avec succès !',
        type: 'success',
        isLoading: false,
        autoClose: 1500,
        onClose: () => {
          navigate('/login');
        }
      });
    }, 2000);
  };

  return (
    <div className="resetpass-container">
      <div className="resetpass-header">
        <h1>Modification du mot de passe</h1>
      </div>

      <div className="resetpass-content">
        <div className="resetpass-card">
          <form onSubmit={handleSubmit} className="resetpass-form">
            <div className="form-group">
              <label htmlFor="currentPassword">
                <i className="fas fa-lock"></i>
                Mot de passe actuel
              </label>
              <div className="password-input">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({
                    ...formData,
                    currentPassword: e.target.value
                  })}
                  required
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('current')}
                >
                  <i className={`fas ${showPasswords.current ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">
                <i className="fas fa-key"></i>
                Nouveau mot de passe
              </label>
              <div className="password-input">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({
                    ...formData,
                    newPassword: e.target.value
                  })}
                  required
                  minLength="6"
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('new')}
                >
                  <i className={`fas ${showPasswords.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                <i className="fas fa-check-circle"></i>
                Confirmer le nouveau mot de passe
              </label>
              <div className="password-input">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({
                    ...formData,
                    confirmPassword: e.target.value
                  })}
                  required
                  minLength="6"
                />
                <button 
                  type="button"
                  className="toggle-password"
                  onClick={() => togglePasswordVisibility('confirm')}
                >
                  <i className={`fas ${showPasswords.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="button-loader">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Enregistrer les modifications
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;