import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: 'home', label: 'Mon Dashboard' },
    { path: '/planning', icon: 'calendar-alt', label: 'Mon planning' },
    { path: '/alerts', icon: 'bell', label: 'Mes alertes' },
    { path: '/communications', icon: 'bullhorn', label: 'Communications' },
    { path: '/library', icon: 'book', label: 'Ma bibliothèque' },
    { path: '/chatbot', icon: 'robot', label: 'Mon Assistant' }
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <i className="fas fa-graduation-cap"></i>
        <span>UniMate</span>
      </div>
      <nav>
        <ul>
          {menuItems.map(({ path, icon, label }) => (
            <li key={path}>
              <NavLink to={path} className={({ isActive }) => isActive ? 'active' : ''}>
                <i className={`fas fa-${icon}`}></i>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
