import { Article, ImageList } from '../../main/PinchZoom/PinchZoom.example';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';

storiesOf('PinchZoom', module)
  .addDecorator(ContainerDeco)
  .add('Image list', ImageList)
  .add('Text block', Article);
