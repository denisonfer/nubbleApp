import { Box, Icon, PermissionManager, TBoxProps } from '@components';
import { useAppBoolean, useAppSafeArea } from '@hooks';
import { TAppScreenProps } from '@routes';
import { Dimensions, StyleSheet } from 'react-native';

const CAMERA_VIEW = Dimensions.get('window').width;
const HEIGHT_VIEW = (Dimensions.get('window').height - CAMERA_VIEW) / 2;

export function CameraScreen({ navigation }: TAppScreenProps<'CameraScreen'>) {
  const { top } = useAppSafeArea();

  const [flashOn, toggleFlashOn] = useAppBoolean();

  return (
    <PermissionManager
      permissionName="camera"
      description="Conceda a permissão para acessar a câmera.">
      <Box flex={1}>
        <Box backgroundColor="background" style={StyleSheet.absoluteFill} />

        <Box flex={1} justifyContent="space-between">
          <Box {...$controlAreaTop} style={{ paddingTop: top }}>
            <Icon
              name="arrowLeft"
              color="grayWhite"
              onPress={navigation.goBack}
            />
            <Icon
              name={flashOn ? 'flashOn' : 'flashOff'}
              color="grayWhite"
              onPress={toggleFlashOn}
            />
            <Box width={24} />
          </Box>

          <Box {...$controlAreaBottom}>
            <Icon name="cameraClick" color="grayWhite" />
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  );
}

const $controlAreaTop: TBoxProps = {
  flexDirection: 'row',
  height: HEIGHT_VIEW,
  backgroundColor: 'black60',
  justifyContent: 'space-between',
  paddingHorizontal: 'spc16',
};

const $controlAreaBottom: TBoxProps = {
  backgroundColor: 'black60',
  height: HEIGHT_VIEW,
  justifyContent: 'center',
  alignItems: 'center',
};
