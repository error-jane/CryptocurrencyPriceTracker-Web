"use client"
// components/TextInput.tsx

import React, { useState, ChangeEvent } from 'react';

interface textInputProps {
  placeholder?: string;
  initialValue?: string;
  onChange: (value: string) => void;
}

const textField: React.FC<textInputProps> = ({
  placeholder = 'Enter text...',
  initialValue = '',
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };


  return (
    <input
      type="text"
      value={initialValue}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default textField;

