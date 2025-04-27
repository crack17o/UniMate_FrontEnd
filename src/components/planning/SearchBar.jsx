import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    type: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <select 
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="search-select"
      >
        <option value="">Tous les types</option>
        <option value="course">Cours</option>
        <option value="lab">TP</option>
        <option value="exam">Examen</option>
      </select>

      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="search-date"
      />

      <button type="submit" className="btn-primary">
        <i className="fas fa-search"></i>
        Rechercher
      </button>
    </form>
  );
};

export default SearchBar;
