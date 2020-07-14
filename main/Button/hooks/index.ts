import { MutableRefObject } from 'react';
import customHooks from './customHooks';

export const useHover = customHooks({
  events: ['mouseenter', 'mouseleave'],
}) as <T>(ref: MutableRefObject<T>) => boolean;
