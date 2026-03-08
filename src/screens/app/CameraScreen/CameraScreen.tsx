import { Box, Icon, PermissionManager, TBoxProps } from '@components';
import { useAppBoolean, useAppSafeArea, useAppState } from '@hooks';
import { useIsFocused } from '@react-navigation/native';
import { TAppScreenProps } from '@routes';
import { multimediaService } from '@services';
import { useCallback, useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';

const CAMERA_VIEW = Dimensions.get('window').width;
const HEIGHT_VIEW = (Dimensions.get('window').height - CAMERA_VIEW) / 2;

export function CameraScreen({ navigation }: TAppScreenProps<'CameraScreen'>) {
  const cameraRef = useRef<Camera>(null);
  const { top } = useAppSafeArea();
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const format = useCameraFormat(device, Templates.Instagram);

  const isFocused = useIsFocused();
  const { appState } = useAppState();

  const isActive = isFocused && appState === 'active';

  const [flashOn, toggleFlashOn] = useAppBoolean();

  const [isReady, setIsReady] = useState(false);

  const takePhoto = useCallback(async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current?.takePhoto({
        flash: flashOn ? 'on' : 'off',
        enableAutoRedEyeReduction: true,
        enableShutterSound: true,
      });

      navigation.navigate('PublishPostScreen', {
        imageUri: multimediaService.prepareImageUri(photo.path),
      });
    }
  }, [flashOn, navigation]);

  return (
    <PermissionManager
      permissionName="camera"
      description="Conceda a permissão para acessar a câmera.">
      <Box flex={1}>
        {device != null && (
          <Camera
            ref={cameraRef}
            device={device}
            format={format}
            isActive={isActive}
            photo={true}
            style={StyleSheet.absoluteFill}
            onInitialized={() => setIsReady(true)}
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
            {isReady && (
              <Icon name="cameraClick" color="grayWhite" onPress={takePhoto} />
            )}
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
