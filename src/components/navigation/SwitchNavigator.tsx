import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import CalendarSample from '../screen/CalendarCarouselSample';
import EditTextSample from '../screen/EditTextSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';

const SwitchNavigator = createSwitchNavigator(
  {
    CalendarSample,
    LoadingIndicatorSample,
    EditTextSample,
  },
  {
    initialRouteName: 'CalendarSample',
  },
);

export default createAppContainer(SwitchNavigator);
