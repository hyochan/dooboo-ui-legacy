import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SwitchToggleSample from '../screen/SwitchToggleSample';
import DropdownItemSample from '../screen/DropdownItemSample';
import CalendarSample from '../screen/CalendarCarouselSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';

const SwitchNavigator = createSwitchNavigator(
  {
    SwitchToggleSample,
    DropdownItemSample,
    CalendarSample,
    LoadingIndicatorSample,
  },
  {
    initialRouteName: 'LoadingIndicatorSample',
  },
);

export default createAppContainer(SwitchNavigator);
