import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTheme } from '../../contexts/ThemeContext';
import '../../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    // Vérifier si l'email est saisi
    if (!formData.email) {
      toast.error("Veuillez saisir votre adresse email");
      return;
    }

    const toastId = toast.loading("Envoi du code de réinitialisation...");
    
    setTimeout(() => {
      toast.update(toastId, {
        render: `Code envoyé à ${formData.email}`,
        type: "success",
        isLoading: false,
        autoClose: 1500,
        onClose: () => {
          navigate('/otp/reset-password', {
            state: {
              type: 'reset-password',
              email: formData.email
            }
          });
        }
      });
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock credentials for demo
    const validEmail = "un1croyable17@gmail.com";
    const validPassword = "crackito17";

    const toastId = toast.loading("Vérification des informations...");

    // Simulate API call
    setTimeout(() => {
      if (formData.email === validEmail && formData.password === validPassword) {
        toast.update(toastId, {
          render: "Informations validées",
          type: "success",
          isLoading: false,
          autoClose: 1500
        });
        setTimeout(() => {
          navigate('/otp/2fa', { 
            state: { 
              type: '2fa',
              email: formData.email 
            } 
          });
        }, 1500);
      } else {
        toast.update(toastId, {
          render: "Email ou mot de passe incorrect",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="auth-container">
      <button className="theme-toggle" onClick={toggleTheme}>
        <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
      </button>

      <div className="auth-card">
        <div className="auth-header">
          <i className="fas fa-graduation-cap logo-icon"></i>
          <h1>UniMate</h1>
          <p>Connectez-vous à votre espace</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i>
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              Mot de passe
            </label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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

          <div className="form-actions">
            <button 
              type="button" 
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Mot de passe oublié ?
            </button>
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
                <i className="fas fa-sign-in-alt"></i>
                Se connecter
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
