import React, { ReactElement, useState } from 'react';

import AutoComplete from '../shared/AutoComplete';
import dummyData from '../shared/AutoComplete/dummyData';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function AutoCompleteSamplePage(): ReactElement {
  const [text, setText] = useState('');
  return (
    <Wrapper>
      <AutoComplete data={dummyData} value={text} onDebounceOrOnReset={setText} style={{ width: 160 }} />
      <AutoComplete data={dummyData} value={text} onDebounceOrOnReset={setText} style={{ width: 160 }} />
      <AutoComplete data={dummyData} value={text} onDebounceOrOnReset={setText} style={{ width: 160 }} />
    </Wrapper>
  );
}

export default AutoCompleteSamplePage;
