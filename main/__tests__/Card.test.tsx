import * as React from 'react';

import { Image, Text, View } from 'react-native';
import { Card } from '..';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// eslint-disable-next-line
const component = (props?: any): React.ReactElement => {
  return <Card {...props} />;
};

describe('[Card]', () => {
  let rendered: renderer.ReactTestRenderer;
  let root: renderer.ReactTestInstance;

  it('should render without crashing', () => {
    rendered = renderer.create(component());
    expect(rendered.toJSON()).toMatchSnapshot();
    expect(rendered.toJSON()).toBeTruthy();
  });

  it('should render loading status', () => {
    rendered = renderer.create(
      component({
        loading: true,
        title: 'Card title',
        subTitle: 'Card subTitle',
      }),
    );
    root = rendered.root;

    const texts = root.findAllByType(Text);

    expect(texts).toHaveLength(0);
  });

  it('should render image', () => {
    rendered = renderer.create(
      component({
        image: {
          uri:
            'https://image.shutterstock.com/z/stock-vector-api-application-programming-interface-software-integration-vector-illustration-1079814893.jpg',
        },
      }),
    );
    root = rendered.root;

    const images = root.findAllByType(Image);

    expect(images).toHaveLength(1);
  });

  it('should render title and subtitle', () => {
    rendered = renderer.create(
      component({ title: 'Card title', subTitle: 'Card subTitle' }),
    );
    root = rendered.root;

    const texts = root.findAllByType(Text);

    expect(texts).toHaveLength(2);
  });

  it('should render children', () => {
    rendered = renderer.create(
      component({
        children: (
          <View>
            <Text>first children</Text>
            <Text>second children</Text>
          </View>
        ),
      }),
    );
    root = rendered.root;

    const texts = root.findAllByType(Text);

    expect(texts).toHaveLength(2);
  });

  it('should simulate props', (): void => {
    const rendered = renderer.create(
      component({
        testID: 'CARD_ID',
        title: 'This is title',
        subTitle: 'This is subTitle',
        children: <Text>This is children</Text>,
      }),
    );

    rendered.update(component({ hasDivider: false }));
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();

    rendered.update(component({ raised: true }));
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();

    rendered.update(component({ outlined: true }));
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});
