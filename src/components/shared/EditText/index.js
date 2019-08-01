import React, { useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TextStyle,
  ViewPropTypes,
  ViewStyle,
  Platform,
  NativeSyntheticEvent,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    width: '100%',
  },
  underline: {
    borderWidth: 0.6,
    borderColor: '#eaeaf9',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#b9b9c4',
  },
  input: Platform.select({
    ios: {
      paddingTop: 15,
      paddingBottom: 10,
      fontSize: 15,
      fontWeight: '500',
      color: '#2C374E',
    },
    android: {
      paddingLeft: 0,
      paddingBottom: 5,
      fontSize: 15,
      fontWeight: '500',
      color: '#2C374E',
    },
  }),
  errorText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 5,
    color: '#ff8989',
  },
});

function EditText(props) {
  const [focused, setFocus] = useState(false);

  return (
    <View
      testID={ props.parentTestID }
      style={[
        styles.container,
        props.style,
      ]}
    >
      {
        props.label
          ? <Text style={[
            styles.label,
            props.errorText
              ? { color: '#FF8989' }
              : focused
                ? { color: '#79B3F5' }
                : null,
          ]}
          >
            { props.label }
          </Text>
          : null
      }
      <TextInput
        testID={props.testID}
        style={[
          styles.input,
          props.textStyle,
        ]}
        autoCapitalize={'none'}
        onFocus={ () => setFocus(true) }
        onBlur={ () => setFocus(false) }
        onSubmitEditing={ props.onSubmitEditing }
        placeholder={ props.placeholder }
        placeholderTextColor={ props.placeholderTextColor }
        value={ props.text }
        onChangeText={ props.onTextChanged}
        secureTextEntry={ props.secureTextEntry }
      >
      </TextInput>
      <View style={[
        styles.underline,
        focused
          ? { borderColor: '#79B3F5' }
          : props.errorText
            ? { borderColor: '#FF8989' }
            : null,
      ]}
      />
      {
        props.errorText
          ? <Text
            testID={props.errorTestID}
            style={styles.errorText}
          >
            {props.errorText}
          </Text>
          : null
      }
    </View>
  );
}

EditText.propTypes = {
  parentTestID: PropTypes.string,
  testID: PropTypes.string,
  errorTestID: PropTypes.string,
  style: ViewPropTypes.style,
  label: PropTypes.string,
  textStyle: Text.propTypes.style,
  errorText: PropTypes.string,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  onSubmitEditing: PropTypes.func,
  onTextChanged: PropTypes.func,
};

export default EditText;
