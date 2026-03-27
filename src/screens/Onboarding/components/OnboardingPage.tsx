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
  const { image, title, subtitle, isLastPage, index, totalPages } = pageItem;

  return (
    <Box flex={1} width={SCREEN_WIDTH}>
      <Box flex={4}>
        <ImageHeader image={image} />
      </Box>

      <Box flex={5} paddingHorizontal="spc24">
        <Content
          title={title}
          subtitle={subtitle}
          index={index}
          totalPages={totalPages}
        />
      </Box>
      <Box flex={1} paddingHorizontal="spc24">
        <BottomMenu
          onPressNext={onPressNext}
          onPressSkip={onPressSkip}
          isLastPage={isLastPage}
        />
      </Box>
    </Box>
  );
}
