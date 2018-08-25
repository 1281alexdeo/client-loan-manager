import React from 'react';
import classnames from 'classnames';
const FromInputGroup = ({
  label,
  value,
  name,
  errors,
  onChange,
  placeholder,
  className,
  type,
  defaultValue,
  ref,
  disabled
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        className={classnames(
          errors
            ? (className = 'is-invalid form-control')
            : (className = 'form-control'),
          {
            disabled: disabled
          }
        )}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
        errors={errors}
      />
    </div>
  );
};

export default FromInputGroup;
