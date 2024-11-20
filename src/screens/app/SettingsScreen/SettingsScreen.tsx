import React from 'react';

import { Screen, Text } from '@components';

export function SettingsScreen() {
  return (
    <Screen canGoBack>
      <Text preset="headingLarge">Settings</Text>
    </Screen>
  );
}
