import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SwitchToggleSample from '../screen/SwitchToggleSample';
import DropdownItemSample from '../screen/DropdownItemSample';
import CalendarSample from '../screen/CalendarCarouselSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';
import ButtonSample from '../screen/ButtonSample';
import EditTextSample from '../screen/EditTextSample';

const SwitchNavigator = createSwitchNavigator(
  {
    SwitchToggleSample,
    DropdownItemSample,
    CalendarSample,
    LoadingIndicatorSample,
    ButtonSample,
    EditTextSample,
  },
  {
    initialRouteName: 'EditTextSample',
  },
);

export default createAppContainer(SwitchNavigator);
