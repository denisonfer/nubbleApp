import { render } from '../../test/test-utils';
import { Button } from '../Button';

describe('<Button />', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Button title="Hello" />);

    expect(getByText('Hello')).toBeTruthy();
  });
});
