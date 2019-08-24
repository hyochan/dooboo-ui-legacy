// eslint-disable-next-line import/extensions
import ButtonSample from '../../../src/components/screen/ButtonSample';
import React from 'react';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react-native';

storiesOf('ButtonSample', module).add('to Storybook', () => <ButtonSample />);
