import React, { useState } from 'react';

const InputField = (props) => {
    const [ inputRef, setInputRef ] = useState(null);
    const [ hasFocus, setHasFocus ] = useState(false);
    return (
    <div className={`input-wrapper${hasFocus ? ' input-active' : ''}`}>
      <input
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onFocus={() => {setHasFocus(true)}}
        onBlur={() => {setHasFocus(false)}}
        ref={(input) => {setInputRef(input)}}
      />
      <span
        className={`input-placeholder${hasFocus ? ' input-active' : ''}${props.value !== '' ? ' input-filled' : ''}`}
        onClick={() => {inputRef.focus()}}>
        {props.placeholder}
      </span>
      {
        props.warning === undefined
          ? null
          : (
            <span className="input-warning">
              {props.warning}
            </span>
          )
      }
    </div>
  );
};

export default InputField;
