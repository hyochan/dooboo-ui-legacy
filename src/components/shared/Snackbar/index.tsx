import React, { createContext, useContext, useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import Snackbar, { Content, SnackbarRef } from './Snackbar';

interface SnackbarContext {
  show(content: Content): void;
}

const SnackbarContext = createContext<SnackbarContext>({ show: () => null });
const useCtx = (): SnackbarContext => {
  const c = useContext(SnackbarContext);
  if (!c) throw new Error('useCtx must be inside a Provider with a value');
  return c;
};

export interface SnackbarProviderProps {
  children?: React.ReactElement;
  useWholeScreen?: boolean;
}

function SnackbarProvider(props: SnackbarProviderProps): React.ReactElement {
  const { children, useWholeScreen } = props;
  const snackbar = useRef<SnackbarRef>() as React.MutableRefObject<SnackbarRef>;
  const show = (content: Content): void => {
    snackbar.current && snackbar.current.show(content);
  };
  const Container = useWholeScreen ? View : SafeAreaView;
  return (
    <Container style={{ flex: 1, alignItems: 'center' }}>
      <SnackbarContext.Provider value={{ show }}>{children}</SnackbarContext.Provider>
      <Snackbar ref={snackbar} />
    </Container>);
}

export { useCtx as useSnackbarContext, SnackbarProvider };
export * from './Snackbar';
export default Snackbar;
