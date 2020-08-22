import React, { FC, ReactNode, ReactNodeArray } from 'react';
import {
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  ActivityIndicator,
} from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

const ContentsContainer = styled.View`
  padding: 16px 24px;
`;

const StlyedImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const LoadingContainer = styled(Container)`
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode | ReactNodeArray;
  image?: ImageSourcePropType;
  imageStyle?: ImageStyle;
  contentsStyle?: ViewStyle;
  loading?: boolean;
}

const Card: FC<Props> = (props) => {
  const {
    containerStyle,
    children,
    image,
    imageStyle,
    contentsStyle,
    loading,
  } = props;

  if (loading) {
    return (
      <LoadingContainer style={[containerStyle]}>
        <ActivityIndicator />
      </LoadingContainer>
    );
  }

  return (
    <Container style={[containerStyle]}>
      {image && <StlyedImage source={image} style={[imageStyle]} />}
      {children && (
        <ContentsContainer style={[contentsStyle]}>
          {children}
        </ContentsContainer>
      )}
    </Container>
  );
};

Card.defaultProps = {};

export { Card };
