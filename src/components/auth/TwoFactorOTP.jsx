import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/auth.css';

const TwoFactorOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const CORRECT_OTP = '170905';

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsError(false);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const resendCode = () => {
    setIsResending(true);
    const toastId = toast.loading('Envoi du nouveau code...');

    setTimeout(() => {
      toast.update(toastId, {
        render: 'Nouveau code envoyé !',
        type: 'success',
        isLoading: false,
        autoClose: 2000
      });
      setIsResending(false);
    }, 2000);
  };

  const validateOTP = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP === CORRECT_OTP) {
      setIsSuccess(true);
      setIsError(false);
      const toastId = toast.loading('Vérification...');
      
      setTimeout(() => {
        toast.update(toastId, {
          render: 'Authentification réussie !',
          type: 'success',
          isLoading: false,
          autoClose: 1500
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }, 1000);
    } else {
      setIsError(true);
      setIsSuccess(false);
      toast.error('Code incorrect. Veuillez réessayer.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some(digit => !digit)) return;
    validateOTP();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <i className="fas fa-shield-alt logo-icon"></i>
          <h1>Vérification en deux étapes</h1>
          <p>Pour plus de sécurité, veuillez saisir le code envoyé à votre adresse email</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={el => inputRefs.current[index] = el}
                className={`${isError ? 'error' : ''} ${isSuccess ? 'success' : ''}`}
              />
            ))}
          </div>

          <div className="otp-footer">
            <button 
              type="button"
              className="resend-btn"
              onClick={resendCode}
              disabled={isResending}
            >
              <i className="fas fa-redo"></i>
              {isResending ? 'Envoi en cours...' : 'Renvoyer le code'}
            </button>
          </div>

          <button 
            type="submit" 
            className="verify-btn"
            disabled={otp.some(digit => !digit)}
          >
            Vérifier
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFactorOTP; // Add this line