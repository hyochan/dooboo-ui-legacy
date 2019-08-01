import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SwitchToggleSample from '../screen/SwitchToggleSample';
import DropdownItemSample from '../screen/DropdownItemSample';
import CalendarSample from '../screen/CalendarCarouselSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';
import ButtonSample from '../screen/ButtonSample';

const SwitchNavigator = createSwitchNavigator(
  {
    SwitchToggleSample,
    DropdownItemSample,
    CalendarSample,
    LoadingIndicatorSample,
    ButtonSample,
  },
  {
    initialRouteName: 'ButtonSample',
  },
);

export default createAppContainer(SwitchNavigator);
