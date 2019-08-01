import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import LoadingIndicator from '../shared/LoadingIndicator';

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

function Page(props: Props) {
  return (
    <LoadingIndicator />
  );
}

export default Page;
