import { images } from '@assets/images';
import { ImageProps } from 'react-native';

type TImageOnboarding = ImageProps['source'];

export type TOnboardingItem = {
  image: {
    light: TImageOnboarding;
    dark: TImageOnboarding;
  };
  title: string;
  subtitle: string;
};

const onboardingPage1: TOnboardingItem = {
  image: {
    light: images.onboardingLight1,
    dark: images.onboardingDark1,
  },
  title: 'Uma rede social de conexões reais',
  subtitle:
    'Fique por dentro do que acontece com as pessoas que você mais gosta',
};

const onboardingPage2: TOnboardingItem = {
  image: {
    light: images.onboardingLight2,
    dark: images.onboardingDark2,
  },
  title: 'Compartilhe suas histórias com seus amigos próximos',
  subtitle: 'Tenha sua linha do tempo personalizada',
};

const onboardingPage3: TOnboardingItem = {
  image: {
    light: images.onboardingLight3,
    dark: images.onboardingDark3,
  },
  title: 'Interaja em tempo real com as pessoas',
  subtitle: 'Curta, comente e favorite os conteúdos que você mais gostar',
};

export const onboardingData = [
  onboardingPage1,
  onboardingPage2,
  onboardingPage3,
];
