import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { Box, Icon, Text, TouchableOpacityBox } from '@components';
import { useAppSafeArea } from '@hooks';
import { TAppBottomTabParamList } from '@routes';
import { $shadowProps } from '@theme';

import { itemTabMapper } from './itemTabMapper';

export function AppTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  //const { buildHref } = useLinkBuilder();
  const { bottom } = useAppSafeArea();

  return (
    <Box
      paddingTop="spc12"
      flexDirection="row"
      backgroundColor="background"
      style={[{ paddingBottom: bottom }, $shadowProps]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const tabItem =
          itemTabMapper[route.name as keyof TAppBottomTabParamList];
        const tabItemColor = isFocused ? 'primary' : 'backgroundContrast';

        return (
          <TouchableOpacityBox
            key={index}
            alignItems="center"
            activeOpacity={1}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <Icon
              name={isFocused ? tabItem.icon.focused : tabItem.icon.unfocused}
              color={tabItemColor}
            />
            <Text
              preset="paragraphCaption"
              color={tabItemColor}
              mt="spc4"
              semiBold>
              {tabItem.label}
            </Text>
          </TouchableOpacityBox>
        );
      })}
    </Box>
  );
}
