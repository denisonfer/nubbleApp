import { Icon, Text, TouchableOpacityBox } from '@components';

export type TMenuItemProps = {
  label: string;
  onPress: () => void;
};

export function MenuItem({ label, onPress }: TMenuItemProps) {
  return (
    <TouchableOpacityBox
      onPress={onPress}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      paddingVertical="spc16">
      <Text semiBold>{label}</Text>
      <Icon name="chevronRight" color="iconColor" />
    </TouchableOpacityBox>
  );
}
