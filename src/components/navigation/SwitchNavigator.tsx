import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import ButtonGroupSample from '../screen/ButtonGroupSample';
import ButtonSample from '../screen/ButtonSample';
import CalendarSample from '../screen/CalendarCarouselSample';
import DropdownItemSample from '../screen/DropdownItemSample';
import EditTextSample from '../screen/EditTextSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';

const SwitchNavigator = createSwitchNavigator(
  {
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
