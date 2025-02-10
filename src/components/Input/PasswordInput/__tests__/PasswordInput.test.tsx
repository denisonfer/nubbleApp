import { fireEvent, render, screen } from '@test';

import { PasswordInput } from '../PasswordInput';
import { TPasswordInputProps } from '../types';

function renderPasswordInput(props?: TPasswordInputProps) {
  const mockedOnChangeText = jest.fn();
  render(
    <PasswordInput
      label="Password"
      value="password"
      placeholder="Password"
      onChangeText={mockedOnChangeText}
      {...props}
    />,
  );

  const valueElement = screen.getByText('password', { exact: false });
  const placeholderElement = screen.getByPlaceholderText('Password');
  const eyeOnIconElement = screen.getByTestId('eyeOn');

  return {
    valueElement,
    placeholderElement,
    eyeOnIconElement,
  };
}

describe('<FormPasswordInput />', () => {
  it('should render correctly', () => {
    const { valueElement, placeholderElement } = renderPasswordInput();

    expect(valueElement).toBeTruthy();
    expect(placeholderElement).toBeTruthy();
  });

  it('should render with hidden password', () => {
    const { placeholderElement } = renderPasswordInput();

    const inputElement = placeholderElement;

    expect(inputElement.props.secureTextEntry).toBeTruthy();
  });

  test('when pressing the eye icon, the password should be visible and set icon to eyeOff', () => {
    const { placeholderElement, eyeOnIconElement } = renderPasswordInput();

    fireEvent.press(eyeOnIconElement!);

    const eyeOffIconElement = screen.getByTestId('eyeOff');

    expect(eyeOffIconElement).toBeTruthy();
    expect(placeholderElement.props.secureTextEntry).toBeFalsy();
  });
});
