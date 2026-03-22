import { RadioButtonSelector, Screen } from '@components';
import { TAppScreenProps } from '@routes';

import {
  TThemePreference,
  useSettingsService,
  useThemePreference,
} from '@services';

type TOption = {
  label: string;
  description?: string;
  themePreference: TThemePreference;
};

const listItems: TOption[] = [
  {
    label: 'Ativado',
    themePreference: 'dark',
  },
  {
    label: 'Desativado',
    themePreference: 'light',
  },
  {
    label: 'Padrão do sistema',
    description:
      'A aparência será a mesma que você configurou no seus dispositivo.',
    themePreference: 'system',
  },
];

export function DarkModeScreen({}: TAppScreenProps<'DarkModeScreen'>) {
  const themePreference = useThemePreference();
  const { setThemePreference } = useSettingsService();
  const selectedItem = listItems.find(
    item => item.themePreference === themePreference,
  );

  const setSelectedItem = (item: TOption) => {
    setThemePreference(item.themePreference);
  };

  return (
    <Screen title="Modo escuro" canGoBack paddingHorizontal="spc24">
      <RadioButtonSelector
        labelKey="label"
        descriptionKey="description"
        valueKey="themePreference"
        items={listItems}
        selectedItem={selectedItem}
        onSelect={setSelectedItem}
      />
    </Screen>
  );
}
