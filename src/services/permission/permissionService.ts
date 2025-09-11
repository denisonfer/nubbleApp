import {
  TPermissionName,
  TPermissionService,
  TPermissionStatus,
} from './permissionTypes';

async function request(
  permission: TPermissionName,
): Promise<TPermissionStatus> {
  return 'granted';
}

async function check(permission: TPermissionName): Promise<TPermissionStatus> {
  return 'granted';
}

export const permissionService: TPermissionService = {
  request,
  check,
};
