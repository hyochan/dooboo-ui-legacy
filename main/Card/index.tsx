import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { TextStyle, View, ViewProps, ViewStyle } from 'react-native';

import styled from 'styled-components/native';
import { StyledFunction } from 'styled-components';

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

interface TitleContainerProps extends ViewProps {
  titleTextVertical?: boolean;
}

const TitleContainer = styled.View<TitleContainerProps>`
  justify-content: ${(props) => (props.titleTextVertical ? 'flex-start' : 'center')};
`;

const TitleText = styled.Text`
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
  const titleVertical = !!(subTitle !== undefined && subTitle.length > 0);

  return (
    <Container style={[containerStyle]}>

      <TitleContainer style={[titleContainerStyle]} titleTextVertical={ titleVertical } >
        <TitleText style={[titleStyle]} > {title} </TitleText>
        { subTitle && subTitle.length > 0
          ? <SubTitleText style={[subTitleStyle]}> {subTitle} </SubTitleText>
          : null }
      </TitleContainer>

      {children}
    </Container>
  );
};

Card.defaultProps = {
  titleContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    backgroundColor: 'transparent',
    fontSize: 13,
    color: '#000000',

  },
  subTitleStyle: {
    backgroundColor: 'transparent',
    fontSize: 9,
    color: '#e4e4e4',
    height: 20,
  },

};

export { Card };
