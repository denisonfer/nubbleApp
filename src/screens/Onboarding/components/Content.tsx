import { Box, Text } from '@components';
import { TOnboardingItem } from './OnboardingData';
import { DotPagination } from './DotPagination';

type TProps = Omit<TOnboardingItem, 'image' | 'isLastPage'>;

export function Content({ title, subtitle, index, totalPages }: TProps) {
  return (
    <Box>
      <DotPagination totalPages={totalPages} activeIndex={index} />
      <Text preset="headingLarge" marginVertical="spc16">
        {title.map((item, index) => (
          <Text
            key={index}
            preset="headingLarge"
            color={
              item.isHighlighted ? 'carrotSecondary' : 'backgroundContrast'
            }>
            {item.text}
          </Text>
        ))}
      </Text>
      <Text preset="paragraphLarge" mb="spc40">
        {subtitle}
      </Text>
    </Box>
  );
}
