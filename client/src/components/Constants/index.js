import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';


/**
 * @description custom form 
 * 
 */

 // couldn't get this to work
// export function Form({
//   defaultValue,
//   // values,
//   children,
//   onSubmit,
//   className,
// }) {
//   // const methods = useForm({ defaultValue });
//   const methods = useForm();
//   const { handleSubmit, register } = methods;
  
//   return (
//     <form 
//     onSubmit={handleSubmit(onSubmit)} 
//     className={className}
//     noValidate
//     >
//       {React.Children.map(children, child => {
//         return child.props.name
//           ? React.createElement(child.type, {
//             ...{
//               ...child.props,
//               register: methods.register,
//               key: child.props.name
//             }
//           })
//           : child;
//       })}
//     </form>
//   )
// }

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
          // {...rest}
          label={label}
          type={type}
          variant='filled'
          value={value}
          onChange={value => onChange(value)}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
      rules={rules}
    />
  )
}

