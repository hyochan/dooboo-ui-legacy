import React, { ReactElement } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

import { ContainerDeco } from '../../storybook/decorators';
import ProgressBar from '../../main/ProgressBar';
import { storiesOf } from '@storybook/react-native';

function Default(): React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Default</Text>
      <ProgressBar />

      <Text>Rounded border radius</Text>
      <ProgressBar round={'round'} />

      <Text>limited determinate ProgressBar</Text>
      <ProgressBar
        barColor={'#A055FF'}
        bgColor={'#e3ccff'}
        height={10}
        animationType={'determinate'}
        animationSpeed={3000}
      />

      <Text>Infinite determinate ProgressBar</Text>
      <ProgressBar
        barColor={'#A055FF'}
        bgColor={'#e3ccff'}
        round={'square'}
        height={10}
        animationType={'default'}
        animationSpeed={1000}
      />

      <Text>Infinite indeterminate ProgressBar</Text>
      <ProgressBar
        barColor={'#609FFF'}
        bgColor={'#D0E3FF'}
        round={'square'}
        height={10}
        animationType={'indeterminate'}
        animationSpeed={2000}
      />

      <Text>Infinite indeterminate-flex ProgressBar</Text>
      <ProgressBar
        barColor={'#609FFF'}
        bgColor={'#D0E3FF'}
        round={'square'}
        height={10}
        animationType={'indeterminate-flex'}
        animationSpeed={2000}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 60,
  },
});

export default {
  title: 'ProgressBar',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('ProgressBar', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
