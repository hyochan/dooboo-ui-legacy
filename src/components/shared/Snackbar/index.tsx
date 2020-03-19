import React, { createContext, useContext, useRef } from 'react';
import Snackbar, { Content, SnackbarRef } from './Snackbar';
import { View } from 'react-native';

interface SnackbarContext {
  show(content: Content): void;
}

const SnackbarContext = createContext<SnackbarContext | undefined>(undefined);
const useCtx = (): SnackbarContext | undefined => {
  const c = useContext<SnackbarContext | undefined>(SnackbarContext);
  if (!c) {
    throw new Error('useCtx must be inside a Provider with a value');
  }
  return c;
};

export interface SnackbarProviderProps {
  children?: React.ReactElement;
  defaultContent?: Partial<Content>;
}

function SnackbarProvider(props: SnackbarProviderProps): React.ReactElement {
  const { children, defaultContent = {} } = props;
  const snackbar = useRef<SnackbarRef>() as React.MutableRefObject<SnackbarRef>;
  const show = (content: Content): void => {
    snackbar.current && snackbar.current.show({ ...defaultContent, ...content });
  };
  return (
    <View style={{ flex: 1 }}>
      <SnackbarContext.Provider value={{ show }}>{children}</SnackbarContext.Provider>
      <Snackbar ref={snackbar} />
    </View>);
}

export { useCtx as useSnackbarContext, SnackbarProvider };
export * from './Snackbar';
export default Snackbar;
