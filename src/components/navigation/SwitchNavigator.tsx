import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AccordionSample from '../screen/AccordionSample';
import ButtonGroupSample from '../screen/ButtonGroupSample';
import ButtonSample from '../screen/ButtonSample';
import CalendarSample from '../screen/CalendarCarouselSample';
import EditTextSample from '../screen/EditTextSample';
import LoadingIndicatorSample from '../screen/LoadingIndicatorSample';

const SwitchNavigator = createSwitchNavigator(
  {
    AccordionSample,
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
