import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const SearchableDropdown = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [menuOptions, setMenuOptions] = useState([
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ]);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleChange = (newValue) => {
    setSelectedOption(newValue); // Automatically set the selected option
    setInputValue('');
  };

  const handleCreateOption = (inputValue) => {
    const newOption = createOption(inputValue);
    setMenuOptions((prev) => [...prev, newOption]); // Add new option to the menu
    setSelectedOption(newOption); // Automatically select the new option
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '0.375rem',
      cursor: 'pointer',
      borderColor: 'none',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(234, 88, 12, 0.5)' : 'none',
      '&:hover': {
        borderColor: 'none',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgba(254, 215, 170, 1)' : 'white',
      cursor: 'pointer',
      color: 'black',
      '&:hover': {
        backgroundColor: 'rgba(254, 215, 170, 1)', // bg-orange-200 on hover
      },
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '0.375rem',
    }),
  };

  return (
    <CreatableSelect
      value={selectedOption}
      options={menuOptions}
      onInputChange={handleInputChange}
      onChange={handleChange}
      inputValue={inputValue}
      isClearable
      placeholder="Select or type to search..."
      noOptionsMessage={() => (inputValue ? `Add "${inputValue}"` : 'No options')}
      onCreateOption={handleCreateOption}
      isSearchable
      formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
      styles={customStyles}
    />
  );
};

export default SearchableDropdown;
