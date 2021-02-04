import 'styled-components';
import type {Theme} from './index';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
