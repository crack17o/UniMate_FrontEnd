import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../styles/otp.css';

const OTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef([]);
  const { type, email, newEmail } = location.state || {};
  const CORRECT_OTP = '170905';

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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
    const toastId = toast.loading(
      <div className="sending-email-toast">
        <p>Renvoi du code à l'adresse {email}</p>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    );

    setTimeout(() => {
      toast.update(toastId, {
        render: `Nouveau code envoyé à ${email}`,
        type: "success",
        isLoading: false,
        autoClose: 3000
      });
    }, 2000);
  };

  const getOTPContent = () => {
    switch(type) {
      case 'password':
        return {
          title: "Réinitialisation du mot de passe",
          message: "Veuillez saisir le code à 6 chiffres envoyé à votre adresse email pour réinitialiser votre mot de passe."
        };
      case 'email':
        return {
          title: "Changement d'adresse email",
          message: `Veuillez saisir le code à 6 chiffres envoyé à ${email} pour confirmer le changement d'adresse email.`
        };
      case '2fa':
        return {
          title: "Authentification à deux facteurs",
          message: "Pour plus de sécurité, veuillez saisir le code à 6 chiffres envoyé à votre adresse email."
        };
      default:
        return {
          title: "Vérification",
          message: "Veuillez saisir le code à 6 chiffres envoyé à votre adresse email."
        };
    }
  };

  const handleSuccess = () => {
    switch(type) {
      case 'password':
        navigate('/resetpass');
        break;
      case 'email':
        navigate('/login');
        break;
      case '2fa':
        navigate('/dashboard');
        break;
      default:
        navigate('/login');
    }
  };

  const validateOTP = () => {
    const enteredOTP = otp.join('');
    if (enteredOTP === CORRECT_OTP) {
      setIsSuccess(true);
      setIsError(false);
      toast.success('Vérification réussie !');
      setTimeout(() => {
        handleSuccess();
      }, 1500);
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
    validateOTP();
  };

  const content = getOTPContent();

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2>{content.title}</h2>
        <p>{content.message}</p>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={el => inputRefs.current[index] = el}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                className={`${isError ? 'error' : ''} ${isSuccess ? 'success' : ''}`}
              />
            ))}
          </div>
          <button 
            type="submit" 
            className="verify-btn"
            disabled={otp.some(digit => !digit)}
          >
            Vérifier
          </button>
        </form>
        
        <div className="otp-footer">
          <button 
            className="resend-btn" 
            onClick={resendCode}
            type="button"
          >
            <i className="fas fa-redo"></i>
            Renvoyer le code
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;