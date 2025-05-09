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
  const inputRef = useRef(null);

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

  // Focus input when dropdown opens (for mobile UX)
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

  // Keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsOpen((open) => !open);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
      }}
      ref={dropdownRef}
    >
      <div
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleKeyDown}
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
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
          {Icon && (
            <Icon style={{
              position: 'absolute',
              left: '0.75rem',
              color: '#9ca3af',
              pointerEvents: 'none'
            }} />
          )}
          <span style={{
            color: selectedOption ? '#111827' : '#9ca3af',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
            display: 'block'
          }}>
            {selectedOption ? selectedOption[labelKey] : placeholder}
          </span>
        </div>
        {value && (
          <FaTimes
            onClick={handleClear}
            tabIndex={0}
            aria-label="Clear selection"
            style={{
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') handleClear(e); }}
          />
        )}
      </div>

      {isOpen && (
        <div
          className="searchable-dropdown"
          style={{
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
            maxHeight: '50vh', // Responsive height
            minWidth: 0,
            width: '100vw', // Full width on mobile
            maxWidth: '400px', // Prevent too wide on desktop
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <div style={{
            padding: '0.75rem',
            borderBottom: '1px solid #e5e7eb',
            position: 'relative',
            background: 'white'
          }}>
            <FaSearch style={{
              position: 'absolute',
              left: '1.25rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af',
              fontSize: '0.875rem',
              pointerEvents: 'none'
            }} />
            <input
              ref={inputRef}
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
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
              aria-label="Search options"
            />
          </div>
          <div style={{
            overflowY: 'auto',
            maxHeight: '35vh', // Responsive height
            minHeight: '2.5rem'
          }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option[valueKey]}
                  onClick={() => handleSelect(option)}
                  tabIndex={0}
                  role="option"
                  aria-selected={option[valueKey] === value}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    backgroundColor: option[valueKey] === value ? '#f3f4f6' : 'transparent',
                    color: option[valueKey] === value ? '#111827' : '#4b5563',
                    outline: 'none',
                    border: 'none',
                    transition: 'background 0.2s'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSelect(option);
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

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 600px) {
            .searchable-dropdown {
              max-width: 100vw !important;
              left: 0 !important;
              right: 0 !important;
              border-radius: 0 !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SearchableDropdown;
