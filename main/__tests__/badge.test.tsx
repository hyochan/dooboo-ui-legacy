// Library Import
import React, { ReactElement } from 'react';
import {
  render
} from '@testing-library/react-native';
import renderer from 'react-test-renderer';
// Test 대상 import
import Badge from '../components/pureComponent/badge';

type badgeProps ={
  count? : number,
  color? : string,
}

let props: badgeProps;
let component: ReactElement;

function getTempComponent({count,color}:badgeProps) {
   return <Badge count={10} color="white" />;
}

describe('[Badge] render', () => {
  props = {count:10,color:"white"};
  component = getTempComponent(props);
  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});