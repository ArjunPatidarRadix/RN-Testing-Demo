import {act, fireEvent, render, screen} from '@testing-library/react-native';
import Input from '../../../src/components/ui/Input';

describe('Input', () => {
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();
  const value = 'Test Value';
  const placeholder = 'Test Placeholder';

  it('should render with correctly', () => {
    const {getByTestId} = render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
        testID="inputComponent"
      />,
    );
    expect(getByTestId('inputComponent')).toBeTruthy();
  });

  it('should handle multiple focus and blur events', () => {
    const {getByTestId} = render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
    );

    fireEvent(getByTestId('textInput'), 'focus', {});
    fireEvent(getByTestId('textInput'), 'blur', {});
    fireEvent(getByTestId('textInput'), 'focus', {});
    fireEvent(getByTestId('textInput'), 'blur', {});

    expect(mockOnFocus).toHaveBeenCalledTimes(2);
    expect(mockOnBlur).toHaveBeenCalledTimes(2);
  });

  it('should display error text if error is provided', () => {
    const {getByTestId} = render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
        error={'Some error occurred'}
      />,
    );

    expect(getByTestId('errorText')).toBeOnTheScreen();
    expect(getByTestId('errorText')).toHaveTextContent('Some error occurred');
  });

  it('should call onFocus and setFocus state on input focus', () => {
    const {getByTestId} = render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
        onFocus={mockOnFocus}
      />,
    );

    act(() => {
      fireEvent(getByTestId('textInput'), 'focus', {});
    });

    expect(mockOnFocus).toHaveBeenCalled();
  });

  it('should call onBlur', async () => {
    const {getByTestId} = render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
        onBlur={mockOnBlur}
      />,
    );

    fireEvent(getByTestId('textInput'), 'blur', {});

    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('should call default onFocus function when fn not provided', () => {
    const {getByTestId} = render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
      />,
    );

    act(() => {
      fireEvent(getByTestId('textInput'), 'focus', {});
    });
  });

  it('should call default onBlur function when fn not provided', () => {
    const {getByTestId} = render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
      />,
    );

    fireEvent(getByTestId('textInput'), 'blur', {});
  });

  it('should apply disabled style when input is disabled', async () => {
    const {getByTestId} = render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
        disabled={true}
      />,
    );

    const parentContainer = getByTestId('parentContainer');
    expect(parentContainer).toHaveStyle({pointerEvents: 'none'});

    const textInput = getByTestId('textInput');
    expect(textInput.props.editable).toBe(false);
  });

  it('should render with correctly placeholder', () => {
    const placeholder = 'Test Placeholder';
    render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
      />,
    );

    const input = screen.getByPlaceholderText(placeholder);
    expect(input).toBeTruthy();
  });

  it('should call onChangeText when input changes', () => {
    render(
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={mockOnChangeText}
      />,
    );

    const input = screen.getByPlaceholderText('Test Placeholder');
    fireEvent.changeText(input, 'New Text');
    expect(mockOnChangeText).toHaveBeenCalledWith('New Text');
  });
});
