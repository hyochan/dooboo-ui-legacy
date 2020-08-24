import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { ImageSourcePropType, ImageStyle, TextStyle, ViewProps, ViewStyle } from 'react-native';

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

const TitleContainer = styled.View<TitleContainerProps>`
  justify-content: ${(props) => (props.titleTextVertical ? 'flex-start' : 'center')};
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: auto;
  background-color: transparent;
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

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode | ReactNodeArray;
  image?: ImageSourcePropType;
  imageStyle?: ImageStyle;
  contentsStyle?: ViewStyle;

  titleContainerStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
  subTitle?: string;
  subTitleStyle?: TextStyle;
}

interface TitleContainerProps extends ViewProps {
  titleTextVertical?: boolean;
}

const Card: FC<Props> = (props) => {
  const {
    containerStyle,
    children,
    image,
    imageStyle,
    contentsStyle,
    titleContainerStyle,
    title,
    titleStyle,
    subTitle,
    subTitleStyle,
  } = props;
  const titleVertical = subTitle !== undefined && subTitle.length > 0;
  const renderTitle = (title !== undefined && title.length > 0) || (subTitle !== undefined && subTitle.length > 0);
  console.log('renderTitle : ', renderTitle);
  return (
    <Container style={[containerStyle]}>
      {image && <StlyedImage source={image} style={[imageStyle]} />}

      { renderTitle && <TitleContainer style={[titleContainerStyle]} titleTextVertical={ titleVertical } >
        <TitleText style={[titleStyle]} > {title} </TitleText>
        { subTitle && subTitle.length > 0
          ? <SubTitleText style={[subTitleStyle]}> {subTitle} </SubTitleText>
          : null }
      </TitleContainer>}

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
