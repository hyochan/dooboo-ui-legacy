import React, { useEffect, useState } from 'react';

import { Platform } from 'react-native';
import getNode from './utils/getNode';

export default function customHooks<T>({
  events,
}: {
  events: string[];
}): (ref: React.MutableRefObject<T>) => any {
  return function(ref): boolean {
    if (Platform.OS !== 'web') {
      return false;
    }

    const [isActive, setActive] = useState<boolean>(false);
    useEffect(() => {
      const [eventIn, eventOut] = events;

      const node = getNode(ref);
      if (!node) {
        return;
      }
      const onStart = (): void => {
        setActive(true);
      };
      const onEnd = (): void => {
        setActive(false);
      };
      node.addEventListener(eventIn, onStart);
      node.addEventListener(eventOut, onEnd);

      // Special case for useActive to respond when the user drags out of the view and releases.
      if (eventOut === 'mouseup') {
        document.addEventListener(eventOut, onEnd, false);
      }
      return (): void => {
        document.removeEventListener(eventOut, onEnd, false);
        node.removeEventListener(eventIn, onStart);
        node.removeEventListener(eventOut, onEnd);
      };
    }, [ref && ref.current]);

    return isActive;
  };
}
