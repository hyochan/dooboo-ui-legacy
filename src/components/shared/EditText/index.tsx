import {
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';

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

interface Props {
  parentTestID?: string;
  testID?: string;
  errorTestID?: string;
  style?: ViewStyle;
  label?: string;
  textStyle?: TextStyle;
  errorText?: string;
  text?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  onSubmitEditing?: (e: NativeSyntheticEvent<any>) => void;
  onTextChanged?: (text: string) => void;
}

function EditText(props: Props) {
  const [focused, setFocus] = useState(false);

  return (
    <View testID={props.parentTestID} style={[styles.container, props.style]}>
      {props.label ? (
        <Text
          style={[
            styles.label,
            props.errorText
              ? { color: '#FF8989' }
              : focused
                ? { color: '#79B3F5' }
                : null,
          ]}
        >
          {props.label}
        </Text>
      ) : null}
      <TextInput
        testID={props.testID}
        style={[styles.input, props.textStyle]}
        autoCapitalize={'none'}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onSubmitEditing={props.onSubmitEditing}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        value={props.text}
        onChangeText={props.onTextChanged}
        secureTextEntry={props.secureTextEntry}
      ></TextInput>
      <View
        style={[
          styles.underline,
          focused
            ? { borderColor: '#79B3F5' }
            : props.errorText
              ? { borderColor: '#FF8989' }
              : null,
        ]}
      />
      {props.errorText ? (
        <Text testID={props.errorTestID} style={styles.errorText}>
          {props.errorText}
        </Text>
      ) : null}
    </View>
  );
}

export default EditText;
