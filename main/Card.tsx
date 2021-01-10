import {
  ActivityIndicator,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { FC, ReactNode, ReactNodeArray } from 'react';
import styled, { css } from 'styled-components/native';

import { FlattenSimpleInterpolation } from 'styled-components';

const shadow = css`
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const raisedShadow = css`
  shadow-color: #000;
  shadow-offset: 0 6px;
  shadow-opacity: 0.35;
  shadow-radius: 6.25px;
  elevation: 10;
`;

const border = css`
  border-width: 1px;
  border-color: #ccc;
`;

const styles = {
  shadow,
  raisedShadow,
  border,
};

interface ContainerProps {
  raised?: boolean;
  outlined?: boolean;
}

const Container = styled.View<ContainerProps>`
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  width: 256px;
  ${({ outlined, raised }): FlattenSimpleInterpolation =>
    outlined ? styles.border : raised ? styles.raisedShadow : styles.shadow}
`;

const ContentsContainer = styled.View`
  width: 100%;
  padding: 12px 16px;
`;

const StlyedImage = styled.Image`
  width: 100%;
  height: 154px;
`;

const LoadingContainer = styled(Container)`
  padding: 32px;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
  background-color: transparent;
  color: #000;
`;

const SubTitleText = styled.Text`
  font-size: 10px;
  font-weight: 400;
  margin-bottom: 2px;
  background-color: transparent;
  color: #999;
  height: 20px;
`;

const Divider = styled.View`
  margin-top: 4px;
  margin-bottom: 12px;
  width: 100%;
  height: 1px;
  background-color: #eee;
`;

interface Props extends ContainerProps {
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
  const renderDivider = hasDivider && renderTitle && children;

  if (loading) {
    return (
      <LoadingContainer style={containerStyle}>
        <ActivityIndicator />
      </LoadingContainer>
    );
  }

  return (
    <Container {...{ outlined, raised }} style={containerStyle}>
      {image && <StlyedImage source={image} style={imageStyle} />}
      {(renderTitle || children) && (
        <ContentsContainer style={contentsContainerStyle}>
          {renderTitle && (
            <>
              {title && <TitleText style={titleStyle}> {title} </TitleText>}
              {subTitle && (
                <SubTitleText style={subTitleStyle}> {subTitle} </SubTitleText>
              )}
            </>
          )}
          {renderDivider && <Divider style={dividerStyle} />}
          {children}
        </ContentsContainer>
      )}
    </Container>
  );
};

export { Card };
