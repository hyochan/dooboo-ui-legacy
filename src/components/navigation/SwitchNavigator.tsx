import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import CalendarSample from '../screen/CalendarCarouselSample';
import EditTextSample from '../screen/EditTextSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';
import SliderSample from '../screen/SliderSample';
import SnackbarSample from '../screen/SnackbarSample';

const SwitchNavigator = createSwitchNavigator(
  {
    CalendarSample,
    LoadingIndicatorSample,
    EditTextSample,
    SliderSample,
    SnackbarSample,
  },
  {
    initialRouteName: 'SnackbarSample',
  },
);

export default createAppContainer(SwitchNavigator);
