import React from 'react';

import { Controller, FieldValues, UseControllerProps } from 'react-hook-form';

import { Input } from '../Input';
import { TInputProps } from '../types';

export function FormInput<TForm extends FieldValues>({
  name,
  control,
  rules,
  ...tInputProps
}: TInputProps & UseControllerProps<TForm>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Input
          value={value}
          onChangeText={onChange}
          errorMessage={error?.message}
          {...tInputProps}
        />
      )}
    />
  );
}
