import { Box, TouchableOpacityBox } from '../Box/Box';

export type TRadioButtonProps = {
  isSelected: boolean;
  onPress: () => void;
};

export function RadioButton({ isSelected, onPress }: TRadioButtonProps) {
  return (
    <TouchableOpacityBox
      hitSlop={10}
      justifyContent="center"
      alignItems="center"
      width={20}
      height={20}
      borderRadius="br12"
      borderColor={isSelected ? 'primary' : 'onBackgroundGray2'}
      borderWidth={isSelected ? 2 : 1}
      onPress={onPress}>
      <Box
        width={12}
        height={12}
        backgroundColor={isSelected ? 'primary' : 'transparent'}
        borderRadius="br12"></Box>
    </TouchableOpacityBox>
  );
}
