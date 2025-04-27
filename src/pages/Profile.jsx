import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Mock data
  const userData = {
    firstName: "Joël Stone",
    lastName: "Lumpungu",
    email: "un1croyable17@gmail.com",
    promotion: "L3 LMD",
    faculty: "Sciences Informatiques",
    department: "Ingénierie Logicielle",
    studentId: "SI 007322"
  };

  const handlePasswordChange = () => {
    navigate('/otp/password', { 
      state: { 
        type: 'password',
        email: userData.email 
      } 
    });
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    
    const toastId = toast.loading(
      <div className="sending-email-toast">
        <p>Envoi du code à l'adresse {userData.email}</p>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    );

    setTimeout(() => {
      toast.update(toastId, {
        render: `Code envoyé à ${userData.email}`,
        type: "success",
        isLoading: false,
        autoClose: 1500,
        closeOnClick: true,
        onClose: () => {
          navigate('/otp/email', { 
            state: { 
              type: 'email',
              email: userData.email,
              newEmail: newEmail 
            } 
          });
        }
      });
    }, 2000);
  };

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Logique pour upload de l'image
      console.log('Image à uploader:', file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Mon Profil</h1>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="avatar-container">
              <i className="fas fa-user"></i>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleProfilePicture}
                hidden
              />
              <label htmlFor="profile-picture" className="change-picture-btn">
                <i className="fas fa-camera"></i>
              </label>
            </div>
            <h2>{userData.firstName} {userData.lastName}</h2>
          </div>

          <div className="profile-info">
            <div className="info-group">
              <div className="info-item">
                <span className="info-label">
                  <i className="fas fa-envelope"></i>
                  Email
                </span>
                {isEditingEmail ? (
                  <form onSubmit={handleEmailChange} className="email-edit-form">
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder={userData.email}
                      required
                    />
                    <div className="email-edit-actions">
                      <button type="submit" className="save-btn">
                        <i className="fas fa-check"></i>
                      </button>
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => {
                          setIsEditingEmail(false);
                          setNewEmail('');
                        }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="info-value-container">
                    <span className="info-value">{userData.email}</span>
                    <button 
                      className="edit-btn"
                      onClick={() => setIsEditingEmail(true)}
                    >
                      <i className="fas fa-pen"></i>
                    </button>
                  </div>
                )}
              </div>

              <div className="info-item">
                <span className="info-label">
                  <i className="fas fa-graduation-cap"></i>
                  Promotion
                </span>
                <span className="info-value">{userData.promotion}</span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  <i className="fas fa-university"></i>
                  Faculté
                </span>
                <span className="info-value">{userData.faculty}</span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  <i className="fas fa-building"></i>
                  Département
                </span>
                <span className="info-value">{userData.department}</span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  <i className="fas fa-id-card"></i>
                  Matricule
                </span>
                <span className="info-value">{userData.studentId}</span>
              </div>
            </div>

            <div className="profile-actions">
              <button 
                className="change-password-btn"
                onClick={handlePasswordChange}
              >
                <i className="fas fa-key"></i>
                Changer mon mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;