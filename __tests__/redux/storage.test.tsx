import reduxStorage from '../../src/redux/storage';

jest.mock('react-native-mmkv', () => {
  const setMock = jest.fn();
  const getStringMock = jest.fn();
  const deleteMock = jest.fn();

  return {
    MMKV: jest.fn().mockImplementation(() => ({
      set: setMock,
      getString: getStringMock,
      delete: deleteMock,
    })),
    setMock,
    getStringMock,
    deleteMock,
  };
});

describe('redux storage', () => {
  let setMock: jest.Mock;
  let getStringMock: jest.Mock;
  let deleteMock: jest.Mock;

  beforeEach(() => {
    ({setMock, getStringMock, deleteMock} = require('react-native-mmkv'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const key = 'testKey';
  const value = 'testValue';

  it('should set item', async () => {
    await reduxStorage.setItem(key, value);
    expect(setMock).toHaveBeenCalledWith(key, value);
  });

  it('should get item', async () => {
    getStringMock.mockReturnValue(value);
    const result = await reduxStorage.getItem(key);
    expect(result).toBe(value);
    expect(getStringMock).toHaveBeenCalledWith(key);
  });

  it('should remove item', async () => {
    await reduxStorage.removeItem(key);
    expect(deleteMock).toHaveBeenCalledWith(key);
  });
});
