import * as React from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
var __makeTemplateObject = (this && this.__makeTemplateObject) || function(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, 'raw', { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};
var width = Dimensions.get('screen').width;
var maxWidth = width - 32;
var styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: 150,
    maxWidth: maxWidth,
    textAlign: 'left',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    bottom: 10,
    backgroundColor: '#87b5ff',
    borderRadius: 10,
  },
});
var MessageText = styled.Text(templateObject_1 || (templateObject_1 = __makeTemplateObject(['\n  color: white;\n'], ['\n  color: white;\n'])));
var ActionText = styled.Text(templateObject_2 || (templateObject_2 = __makeTemplateObject(['\n  color: green;\n'], ['\n  color: green;\n'])));
var ActionContainer = styled.View(templateObject_3 || (templateObject_3 = __makeTemplateObject(['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: -5px;\n  padding-left: 16px;\n'], ['\n  display: flex;\n  align-items: center;\n  margin-left: auto;\n  margin-right: -5px;\n  padding-left: 16px;\n'])));
var Touchable = styled.TouchableOpacity(templateObject_4 || (templateObject_4 = __makeTemplateObject([''], [''])));
var ActionButton = styled.View(templateObject_5 || (templateObject_5 = __makeTemplateObject(['\n  padding: 4px 4px 2px 2px;\n'], ['\n  padding: 4px 4px 2px 2px;\n'])));
export var Timer;
(function(Timer) {
  Timer[Timer.SHORT = 1500] = 'SHORT';
  Timer[Timer.LONG = 3000] = 'LONG';
})(Timer || (Timer = {}));
var Snackbar = function(props, ref) {
  var testID = props.testID;
  var _a = React.useState({ isVisible: false, isShowing: false }); var showingState = _a[0]; var setShowingState = _a[1];
  var _b = React.useState({ text: '', timer: Timer.SHORT }); var content = _b[0]; var setContent = _b[1];
  var text = content.text; var actionText = content.actionText; var messageStyle = content.messageStyle; var actionStyle = content.actionStyle; var containerStyle = content.containerStyle; var _c = content.timer; var timer = _c === void 0 ? Timer.SHORT : _c; var onPressAction = content.onPressAction;
  var isShowing = showingState.isShowing; var isVisible = showingState.isVisible; var timeout = showingState.timeout;
  var fadeAnim = React.useState(new Animated.Value(0))[0];
  var show = function(c) {
    setContent(c);
    timeout && clearTimeout(timeout);
    setShowingState(function(prevState) { return Object.assign(Object.assign({}, prevState), { isShowing: true }); });
  };
  var hide = function(duration) {
    if (duration === void 0) { duration = 200; }
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    }).start(function() { return setShowingState(function(prevState) { return Object.assign(Object.assign({}, prevState), { isVisible: false }); }); });
  };
  React.useEffect(function() {
    if (isShowing) {
      if (isVisible) {
        hide(50);
      } else {
        var hideTimeout = setTimeout(function() {
          hide();
        }, timer + 200);
        setShowingState({ isShowing: false, isVisible: true, timeout: hideTimeout });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [showingState]);
  React.useImperativeHandle(ref, function() {
    return ({
      show: show,
    });
  });
  return (<>
    {showingState.isVisible && (<Animated.View testID={testID} style={[styles.container, containerStyle, { opacity: fadeAnim }]}>
      <MessageText style={messageStyle}>{text}</MessageText>
      {actionText && (<ActionContainer>
        <Touchable onPress={onPressAction}>
          <ActionButton>
            <ActionText style={actionStyle}>{actionText}</ActionText>
          </ActionButton>
        </Touchable>
      </ActionContainer>)}
    </Animated.View>)}
  </>);
};
export default React.forwardRef(Snackbar);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
