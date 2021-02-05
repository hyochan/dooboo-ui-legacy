import React, {ReactElement} from 'react';

import {ContainerDeco} from '../../storybook/decorators';
import EditTextColumn from './EditTextStories/EditTextColumnStory';
import EditTextRow from './EditTextStories/EditTextRowStory';
import EditTextRowWithTheme from './EditTextStories/EditTextWithThemeStory';
import {ThemeProvider} from '../../main/theme/ThemeProvider';
import {ThemeType} from '../../main/theme';
import {storiesOf} from '@storybook/react-native';

/**
 * Below are stories for web
 */
export default {
  title: 'EditText',
};

export const toStorybook1 = (): ReactElement => <EditTextColumn />;
export const toStorybook2 = (): ReactElement => <EditTextRow />;

toStorybook1.story = {
  name: 'column (default)',
  notes: 'Default [EditText] aligned in column.',
};

toStorybook2.story = {
  name: 'row',
  notes: '[EditText] aligned in row.',
};

/**
 * Below are stories for app
 */
storiesOf('EditText', module)
  .addDecorator(ContainerDeco)
  .add(
    toStorybook1.story.name,
    () => (
      <ThemeProvider initialThemeType={ThemeType.LIGHT}>
        <EditTextColumn />
      </ThemeProvider>
    ),
    {
      notes: toStorybook1.story.notes,
    },
  )
  .add(toStorybook2.story.name, () => <EditTextRow />, {
    notes: toStorybook2.story.notes,
  })
  .add('with dark theme', () => (
    <ThemeProvider initialThemeType={ThemeType.DARK}>
      <EditTextRowWithTheme />
    </ThemeProvider>
  ));
