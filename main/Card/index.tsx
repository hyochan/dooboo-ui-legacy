import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  
  width: 300px;
`;

const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;

  border: 1px solid red;
`;

const TitleText = styled.Text`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #000;
  color: #000;
`;

const SubTitleText = styled.Text`

`;

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode | ReactNodeArray;

  titleContainerStyle?: ViewStyle;

  title?: string;
  titleStyle?: TextStyle;

  subTitle?: string;
  subTitleStyle?: TextStyle;

}

const Card: FC<Props> = (props) => {
  const { containerStyle, children, titleContainerStyle, title, titleStyle, subTitle, subTitleStyle } = props;
  const titleVertical = subTitle !== undefined && subTitle.length > 0 ? 'center' : '';
  console.log('titleVertical : ', titleVertical);
  return (
    <Container style={[containerStyle]}>

      <TitleContainer style={[titleContainerStyle]} >
        <TitleText style={[titleStyle]}> {title} </TitleText>
        { SubTitleText && SubTitleText.length > 0
          ? <SubTitleText style={[subTitleStyle]}> {subTitle} </SubTitleText>
          : null }
      </TitleContainer>

      {children}
    </Container>
  );
};

Card.defaultProps = {

};

export { Card };
