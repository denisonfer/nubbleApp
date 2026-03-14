import {
  RadioButtonSelector,
  Screen,
  TRadioButtonItemProps,
} from '@components';
import { TAppScreenProps } from '@routes';

export function DarkModeScreen({}: TAppScreenProps<'DarkModeScreen'>) {
  const listItems: TRadioButtonItemProps[] = [
    {
      label: 'Ativado',
      isSelected: false,
      onPress: () => {},
    },
    {
      label: 'Desativado',
      isSelected: true,
      onPress: () => {},
    },
    {
      label: 'Padrão do sistema',
      isSelected: false,
      description:
        'A aparência será a mesma que você configurou no seus dispositivo.',
      onPress: () => {},
    },
  ];
  return (
    <Screen title="Modo escuro" canGoBack paddingHorizontal="spc24">
      <RadioButtonSelector items={listItems} />
    </Screen>
  );
}
