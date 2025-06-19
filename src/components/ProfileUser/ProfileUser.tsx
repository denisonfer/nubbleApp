import { TUser } from '@domains';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { Pressable } from 'react-native';
import { Avatar } from '../Avatar/Avatar';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';

type TProps = {
  user: Pick<TUser, 'id' | 'profileUrl' | 'userName'>;
};

export function ProfileUser({ user }: TProps) {
  const navigation = useNavigation();

  const navigateToProfileScreen = useCallback(() => {
    navigation.navigate('ProfileScreen', { userId: user.id.toString() });
  }, [user.id]);

  return (
    <Pressable onPress={navigateToProfileScreen}>
      <Box flexDirection="row" alignItems="center" gap="spc16">
        <Avatar profileURL={user.profileUrl} />
        <Text preset="paragraphMedium" semiBold>
          {user.userName}
        </Text>
      </Box>
    </Pressable>
  );
}
