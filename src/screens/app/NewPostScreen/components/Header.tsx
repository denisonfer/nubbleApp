import { Box, Button, Icon, TBoxProps, Text } from '@components';
import { ImageBackground, ImageStyle, StyleProp } from 'react-native';

type TProps = {
  imageUri: string;
  imageWidth: number;
};

export function Header({ imageUri, imageWidth }: TProps) {
  return (
    <Box>
      <ImageBackground
        source={{ uri: imageUri }}
        style={[{ width: imageWidth, height: imageWidth }, $imageBackground]}>
        <Button title="Escolher essa" mb="spc24" />
      </ImageBackground>
      <Box {...$header}>
        <Text preset="headingSmall">Sua galeria</Text>
        <Icon name="camera" />
      </Box>
    </Box>
  );
}

const $header: TBoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'spc24',
};

const $imageBackground: StyleProp<ImageStyle> = {
  justifyContent: 'flex-end',
  alignItems: 'center',
};
