import { Screen, Text } from '@components';
import { TAppScreenProps } from '@routes';

export function DarkModeScreen({}: TAppScreenProps<'DarkModeScreen'>) {
  return (
    <Screen title="Modo escuro" canGoBack>
      <Text>Modo escuro</Text>
    </Screen>
  );
}
