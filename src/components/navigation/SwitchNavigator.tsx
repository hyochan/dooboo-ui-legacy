import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SwitchToggleSample from '../screen/SwitchToggleSample';
import DropdownItemSample from '../screen/DropdownItemSample';
import CalendarSample from '../screen/CalendarCarouselSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';
import ButtonSample from '../screen/ButtonSample';
import EditTextSample from '../screen/EditTextSample';
import ButtonGroupSample from '../screen/ButtonGroupSample';

const SwitchNavigator = createSwitchNavigator(
  {
    SwitchToggleSample,
    DropdownItemSample,
    CalendarSample,
    LoadingIndicatorSample,
    ButtonSample,
    EditTextSample,
    ButtonGroupSample,
  },
  {
    initialRouteName: 'ButtonGroupSample',
  },
);

export default createAppContainer(SwitchNavigator);
