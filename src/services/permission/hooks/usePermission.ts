import { useCallback, useEffect, useState } from 'react';
import { permissionService } from '../permissionService';
import { TPermissionName, TPermissionStatus } from '../permissionTypes';

export function usePermission(permissionName: TPermissionName) {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<TPermissionStatus>();

  const checkPermission = useCallback(async () => {
    try {
      setIsLoading(true);
      const initialStatus = await permissionService.check(permissionName);
      if (initialStatus === 'denied') {
        const _status = await permissionService.request(permissionName);
        setStatus(_status);
      } else {
        setStatus(initialStatus);
      }
    } catch (_) {
      setStatus('unavailable');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    status,
    isLoading,
  };
}
