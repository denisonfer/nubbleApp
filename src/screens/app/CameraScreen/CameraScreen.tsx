import { Box, Icon, PermissionManager, TBoxProps } from '@components';
import { useAppBoolean, useAppSafeArea, useAppState } from '@hooks';
import { useIsFocused } from '@react-navigation/native';
import { TAppScreenProps } from '@routes';
import { Dimensions, StyleSheet } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const CAMERA_VIEW = Dimensions.get('window').width;
const HEIGHT_VIEW = (Dimensions.get('window').height - CAMERA_VIEW) / 2;

export function CameraScreen({ navigation }: TAppScreenProps<'CameraScreen'>) {
  const { top } = useAppSafeArea();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const { appState } = useAppState();

  const isActive = isFocused && appState === 'active';

  const [flashOn, toggleFlashOn] = useAppBoolean();

  return (
    <PermissionManager
      permissionName="camera"
      description="Conceda a permissão para acessar a câmera.">
      <Box flex={1}>
        {device != null && (
          <Camera
            device={device}
            isActive={isActive}
            style={StyleSheet.absoluteFill}
          />
        )}

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
