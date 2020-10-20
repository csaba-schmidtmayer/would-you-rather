import React, { useState } from 'react';

import avatars from '../svg/avatars';
import chevronLeft from '../svg/chevron-left.svg';
import chevronRight from '../svg/chevron-right.svg';
import toggleLeft from '../svg/toggle-left.svg';
import toggleRight from '../svg/toggle-right.svg';

const AvatarPicker = (props) => {
  const types = {
    male: Object.keys(avatars)
      .filter((key) => (!key.includes('female'))),
    female: Object.keys(avatars)
      .filter((key) => (key.includes('female')))
  }

  const [ type, setType ] = useState('female');
  const [ index, setIndex ] = useState(0);

  const pageDown = () => {
    const newIndex = index === 0
      ? types[type].length - 1
      : index - 1;
    props.onChange(types[type][newIndex]);
    setIndex(newIndex);
  };

  const pageUp = () => {
    const newIndex = index === types[type].length - 1
      ? 0
      : index + 1;
    props.onChange(types[type][newIndex]);
    setIndex(newIndex);
  };

  const changeType = () => {
    const newIndex = 0;
    const newType = type === 'male'
      ? 'female'
      : 'male';
    props.onChange(types[newType][newIndex]);
    setIndex(newIndex);
    setType(newType);
  };

  return (
    <div className="avatar-picker">
      <div>
        <img
          className="avatar-picker-icon"
          src={chevronLeft}
          onClick={pageDown}
        />
        <img
          className="avatar-picker-avatar"
          src={avatars[types[type][index]]}
        />
        <img
          className="avatar-picker-icon"
          src={chevronRight}
          onClick={pageUp}
        />
      </div>
      <div>
        <div
          onClick={changeType}
        >
          <img
            className="avatar-picker-icon"
            src={type === 'female' ? toggleRight : toggleLeft}
          />
          <span>
            Show female avatars
          </span>
        </div>
        <div
          onClick={changeType}
        >
          <img
            className="avatar-picker-icon"
            src={type === 'male' ? toggleRight : toggleLeft}
          />
          <span>
            Show male avatars
          </span>
        </div>
      </div>
    </div>
  )
};

export default AvatarPicker;
