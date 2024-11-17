import { ReactElement } from 'react';
import { TextInputProps } from 'react-native';
import { TBoxProps } from '../Box/Box';

export type TInputProps = TextInputProps & {
  label: string;
  errorMessage?: string;
  boxProps?: TBoxProps;
  RightComponent?: ReactElement;
};
