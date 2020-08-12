import { addDecorator, addParameters, configure } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

import { create } from '@storybook/theming';

// Option defaults:
addParameters({
  options: {
    storySort: (a, b) => {
      const sectionA = a[1].id.split('-')[0];
      const sectionB = b[1].id.split('-')[0];
      if (sectionA === sectionB) {
        return a[0].localeCompare(b[0]);
      }
      const sectionMap = {
        overview: 0, components: 1, packages: 2
      };
      return sectionMap[sectionA] - sectionMap[sectionB];
    },
    theme: create({
      base: 'light',
      brandTitle: 'DoobooUI',
      brandUrl: 'https://dooboolab.github.io/dooboo-ui',
      // To control appearance:
      // brandImage: 'http://url.of/some.svg',
    }),
    /**
     * regex for finding the hierarchy separator
     * @example:
     *   null - turn off hierarchy
     *   /\// - split by `/`
     *   /\./ - split by `.`
     *   /\/|\./ - split by `/` or `.`
     * @type {Regex}
     */
    hierarchySeparator: /\/|\./,
    /**
     * regex for finding the hierarchy root separator
     * @example:
     *   null - turn off multiple hierarchy roots
     *   /\|/ - split by `|`
     * @type {Regex}
     */
    hierarchyRootSeparator: /\|/,
    panelPosition: 'bottom',
  },
});

// addDecorator(centered);

const context = require.context('../src', true, /\.stories\.(js|mdx)$/);

configure(context, module);
