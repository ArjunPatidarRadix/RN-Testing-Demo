import {render, screen} from '@testing-library/react-native';
import CustomButton from '../../../src/components/ui/CustomButton';

describe('CustomButton', () => {
  const title = 'Test Button';

  it('should render with correct title', () => {
    render(<CustomButton title={title} onPress={() => {}} />);

    const buttonText = screen.getByText(title);

    expect(buttonText).toBeTruthy();
  });

  it('should show activity indicator when loading is true', () => {
    const {getByTestId} = render(
      <CustomButton title={title} onPress={() => {}} loading={true} />,
    );

    expect(getByTestId('activity-indicator')).toBeOnTheScreen();
  });
});
