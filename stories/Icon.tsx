import Svg, {Line} from 'react-native-svg';
import React from 'react';
import {View} from 'react-native';

import icArrDown from './assets/icons/ic_arr_down.png';
import icArrUp from './assets/icons/ic_arr_up.png';
import icCheck from './assets/icons/check.png';
import icDelete from './assets/icons/ic_delete.png';
import icEdit from './assets/icons/ic_edit.png';
import icFacebook from './assets/icons/facebook.png';
import icGoogle from './assets/icons/google.png';
import icMagnifier from './assets/icons/magnifier.png';

export const IC_ARR_DOWN = icArrDown;
export const IC_ARR_UP = icArrUp;
export const IC_DELETE = icDelete;
export const IC_EDIT = icEdit;
export const IC_FACEBOOK = icFacebook;
export const IC_GOOGLE = icGoogle;
export const IC_MAGNIFIER = icMagnifier;
export const IC_CHECK = icCheck;

function ArrowDown(): React.ReactElement {
  return (
    <View>
      <Svg height="20" width="20" viewBox="0 0 20 20">
        <Line
          x1={5}
          y1={7}
          x2={10}
          y2={12}
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <Line
          x1={10}
          y1={12}
          x2={15}
          y2={7}
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

export {ArrowDown};
