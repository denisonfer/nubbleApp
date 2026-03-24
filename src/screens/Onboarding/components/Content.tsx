import { Box, Text } from '@components';
import { TOnboardingItem } from './OnboardingData';

type TProps = Omit<TOnboardingItem, 'image'>;

export function Content({ title, subtitle }: TProps) {
  return (
    <Box flex={5} backgroundColor="success">
      <Text preset="headingLarge" mb="spc16">
        {title}
      </Text>
      <Text preset="paragraphLarge" mb="spc40">
        {subtitle}
      </Text>
    </Box>
  );
}
