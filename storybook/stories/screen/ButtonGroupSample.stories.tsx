// eslint-disable-next-line import/extensions
import ButtonGroupSample from '../../../src/components/screen/ButtonGroupSample';
import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react-native';

storiesOf('ButtonGroupSample', module).add('to Storybook', () => (
  <ButtonGroupSample />
));
