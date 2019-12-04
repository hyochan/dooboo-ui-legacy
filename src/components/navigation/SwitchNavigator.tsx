import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AutoCompleteSample from '../screen/AutoCompleteSample';
import CalendarSample from '../screen/CalendarCarouselSample';
import EditTextSample from '../screen/EditTextSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';

const SwitchNavigator = createSwitchNavigator(
  {
    AutoCompleteSample,
    CalendarSample,
    LoadingIndicatorSample,
    EditTextSample,
  },
  {
    initialRouteName: 'AutoCompleteSample',
  },
);

export default createAppContainer(SwitchNavigator);
