import {fireEvent, render, screen} from '@testing-library/react-native';
import FooterTextTouchable from '../../../src/components/ui/FooterTextTouchable';

describe('FooterTextTouchable', () => {
  const text = 'Test Text';

  it('should render with correct text', () => {
    render(<FooterTextTouchable text={text} onPress={() => {}} />);

    const footerText = screen.getByText(text);
    expect(footerText).toBeTruthy();
  });

  it('should call on press', () => {
    const mockOnPress = jest.fn();
    render(<FooterTextTouchable text={text} onPress={mockOnPress} />);

    const footerButton = screen.getByTestId('footer-button');
    fireEvent.press(footerButton);
    expect(mockOnPress).toHaveBeenCalled();

    const footerView = screen.getByTestId('footer-view');
    expect(footerView).toHaveStyle({position: 'relative'});
  });
});
