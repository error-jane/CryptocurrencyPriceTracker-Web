"use client"
// components/TextInput.tsx

import React, { useState, ChangeEvent } from 'react';

interface TextInputProps {
  placeholder?: string;
  initialValue?: string;
  type?: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<TextInputProps> = ({
  placeholder = 'Enter text...',
  initialValue = '',
  type = "text",
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
      className='rounded-full py-1 px-5 border bg-transparent border-white'
      type={type}
      value={initialValue}
      onChange={handleInputChange}
      placeholder={placeholder}
    />
  );
};

export default TextField;

