import LoadingIndicator from '../shared/LoadingIndicator';
import { NavigationScreenProp } from 'react-navigation';
import React from 'react';

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

function Page(props: Props) {
  return <LoadingIndicator />;
}

export default Page;
