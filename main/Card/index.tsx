import React, { FC, ReactNode, ReactNodeArray } from 'react';
import {
  ViewStyle,
  Image,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from 'react-native';

import styled from 'styled-components/native';
import { ImageProps } from 'react-native-svg';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode | ReactNodeArray;
  image?: ImageSourcePropType;
  imageStyle?: ImageStyle;
}

const Card: FC<Props> = (props) => {
  const { containerStyle, children, image, imageStyle } = props;
  return (
    <Container style={[containerStyle]}>
      {image && (
        <Image
          source={image}
          style={{
            width: 100,
            height: 100,
            ...imageStyle,
          }}
        />
      )}
      {children}
    </Container>
  );
};

Card.defaultProps = {};

export { Card };
