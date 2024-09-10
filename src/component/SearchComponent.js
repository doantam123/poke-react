import React, { useState } from 'react';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';

const SearchComponent = () => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  // Regex to allow only letters (a-z, A-Z)
  const regex = /^[a-zA-Z]+$/;

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Validation logic using regex
    if (!regex.test(value)) {
      setError('Input must contain only letters.');
    } else {
      setError(''); // Clear error if validation passes
    }
  };

  return (
    <div>
      <Input 
        value={inputValue}
        onChange={handleChange} 
        error={!!error}  // Highlight input if there's an error
      />
      <FormHelperText error={!!error}>
        {error}
      </FormHelperText>
    </div>
  );
}

export default SearchComponent;
