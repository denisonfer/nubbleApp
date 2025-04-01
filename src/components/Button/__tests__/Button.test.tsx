import { StyleSheet } from 'react-native';

import { theme } from '@theme';

import { fireEvent, render, screen } from '@test';

import { Button } from '../Button';
import { TButtonProps } from '../types';

function renderButton(props?: Omit<TButtonProps, 'title'>) {
  render(<Button title="Hello" {...props} />);

  const titleElement = screen.queryByText('Hello', { exact: false });
  const buttonElement = screen.getByTestId('button');
  const loadingElement = screen.queryByTestId('activity-indicator'); //? queryByTestId returns null if the element is not found - Ideal for elements that are not always present

  return {
    titleElement,
    buttonElement,
    loadingElement,
  };
}

describe('<Button />', () => {
  it('should render correctly', () => {
    const { titleElement } = renderButton({});

    expect(titleElement).toBeTruthy();
  });

  it('Should call function on press', () => {
    const onPressMocked = jest.fn();

    const { titleElement } = renderButton({ onPress: onPressMocked });

    fireEvent.press(titleElement!);

    expect(onPressMocked).toHaveBeenCalled();
  });

  it('should not call function on press when disabled', () => {
    const onPressMocked = jest.fn();

    const { titleElement } = renderButton({
      onPress: onPressMocked,
      disabled: true,
    });

    fireEvent.press(titleElement!);

    expect(onPressMocked).not.toHaveBeenCalled();
  });

  test('the title should be gray when disabled', () => {
    const { titleElement } = renderButton({ disabled: true });

    const titleStyle = StyleSheet.flatten(titleElement!.props.style);

    expect(titleStyle.color).toBe(theme.colors.gray2);
  });

  describe('when the button is loading:', () => {
    it('should show a loading indicator', () => {
      const { loadingElement } = renderButton({
        isLoading: true,
      });

      expect(loadingElement).toBeTruthy();
    });
    it('should not show button title when loading', () => {
      const { titleElement } = renderButton({
        isLoading: true,
      });

      expect(titleElement).toBeNull();
    });

    it('should disable button when loading', () => {
      const onPressMocked = jest.fn();
      const { buttonElement } = renderButton({
        isLoading: true,
        onPress: onPressMocked,
      });

      fireEvent.press(buttonElement);

      expect(onPressMocked).not.toHaveBeenCalled();
    });
  });
});
