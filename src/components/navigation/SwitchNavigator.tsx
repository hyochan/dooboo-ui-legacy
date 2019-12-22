import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import CalendarCarouselSample from '../screen/CalendarCarouselSample';
import EditTextSample from '../screen/EditTextSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';

const SwitchNavigator = createSwitchNavigator(
  {
    CalendarCarouselSample,
    LoadingIndicatorSample,
    EditTextSample,
  },
  {
    initialRouteName: 'CalendarCarouselSample',
  },
);

export default createAppContainer(SwitchNavigator);
