import { Permission, PermissionsAndroid, Platform } from 'react-native';
import {
  TPermissionName,
  TPermissionService,
  TPermissionStatus,
} from './permissionTypes';

function mapNameToPermission(
  permissionName: TPermissionName,
): Permission | null {
  switch (permissionName) {
    case 'photoLibrary':
      if (+Platform.Version >= 33) {
        return PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      } else {
        return PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
      }
      return PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    case 'camera':
      return PermissionsAndroid.PERMISSIONS.CAMERA;
    default:
      return null;
  }
}

async function request(
  permissionName: TPermissionName,
): Promise<TPermissionStatus> {
  const permission = mapNameToPermission(permissionName);
  if (permission) {
    const status = await PermissionsAndroid.request(permission);
    return status;
  } else {
    return 'unavailable';
  }
}

async function check(
  permissionName: TPermissionName,
): Promise<TPermissionStatus> {
  const permission = mapNameToPermission(permissionName);
  if (permission) {
    const status = await PermissionsAndroid.check(permission);
    return status ? 'granted' : 'denied';
  } else {
    return 'unavailable';
  }
}

export const permissionService: TPermissionService = {
  request,
  check,
};
