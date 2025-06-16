import React from 'react';

import { LogoSimple } from '@assets/brand';

import { Box, Icon, TBoxProps } from '@components';
import { useAppSafeArea } from '@hooks';
import { useNavigation } from '@react-navigation/native';

export function HomeHeader() {
  const navigation = useNavigation();
  const { top } = useAppSafeArea();

  return (
    <Box {...$wrapper} style={{ paddingTop: top }}>
      <LogoSimple width={70} />
      <Box {...$rowIcons}>
        <Box mr="spc24">
          <Icon
            name="search"
            color="backgroundContrast"
            onPress={() => navigation.navigate('SearchScreen')}
          />
        </Box>
        <Box mr="spc24">
          <Icon name="bell" color="backgroundContrast" />
        </Box>
        <Box>
          <Icon name="comment" color="backgroundContrast" />
        </Box>
      </Box>
    </Box>
  );
}

const $wrapper: TBoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 'spc24',
  pb: 'spc16',
};

const $rowIcons: TBoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
};
