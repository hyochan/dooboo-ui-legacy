import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import CalendarSample from '../screen/CalendarCarouselSample';
import EditTextSample from '../screen/EditTextSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';
import SliderSample from '../screen/SliderSample';

const SwitchNavigator = createSwitchNavigator(
  {
    CalendarSample,
    LoadingIndicatorSample,
    EditTextSample,
    SliderSample,
  },
  {
    initialRouteName: 'SliderSample',
  },
);

export default createAppContainer(SwitchNavigator);
