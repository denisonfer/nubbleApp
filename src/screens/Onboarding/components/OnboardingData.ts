import { images } from '@assets/images';
import { ImageProps } from 'react-native';

type TImageOnboarding = ImageProps['source'];

export type TOnboardingItem = {
  image: {
    light: TImageOnboarding;
    dark: TImageOnboarding;
  };
  title: Array<{ text: string; isHighlighted: boolean }>;
  subtitle: string;
  index: number;
  totalPages: number;
  isLastPage: boolean;
};

type TOnboardingItemWithoutMetaData = Omit<
  TOnboardingItem,
  'index' | 'totalPages' | 'isLastPage'
>;

const onboardingPage1: TOnboardingItemWithoutMetaData = {
  image: {
    light: images.onboardingLight1,
    dark: images.onboardingDark1,
  },
  title: [
    { text: 'Uma rede social de ', isHighlighted: false },
    { text: 'conexões reais', isHighlighted: true },
  ],
  subtitle:
    'Fique por dentro do que acontece com as pessoas que você mais gosta',
};

const onboardingPage2: TOnboardingItemWithoutMetaData = {
  image: {
    light: images.onboardingLight2,
    dark: images.onboardingDark2,
  },
  title: [
    { text: 'Compartilhe suas ', isHighlighted: false },
    { text: 'histórias ', isHighlighted: true },
    { text: 'com seus amigos próximos', isHighlighted: false },
  ],
  subtitle: 'Tenha sua linha do tempo personalizada',
};

const onboardingPage3: TOnboardingItemWithoutMetaData = {
  image: {
    light: images.onboardingLight3,
    dark: images.onboardingDark3,
  },
  title: [
    { text: 'Interaja ', isHighlighted: true },
    { text: 'em tempo real com as pessoas', isHighlighted: false },
  ],
  subtitle: 'Curta, comente e favorite os conteúdos que você mais gostar',
};

export const onboardingData = [
  onboardingPage1,
  onboardingPage2,
  onboardingPage3,
].map((page, index, pages) => ({
  ...page,
  index,
  totalPages: pages.length,
  isLastPage: index === pages.length - 1,
}));
