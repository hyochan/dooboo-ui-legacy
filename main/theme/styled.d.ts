import '@emotion/react';
import type {DoobooTheme} from './index';

declare module '@emotion/react' {
  export interface Theme extends DoobooTheme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
