import React from 'react';
import { Pressable } from 'react-native';

import { useAppTheme } from '@hooks';

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  BellOnIcon,
  BookmarkFillIcon,
  BookmarkIcon,
  CameraIcon,
  ChatIcon,
  ChatOnIcon,
  CheckIcon,
  CheckRoundIcon,
  ChevronRightIcon,
  CommentIcon,
  EyeOffIcon,
  EyeOnIcon,
  FlashOffIcon,
  FlashOnIcon,
  HeartFillIcon,
  HeartIcon,
  HomeFillIcon,
  HomeIcon,
  MessageIcon,
  MessageRoundIcon,
  MoreIcon,
  NewPostIcon,
  ProfileFillIcon,
  ProfileIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
} from '@assets/icons';

import { TIconProps } from './types';

export function Icon({
  name,
  size,
  onPress,
  color = 'backgroundContrast',
}: TIconProps) {
  const { colors } = useAppTheme();
  const IconComponent = iconsMapper[name];

  if (onPress) {
    return (
      <Pressable onPress={onPress} hitSlop={10}>
        <IconComponent size={size} color={colors[color]} />
      </Pressable>
    );
  }

  return <IconComponent size={size} color={colors[color]} />;
}

const iconsMapper = {
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  bell: BellIcon,
  bellOn: BellOnIcon,
  bookmark: BookmarkIcon,
  bookmarkFill: BookmarkFillIcon,
  camera: CameraIcon,
  chat: ChatIcon,
  chatOn: ChatOnIcon,
  check: CheckIcon,
  checkRound: CheckRoundIcon,
  comment: CommentIcon,
  chevronRight: ChevronRightIcon,
  eyeOn: EyeOnIcon,
  eyeOff: EyeOffIcon,
  flashOn: FlashOnIcon,
  flashOff: FlashOffIcon,
  heart: HeartIcon,
  heartFill: HeartFillIcon,
  home: HomeIcon,
  homeFill: HomeFillIcon,
  message: MessageIcon,
  messageRoundIcon: MessageRoundIcon,
  more: MoreIcon,
  newPost: NewPostIcon,
  profile: ProfileIcon,
  profileFill: ProfileFillIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  trash: TrashIcon,
};

export type TIconNames = keyof typeof iconsMapper;
