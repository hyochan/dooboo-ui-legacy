import React, { ReactElement, useState } from 'react';

import AutoComplete from '../shared/AutoComplete';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function AutoCompleteSamplePage(): ReactElement {
  const [text, setText] = useState('');
  return (
    <Wrapper>
      <AutoComplete value={text} onDebounceOrOnReset={setText} />
    </Wrapper>
  );
}

export default AutoCompleteSamplePage;
