import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';

/**
 * @description custom Input
 */

export function Input({
  inputRef,
  name,
  control,
  defaultValue,
  label,
  rules,
  type,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <TextField
          inputRef={inputRef}
          label={label}
          type={type}
          variant='filled'
          value={value}
          onChange={value => onChange(value)}
          error={!!error}
          helperText={error ? error.message : null}
          {...rest}
        />
      )}
      rules={rules}
    />
  )
};
