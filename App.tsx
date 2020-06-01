import {
  addDecorator,
  configure,
  getStorybookUI,
} from '@storybook/react-native';

import { withKnobs } from '@storybook/addon-knobs';

configure(() => {
  // Since require.context doesn't exist in metro bundler world, we have to
  // manually import files ending in *.stories.js
  require('./stories');
}, module);

addDecorator(withKnobs);

export default getStorybookUI();
