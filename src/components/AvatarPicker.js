import React, { useState, useEffect } from 'react';

import InputDropdown from './InputDropdown';
import avatars from '../svg/avatars';
import chevronLeft from '../svg/chevron-left.svg';
import chevronRight from '../svg/chevron-right.svg';

const AvatarPicker = (props) => {
  const types = {
    male: Object.keys(avatars)
      .filter((key) => (!key.includes('female'))),
    female: Object.keys(avatars)
      .filter((key) => (key.includes('female')))
  }

  const options = [
    {
      value: 'male',
      label: 'Show male avatars'
    },
    {
      value: 'female',
      label: 'Show female avatars'
    }
  ];
  const defaultOption = options[1];

  const [ type, setType ] = useState(defaultOption.value);
  const [ index, setIndex ] = useState(0);
  const [ selectedAvatar, setSelectedAvatar] = useState(types[type][index]);
  const { onChange } = props;

  useEffect(() => {
    onChange(selectedAvatar);
  }, [onChange, selectedAvatar]);

  const pageDown = () => {
    const newIndex = index === 0
      ? types[type].length - 1
      : index - 1;
    setIndex(newIndex);
    setSelectedAvatar(types[type][newIndex]);
  };

  const pageUp = () => {
    const newIndex = index === types[type].length - 1
      ? 0
      : index + 1;
    setIndex(newIndex);
    setSelectedAvatar(types[type][newIndex]);
  };

  const handleTypeChange = (value) => {
    const newIndex = 0;
    setIndex(newIndex);
    setType(value);
    setSelectedAvatar(types[value][newIndex]);
  };

  return (
    <div className="avatar-picker">
      <div className="avatar-picker-row">
        <img
          className="avatar-picker-icon"
          src={chevronLeft}
          onClick={pageDown}
          alt="Show previous avatar"
        />
        <img
          className="avatar-picker-avatar"
          src={avatars[types[type][index]]}
          alt="The selected avatar"
        />
        <img
          className="avatar-picker-icon"
          src={chevronRight}
          onClick={pageUp}
          alt="Show next avatar"
        />
      </div>
      <div className="avatar-picker-row">
        <InputDropdown
          options={options}
          defaultOption={defaultOption}
          onChange={handleTypeChange}
        />
      </div>
    </div>
  )
};

export default AvatarPicker;
