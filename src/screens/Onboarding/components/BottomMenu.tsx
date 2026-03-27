import { Box, Icon, Text, TouchableOpacityBox } from '@components';
import { TOnboardingPageProps } from './OnboardingPage';

type TBottomMenuProps = Pick<
  TOnboardingPageProps,
  'onPressNext' | 'onPressSkip'
> & {
  isLastPage: boolean;
};

export function BottomMenu({
  onPressNext,
  onPressSkip,
  isLastPage,
}: TBottomMenuProps) {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <TouchableOpacityBox onPress={onPressSkip} hitSlop={10}>
        <Text color="gray2" semiBold>
          Pular
        </Text>
      </TouchableOpacityBox>
      <TouchableOpacityBox
        flexDirection="row"
        alignItems="center"
        gap="spc8"
        onPress={onPressNext}>
        <Text color="backgroundContrast" bold>
          {isLastPage ? 'Começar' : 'Próximo'}
        </Text>
        {!isLastPage && (
          <Icon name="arrowRight" size={20} color="carrotSecondary" />
        )}
      </TouchableOpacityBox>
    </Box>
  );
}
