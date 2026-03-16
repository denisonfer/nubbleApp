import { RadioButtonSelector, Screen } from '@components';
import { TAppScreenProps } from '@routes';
import { useState } from 'react';

type TThemeMode = 'light' | 'dark' | 'system';
type TOption = {
  label: string;
  description?: string;
  themePreference: TThemeMode;
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
  const [selectedItem, setSelectedItem] = useState<TOption>();
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
