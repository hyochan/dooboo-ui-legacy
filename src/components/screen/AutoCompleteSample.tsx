import AutoComplete from '../shared/AutoComplete';
import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function Page(): React.ReactElement {
  return (
    <Wrapper>
      <AutoComplete testID="myAT" value="dooboolab" />
    </Wrapper>
  );
}

export default Page;
