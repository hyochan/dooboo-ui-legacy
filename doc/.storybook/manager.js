import { create } from '@storybook/theming/create';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'dooboo-ui',
    brandUrl: 'https://dooboolab.github.io/dooboo-ui',
  })
})