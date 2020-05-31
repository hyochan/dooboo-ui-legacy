var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { createContext, useContext, useRef } from 'react';
import Snackbar from './Snackbar';
import { View } from 'react-native';
var SnackbarContext = createContext(undefined);
var useCtx = function () {
    var c = useContext(SnackbarContext);
    if (!c) {
        throw new Error('useCtx must be inside a Provider with a value');
    }
    return c;
};
function SnackbarProvider(props) {
    var children = props.children, _a = props.defaultContent, defaultContent = _a === void 0 ? {} : _a;
    var snackbar = useRef();
    var show = function (content) {
        snackbar.current && snackbar.current.show(__assign(__assign({}, defaultContent), content));
    };
    return (<View style={{ flex: 1 }}>
      <SnackbarContext.Provider value={{ show: show }}>{children}</SnackbarContext.Provider>
      <Snackbar ref={snackbar}/>
    </View>);
}
export { useCtx as useSnackbarContext, SnackbarProvider };
export * from './Snackbar';
export default Snackbar;
