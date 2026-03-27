import { Image } from 'react-native';
import { TOnboardingItem } from './OnboardingData';
import { useAppThemeScheme } from '@services';
import { SCREEN_WIDTH } from '@utils';

type TProps = {
  image: TOnboardingItem['image'];
};

export function ImageHeader({ image }: TProps) {
  const appThemeScheme = useAppThemeScheme();

  const source = appThemeScheme === 'light' ? image.light : image.dark;

  return (
    <Image source={source} style={{ width: SCREEN_WIDTH, height: '100%' }} />
  );
}
