import {Appearance, ColorSchemeName} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';

export default function useColorScheme(
  delay = 500,
): NonNullable<ColorSchemeName> {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  let timeout = useRef<NodeJS.Timeout | null>(null).current;

  const resetCurrentTimeout = useCallback((): void => {
    if (timeout) clearTimeout(timeout);
  }, [timeout]);

  const onColorSchemeChange = useCallback(
    (preferences: Appearance.AppearancePreferences): void => {
      resetCurrentTimeout();

      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeout = setTimeout(() => {
        setColorScheme(preferences.colorScheme);
      }, delay);
    },
    [timeout],
  );

  useEffect(() => {
    Appearance.addChangeListener(onColorSchemeChange);

    return () => {
      resetCurrentTimeout();
      Appearance.removeChangeListener(onColorSchemeChange);
    };
  }, [onColorSchemeChange, resetCurrentTimeout]);

  return colorScheme as NonNullable<ColorSchemeName>;
}
