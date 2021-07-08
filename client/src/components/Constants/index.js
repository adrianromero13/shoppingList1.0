import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Input as InputField } from '@material-ui/core';


/**
 * @description custom form 
 * 
 */

export function Form({
  defaultValues,
  children,
  onSubmit,
  className,
}) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      {React.Children.map(children, child => {
        return child.props.name
          ? React.createElement(child.type, {
            ...{
              ...child.props,
              register: methods.register,
              key: child.props.name
            }
          })
          : child;
      })}
    </form>
  )
}

export function Input({
  register,
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
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          label={label}
          type={type}
          variant='filled'
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
      rules={rules}
    />
  )
}

