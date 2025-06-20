import { TThemeColors } from '../../theme/theme';
import { TTouchableOpacityBoxProps } from '../Box/Box';

export type TButtonPreset = 'primary' | 'outline' | 'text';

export interface IButtonUI {
  container: TTouchableOpacityBoxProps;
  content: TThemeColors;
}
export type TButtonProps = TTouchableOpacityBoxProps & {
  title: string;
  isLoading?: boolean;
  preset?: TButtonPreset;
};

export const buttonPresetMapper: Record<
  TButtonPreset,
  {
    default: IButtonUI;
    disabled: IButtonUI;
  }
> = {
  primary: {
    default: {
      container: {
        backgroundColor: 'primary',
      },
      content: 'primaryContrast',
    },
    disabled: {
      container: {
        backgroundColor: 'gray4',
      },
      content: 'gray2',
    },
  },
  outline: {
    default: {
      container: {
        borderWidth: 1,
        borderColor: 'primary',
      },
      content: 'primary',
    },
    disabled: {
      container: {
        borderWidth: 1,
        borderColor: 'gray4',
      },
      content: 'gray2',
    },
  },
  text: {
    default: {
      container: {
        backgroundColor: undefined,
        padding: 'spc0',
        margin: 'spc0',
      },
      content: 'primary',
    },
    disabled: {
      container: {
        backgroundColor: undefined,
      },
      content: 'gray2',
    },
  },
};
