export type TPermissionStatus =
  | 'granted'
  | 'denied'
  | 'never_ask_again'
  | 'unavailable'
  | 'blocked'
  | 'limited';

export type TPermissionName = 'photoLibrary' | 'camera';

export type TPermissionService = {
  request: (permission: TPermissionName) => Promise<TPermissionStatus>;
  check: (permission: TPermissionName) => Promise<TPermissionStatus>;
};
