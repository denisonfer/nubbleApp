import { PermissionsAndroid, Platform } from 'react-native';

export type TPermissionStatus = 'granted' | 'denied' | 'never_ask_again';

/**
 * Verifica se o aplicativo tem permissão para acessar a galeria de fotos no Android
 */
async function hasAndroidPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  // Para Android 13+ (API 33+)
  if (Platform.Version >= 33) {
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      {
        title: 'Permissão para Acessar Fotos',
        message:
          'Este aplicativo precisa acessar suas fotos para funcionar corretamente.',
        buttonNeutral: 'Perguntar Depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    return status === PermissionsAndroid.RESULTS.GRANTED;
  } else {
    // Para Android 12 e anteriores (API 32-)
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Permissão para Acessar Armazenamento',
        message:
          'Este aplicativo precisa acessar o armazenamento para gerenciar suas fotos.',
        buttonNeutral: 'Perguntar Depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    return status === PermissionsAndroid.RESULTS.GRANTED;
  }
}

/**
 * Verifica se o aplicativo tem permissão para escrever no armazenamento externo (Android)
 */
async function hasAndroidWritePermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: 'Permissão para Salvar Fotos',
      message: 'Este aplicativo precisa salvar fotos no seu dispositivo.',
      buttonNeutral: 'Perguntar Depois',
      buttonNegative: 'Cancelar',
      buttonPositive: 'OK',
    },
  );
  return status === PermissionsAndroid.RESULTS.GRANTED;
}

/**
 * Solicita todas as permissões necessárias para usar o Camera Roll
 * @returns Promise<boolean> - true se todas as permissões foram concedidas
 */
export async function requestCameraRollPermissions(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    // No iOS, as permissões são solicitadas automaticamente quando necessário
    return true;
  }

  // Para Android, solicita as permissões necessárias
  const readPermission = await hasAndroidPermission();
  const writePermission = await hasAndroidWritePermission();

  return readPermission && writePermission;
}

/**
 * Verifica se o aplicativo tem permissões para acessar o Camera Roll
 * @returns Promise<boolean> - true se tem permissões
 */
export async function checkCameraRollPermissions(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    // No iOS, assumimos que as permissões serão solicitadas quando necessário
    return true;
  }

  // Para Android, verifica as permissões sem solicitar
  if (+Platform.Version >= 33) {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );
  } else {
    return await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
  }
}

/**
 * Hook personalizado para gerenciar permissões do Camera Roll
 * Exemplo de uso:
 *
 * ```typescript
 * import { useCameraRollPermissions } from '@/utils/cameraRollPermissions';
 *
 * const MyComponent = () => {
 *   const handleSavePhoto = async () => {
 *     const hasPermission = await requestCameraRollPermissions();
 *     if (hasPermission) {
 *       // Salvar a foto usando @react-native-camera-roll/camera-roll
 *       CameraRoll.save(photoUri);
 *     } else {
 *       // Mostrar mensagem de erro ou solicitar permissão novamente
 *     }
 *   };
 * };
 * ```
 */
