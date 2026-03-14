import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { RadioButton, TRadioButtonProps } from './RadioButton';

export type TRadioButtonItemProps = TRadioButtonProps & {
  label: string;
  description?: string;
};

export function RadioButtonItem({
  label,
  description,
  ...radioButtonProps
}: TRadioButtonItemProps) {
  return (
    <Box paddingVertical="spc12">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <Text semiBold>{label}</Text>
        <RadioButton {...radioButtonProps} />
      </Box>
      {description && (
        <Text style={{ width: '80%' }} color="gray1">
          {description}
        </Text>
      )}
    </Box>
  );
}
