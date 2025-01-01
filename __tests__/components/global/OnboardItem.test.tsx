import {fireEvent, render} from '@testing-library/react-native';
import OnboardItem from '../../../src/components/global/OnboardItem';

describe('OnboardItem', () => {
  const mockOnPressFirst = jest.fn();
  const mockOnPressSecond = jest.fn();
  const imageSource = {uri: 'http://gif.png'};
  const title = 'Test Title';
  const subTitle = 'Test Subtitle';
  const buttonTitleFirst = 'First Button';
  const buttonTitleSecond = 'Second Button';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly with one button', () => {
    const {getByText, getByTestId} = render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subTitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
      />,
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(buttonTitleFirst)).toBeTruthy();
    expect(getByText(subTitle)).toBeTruthy();
    expect(getByTestId('background-image')).toBeTruthy();
  });

  it('Should render correctly with two button', () => {
    const {getByText, getByTestId} = render(
      <OnboardItem
        imageSource={imageSource}
        title={title}
        subtitle={subTitle}
        onPressFirst={mockOnPressFirst}
        buttonTitleFirst={buttonTitleFirst}
        onPressSecond={mockOnPressSecond}
        buttonTitleSecond={buttonTitleSecond}
      />,
    );

    expect(getByText(title)).toBeTruthy();
    expect(getByText(subTitle)).toBeTruthy();
    expect(getByText(buttonTitleFirst)).toBeTruthy();
    expect(getByText(buttonTitleSecond)).toBeTruthy();

    expect(getByTestId('background-image')).toBeTruthy();
  });
});
