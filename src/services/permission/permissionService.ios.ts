import {
  PERMISSIONS,
  Permission,
  check as rnpCheck,
  PermissionStatus as rnpPermissionStatus,
  request as rnpRequest,
} from 'react-native-permissions';

import {
  TPermissionName,
  TPermissionService,
  TPermissionStatus,
} from './permissionTypes';

const permissionMap: Record<TPermissionName, Permission> = {
  photoLibrary: PERMISSIONS.IOS.PHOTO_LIBRARY,
  camera: PERMISSIONS.IOS.CAMERA,
};

const permissionStatusMap: Record<rnpPermissionStatus, TPermissionStatus> = {
  granted: 'granted',
  denied: 'denied',
  blocked: 'never_ask_again',
  limited: 'granted',
  unavailable: 'unavailable',
};

async function requestPermission(
  permissionName: TPermissionName,
): Promise<TPermissionStatus> {
  const status = await rnpRequest(permissionMap[permissionName]);
  return permissionStatusMap[status];
}

async function checkPermission(
  permissionName: TPermissionName,
): Promise<TPermissionStatus> {
  const status = await rnpCheck(permissionMap[permissionName]);
  return status;
}

export const permissionService: TPermissionService = {
  request: requestPermission,
  check: checkPermission,
};
