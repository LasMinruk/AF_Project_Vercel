import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchableDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon,
  labelKey = 'name',
  valueKey = 'value'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option => 
    option[labelKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(opt => opt[valueKey] === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option[valueKey]);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
  };

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '0.75rem 1rem 0.75rem 2.5rem',
          width: '100%',
          borderRadius: '0.75rem',
          border: '1px solid #d1d5db',
          backgroundColor: 'white',
          outline: 'none',
          transition: 'all 0.2s',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {Icon && (
            <Icon style={{
              position: 'absolute',
              left: '0.75rem',
              color: '#9ca3af'
            }} />
          )}
          <span style={{ color: selectedOption ? '#111827' : '#9ca3af' }}>
            {selectedOption ? selectedOption[labelKey] : placeholder}
          </span>
        </div>
        {value && (
          <FaTimes
            onClick={handleClear}
            style={{
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          />
        )}
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.5rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #d1d5db',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 50,
          maxHeight: '300px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '0.75rem',
            borderBottom: '1px solid #e5e7eb',
            position: 'relative'
          }}>
            <FaSearch style={{
              position: 'absolute',
              left: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              fontSize: '0.875rem'
            }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              style={{
                width: '100%',
                padding: '0.5rem 1rem 0.5rem 2.5rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                outline: 'none',
                fontSize: '0.875rem'
              }}
            />
          </div>
          <div style={{
            overflowY: 'auto',
            maxHeight: '250px'
          }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option[valueKey]}
                  onClick={() => handleSelect(option)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    backgroundColor: option[valueKey] === value ? '#f3f4f6' : 'transparent',
                    color: option[valueKey] === value ? '#111827' : '#4b5563',
                    ':hover': {
                      backgroundColor: '#f3f4f6'
                    }
                  }}
                >
                  {option[labelKey]}
                </div>
              ))
            ) : (
              <div style={{
                padding: '0.75rem 1rem',
                color: '#6b7280',
                textAlign: 'center'
              }}>
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown; 