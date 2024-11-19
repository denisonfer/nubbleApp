import React from 'react';

import { useAppBoolean } from '../../../hooks/useAppBoolean';
import { Icon } from '../../Icon/Icon';
import { Input } from '../Input';

import { TPasswordInputProps } from './types';

export function PasswordInput(props: TPasswordInputProps) {
  const [showPassword, toggleVisiblePassword] = useAppBoolean();

  return (
    <Input
      secureTextEntry={showPassword}
      {...props}
      RightComponent={
        <Icon
          name={showPassword ? 'eyeOn' : 'eyeOff'}
          color="gray2"
          onPress={toggleVisiblePassword}
        />
      }
    />
  );
}
