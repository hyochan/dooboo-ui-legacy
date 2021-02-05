import React, {ReactElement} from 'react';

import ButtonDefault from './ButtonStories/ButtonDefaultStory';
import {ContainerDeco} from '../../storybook/decorators';
import {ThemeProvider} from '../../main/theme/ThemeProvider';
import {ThemeType} from '../../main/theme';
import {storiesOf} from '@storybook/react-native';

/**
 * Below are stories for web
 */
export default {
  title: 'Button',
};

export const toStorybook = (): ReactElement => <ButtonDefault />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('Button', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <ButtonDefault />
    </>
  ))
  .add('with dark theme', () => (
    <ThemeProvider initialThemeType={ThemeType.DARK}>
      <ButtonDefault />
    </ThemeProvider>
  ));
