import { useEffect, useRef, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = (): [number, boolean] => {
  const keyboardRef = useRef(0);
  const [keyboardShow, setKeyboardShow] = useState(false)

  function onKeyboardDidShow(e: KeyboardEvent): void {
    setKeyboardShow(true)
    keyboardRef.current = e.endCoordinates.height;
  }

  function onKeyboardDidHide(): void {
    setKeyboardShow(false)
    keyboardRef.current = 0;
  }

  useEffect(() => {
    const subscrib0 = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const subscrib1 = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      subscrib0.remove();
      subscrib1.remove();
    };
  }, []);

  return [keyboardRef.current, keyboardShow];
};