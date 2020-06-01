import React from 'react';
import Snackbar, { Content } from './Snackbar';
interface SnackbarContext {
    show(content: Content): void;
}
declare const SnackbarContext: React.Context<SnackbarContext>;
declare const useCtx: () => SnackbarContext;
export interface SnackbarProviderProps {
    children?: React.ReactElement;
    defaultContent?: Partial<Content>;
}
declare function SnackbarProvider(props: SnackbarProviderProps): React.ReactElement;
export { useCtx as useSnackbarContext, SnackbarProvider };
export * from './Snackbar';
export default Snackbar;
