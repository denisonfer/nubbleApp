import { render } from '@test';

import { PostBottom } from '../PostBottom';

import { mockedPost } from './mockedData/mockedPost';

const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('<PostBottom />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render correctly', () => {
    const { getByText } = render(<PostBottom {...mockedPost} />);

    expect(getByText('John Doe')).toBeTruthy();
  });

  test('it does not render the comment text when there are no comments', () => {
    const { queryByText } = render(
      <PostBottom {...mockedPost} commentCount={0} />,
    );

    expect(queryByText(/comentário/i)).toBeFalsy();
  });

  test('it renders the comment text when there are comments', () => {
    const { getByText } = render(
      <PostBottom {...mockedPost} commentCount={10} />,
    );

    expect(getByText(/comentário/i)).toBeTruthy();
  });
});
