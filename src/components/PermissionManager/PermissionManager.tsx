import { TPermissionName, usePermission } from '@services';
import React from 'react';
import { Linking } from 'react-native';
import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import { Button } from '../Button/Button';
import { Screen } from '../Screen/Screen';
import { Text } from '../Text/Text';

type TPermissionManagerProps = {
  permissionName: TPermissionName;
  description: string;
  children: React.ReactElement;
};

export function PermissionManager({
  permissionName,
  description,
  children,
}: TPermissionManagerProps) {
  const { status, isLoading } = usePermission(permissionName);

  if (isLoading) {
    return <ActivityIndicator color="primary" />;
  }

  if (status === 'granted') {
    return children;
  }

  return (
    <Screen
      paddingHorizontal="spc24"
      gap="spc24"
      alignItems="center"
      justifyContent="center"
      flex={1}>
      <Text preset="headingMedium">{description}</Text>
      <Button title="Conceder permissão" onPress={Linking.openSettings} />
    </Screen>
  );
}
