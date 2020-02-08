import React, { createContext, useContext, useRef } from 'react';
import Snackbar, { Content, SnackbarRef } from './Snackbar';
import { View } from 'react-native';

interface SnackbarContext {
  show(content: Content): void;
}

const SnackbarContext = createContext<SnackbarContext>({ show: () => null });
const useCtx = (): SnackbarContext => {
  const c = useContext(SnackbarContext);
  if (!c) throw new Error('useCtx must be inside a Provider with a value');
  return c;
};

interface Props {
  children?: React.ReactElement;
}

function SnackbarProvider(props: Props): React.ReactElement {
  const snackbar = useRef<SnackbarRef>() as React.MutableRefObject<SnackbarRef>;
  const show = (content: Content): void => {
    snackbar.current && snackbar.current.show(content);
  };
  return (
    <View style={{ flex: 1 }}>
      <SnackbarContext.Provider value={{ show }}>{props.children}</SnackbarContext.Provider>
      <Snackbar ref={snackbar} />
    </View>);
}

export { useCtx as useSnackbarContext, SnackbarProvider };
export * from './Snackbar';
export default Snackbar;
