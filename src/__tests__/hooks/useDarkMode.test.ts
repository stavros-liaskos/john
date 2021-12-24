import { renderHook, act } from '@testing-library/react-hooks';
import useDarkMode from 'hooks/useDarkMode';
// todo verify localstorage

// https://react-hooks-testing-library.com/usage/basic-hooks#rendering
describe('useDarkMode', () => {
  it('toggles themes successfully', () => {
    const { result } = renderHook(() => useDarkMode());

    expect(result.current.dark).toBeFalsy();
    expect(result.current.setDark).toBeTruthy();

    act(() => {
      result.current.setDark(true);
    });

    expect(result.current.dark).toBeTruthy();

    act(() => {
      result.current.setDark(false);
    });

    expect(result.current.dark).toBeFalsy();
  });
});
