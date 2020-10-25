import React, { useState } from 'react';

import { ReactComponent as CaretDown } from '../svg/caret-down-react.svg';

const InputDropdown = (props) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ activeOption, setActiveOption ] = useState(props.defaultOption || props.options[0]);

  const handleOptionChange = (option) => {
    setIsOpen(false);
    setActiveOption(option);
    props.onChange(option.value);
  };

  const mapOptions = () => (
    props.options.map((option) => (
      <span
        key={option.value}
        className="dropdown-option"
        onClick={() => handleOptionChange(option)}
      >
        {option.label}
      </span>
    ))
  );

  return (
    <div
      className={`input-dropdown${isOpen ? ' active' : ''}`}
      onClick={() => {setIsOpen(!isOpen)}}
    >
      <span>{activeOption.label}</span>
      <CaretDown className="dropdown-icon" />
      <div className={`dropdown-options${isOpen ? '' : ' hidden'}`}>
        {mapOptions()}
      </div>
    </div>
  );
};

export default InputDropdown;
