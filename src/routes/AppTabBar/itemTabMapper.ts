import { TIconNames } from '@components';
import { TAppBottomTabParamList } from '@routes';

type TButtonIconProps = {
  label: string;
  icon: {
    focused: TIconNames;
    unfocused: TIconNames;
  };
};

export const itemTabMapper: Record<
  keyof TAppBottomTabParamList,
  TButtonIconProps
> = {
  HomeScreen: {
    label: 'Início',
    icon: {
      focused: 'homeFill',
      unfocused: 'home',
    },
  },
  NewPostScreen: {
    label: 'Novo post',
    icon: {
      focused: 'newPost',
      unfocused: 'newPost',
    },
  },
  FavoritesScreen: {
    label: 'Favoritos',
    icon: {
      focused: 'bookmarkFill',
      unfocused: 'bookmark',
    },
  },
  ProfileScreen: {
    label: 'Meu perfil',
    icon: {
      focused: 'profileFill',
      unfocused: 'profile',
    },
  },
};
