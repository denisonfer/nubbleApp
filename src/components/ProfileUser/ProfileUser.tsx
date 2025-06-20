import { TUser } from '@domains';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Pressable } from 'react-native';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

type TProps = {
  user: Pick<TUser, 'id' | 'profileUrl' | 'userName'>;
  avatarSize?: number;
  externalOnPress?: () => void;
};

export function ProfileUser({ user, externalOnPress, avatarSize }: TProps) {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    if (externalOnPress) {
      navigation.navigate('ProfileScreen', {
        userId: user.id.toString(),
      });
      externalOnPress();
    } else {
      navigation.navigate('ProfileScreen', {
        userId: user.id.toString(),
      });
    }
  }, [user.id, externalOnPress]);

  return (
    <Pressable onPress={handlePress}>
      <Box flexDirection="row" alignItems="center" gap="spc16">
        <Avatar profileURL={user.profileUrl} size={avatarSize} />
        <Text preset="paragraphMedium" semiBold>
          {user.userName}
        </Text>
      </Box>
    </Pressable>
  );
}
