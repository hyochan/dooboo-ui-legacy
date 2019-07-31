import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SwitchToggleSample from '../screen/SwitchToggleSample';
import DropdownItemSample from '../screen/DropdownItemSample';
import CalendarSample from '../screen/CalendarCarouselSample';

const SwitchNavigator = createSwitchNavigator(
  {
    SwitchToggleSample,
    DropdownItemSample,
    CalendarSample,
  },
  {
    initialRouteName: 'CalendarSample',
  },
);

export default createAppContainer(SwitchNavigator);
