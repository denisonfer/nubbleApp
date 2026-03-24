import { Box, Icon, Text, TouchableOpacityBox } from '@components';
import { TOnboardingPageProps } from './OnboardingPage';

type TBottomMenuProps = Pick<
  TOnboardingPageProps,
  'onPressNext' | 'onPressSkip'
>;

export function BottomMenu({ onPressNext, onPressSkip }: TBottomMenuProps) {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <TouchableOpacityBox onPress={onPressSkip}>
        <Text preset="paragraphMedium" color="backgroundContrast" semiBold>
          Pular
        </Text>
      </TouchableOpacityBox>
      <TouchableOpacityBox
        flexDirection="row"
        alignItems="center"
        gap="spc8"
        onPress={onPressNext}>
        <Text preset="paragraphMedium" color="backgroundContrast" bold>
          Próximo
        </Text>
        <Icon name="arrowRight" size={20} color="carrotSecondary" />
      </TouchableOpacityBox>
    </Box>
  );
}
