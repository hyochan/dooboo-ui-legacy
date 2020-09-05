import {
  ActivityIndicator,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { FC, ReactNode, ReactNodeArray } from 'react';

import styled from 'styled-components/native';

import { styles } from './styles';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  width: 200px;
`;

const ContentsContainer = styled.View`
  padding: 5px 10px;
`;

const StlyedImage = styled.Image`
  width: 100%;
  height: 100px;
`;

const LoadingContainer = styled(Container)`
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.Text`
  font-size: 13px;
  background-color: transparent;
  color: #000000;
`;

const SubTitleText = styled.Text`
  font-size: 10px;
  background-color: transparent;
  color: #e4e4e4;
  height: 20px;
`;

const Divider = styled.View`
  margin: 5px 0px;
  width: 100%;
  height: 0.7px;
  background-color: lightgray;
`;

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode | ReactNodeArray;
  image?: ImageSourcePropType;
  imageStyle?: ImageStyle;
  contentsContainerStyle?: ViewStyle;
  loading?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  subTitle?: string;
  subTitleStyle?: TextStyle;
  hasDivider?: boolean;
  dividerStyle?: ViewStyle;
  outlined?: boolean;
  raised?: boolean;
}

const Card: FC<Props> = (props) => {
  const {
    containerStyle,
    children,
    image,
    imageStyle,
    contentsContainerStyle,
    loading,
    title,
    titleStyle,
    subTitle,
    subTitleStyle,
    hasDivider = true,
    dividerStyle,
    outlined,
    raised,
  } = props;

  const renderTitle = title || subTitle;

  if (loading) {
    return (
      <LoadingContainer style={[containerStyle]}>
        <ActivityIndicator />
      </LoadingContainer>
    );
  }

  const shadowStyle = raised ? styles.raisedShadow : styles.shadow;

  return (
    <Container style={[outlined ? styles.border : shadowStyle, containerStyle]}>
      {image && <StlyedImage source={image} style={[imageStyle]} />}
      {(renderTitle || children) && (
        <ContentsContainer style={[contentsContainerStyle]}>
          <TitleText style={[titleStyle]}> {title} </TitleText>
          {subTitle && (
            <SubTitleText style={[subTitleStyle]}> {subTitle} </SubTitleText>
          )}
          {renderTitle && hasDivider && children && (
            <Divider style={[dividerStyle]} />
          )}
          {children}
        </ContentsContainer>
      )}
    </Container>
  );
};

Card.defaultProps = {};

export { Card };
