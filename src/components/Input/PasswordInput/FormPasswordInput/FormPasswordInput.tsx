import React from 'react';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { TPasswordInputProps } from '../../types';
import { PasswordInput } from '../PasswordInput';

export function FormPasswordInput<TForm extends FieldValues>({
  name,
  control,
  rules,
  ...tPasswordInputProps
}: TPasswordInputProps & UseControllerProps<TForm>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <PasswordInput
          value={value}
          onChangeText={onChange}
          errorMessage={error?.message}
          {...tPasswordInputProps}
        />
      )}
    />
  );
}
