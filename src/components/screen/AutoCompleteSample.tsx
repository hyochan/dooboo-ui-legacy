import React, { ReactElement, useState } from 'react';

import AutoComplete from '../shared/AutoComplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

const Wrapper = styled(SafeAreaView)`
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
      <AutoComplete value={text} onDebounceOrOnReset={setText} style={{ width: 160 }} />
      <AutoComplete value={text} onDebounceOrOnReset={setText} style={{ width: 160 }} />
      <AutoComplete value={text} onDebounceOrOnReset={setText} style={{ width: 160 }} />
    </Wrapper>
  );
}

export default AutoCompleteSamplePage;
