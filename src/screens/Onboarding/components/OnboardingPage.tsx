import { Box } from '@components';
import { ImageHeader } from './ImageHeader';
import { Content } from './Content';
import { TOnboardingItem } from './OnboardingData';
import { BottomMenu } from './BottomMenu';
import { SCREEN_WIDTH } from '@utils';

export type TOnboardingPageProps = {
  pageItem: TOnboardingItem;
  onPressNext: () => void;
  onPressSkip: () => void;
};

export function OnboardingPage({
  pageItem,
  onPressNext,
  onPressSkip,
}: TOnboardingPageProps) {
  const { image, title, subtitle } = pageItem;

  return (
    <Box flex={1} width={SCREEN_WIDTH}>
      <Box flex={4} backgroundColor="error">
        <ImageHeader image={image} />
      </Box>

      <Box flex={5} backgroundColor="success">
        <Content title={title} subtitle={subtitle} />
      </Box>
      <Box flex={1} backgroundColor="background">
        <BottomMenu onPressNext={onPressNext} onPressSkip={onPressSkip} />
      </Box>
    </Box>
  );
}
