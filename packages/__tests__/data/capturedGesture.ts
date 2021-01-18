/* istanbul ignore file */
interface NativeTouchEvent {
  changedTouches?: (NativeTouchEvent | null)[];
  identifier: number;
  locationX: number;
  locationY: number;
  timestamp: number;
  touches?: (NativeTouchEvent | null)[];
}

interface GestureHandlerInput {
  name: string;
  nativeEvent: NativeTouchEvent;
  gestureState: {dx: number; dy: number};
}

const replaceFirstTouchToThis = (
  item: GestureHandlerInput,
): GestureHandlerInput => {
  const {nativeEvent} = item;

  if (nativeEvent) {
    nativeEvent.touches[0] = nativeEvent;
    nativeEvent.changedTouches[0] = nativeEvent;
  }

  return item;
};

export function getFirstTouchOfTwoFinger(
  inputs: GestureHandlerInput[],
): GestureHandlerInput | null {
  const firstTouchIndex = inputs.findIndex((input) => {
    const {nativeEvent} = input;

    return nativeEvent.touches.length === 2;
  });

  if (firstTouchIndex < 0) return null;

  return inputs[firstTouchIndex];
}

export function getLastTouchOfTwofinger(
  inputs: GestureHandlerInput[],
): GestureHandlerInput | null {
  const reversed = inputs.map((i) => i).reverse();

  const firstTouchIndex = reversed.findIndex((input) => {
    const {nativeEvent} = input;

    return nativeEvent.touches.length === 2;
  });

  if (firstTouchIndex < 0) return null;

  return reversed[firstTouchIndex];
}

interface TwoPosition {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export function getChangedDistanceRatio({
  start,
  end,
}: {
  start: TwoPosition;
  end: TwoPosition;
}): number {
  const startDist = Math.sqrt(
    (start.x1 - start.x2) ** 2 + (start.y1 - start.y2) ** 2,
  );

  const endDist = Math.sqrt((end.x1 - end.x2) ** 2 + (end.y1 - end.y2) ** 2);

  return endDist / startDist;
}

export function getTwoFingerStartEndPositions(
  inputs: GestureHandlerInput[],
): {
  start: TwoPosition;
  end: TwoPosition;
} {
  const zoomStart = getFirstTouchOfTwoFinger(inputs);
  const zoomEnd = getLastTouchOfTwofinger(inputs);

  const start = {
    x1: zoomStart.nativeEvent.locationX,
    x2: zoomStart.nativeEvent.touches[1].locationX,
    y1: zoomStart.nativeEvent.locationY,
    y2: zoomStart.nativeEvent.touches[1].locationY,
  };

  const end = {
    x1: zoomEnd.nativeEvent.locationX,
    x2: zoomEnd.nativeEvent.touches[1].locationX,
    y1: zoomEnd.nativeEvent.locationY,
    y2: zoomEnd.nativeEvent.touches[1].locationY,
  };

  return {start, end};
}

const openGesture: GestureHandlerInput[] = [
  {
    name: 'onPanResponderGrant',
    gestureState: {
      dx: 0,
      dy: 0,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 236.4481658935547,
      locationY: 66.47421264648438,
      timestamp: 928291738,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -1.0323486328125,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 236.4481658935547,
      locationY: 65.68843078613281,
      timestamp: 928291759,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -1.7080841064453125,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 286.5709533691406,
          locationY: 168.77450561523438,
          timestamp: 928291790,
        },
      ],
      identifier: 0,
      locationX: 236.4481658935547,
      locationY: 65.58484649658203,
      timestamp: 928291790,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 286.5709533691406,
          locationY: 168.77450561523438,
          timestamp: 928291790,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -1.847686767578125,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 286.5709533691406,
          locationY: 168.58251953125,
          timestamp: 928291807,
        },
      ],
      identifier: 0,
      locationX: 236.4481658935547,
      locationY: 65.5312728881836,
      timestamp: 928291807,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 286.5709533691406,
          locationY: 168.58251953125,
          timestamp: 928291807,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -2.0424652099609375,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 280.13116455078125,
          locationY: 171.05770874023438,
          timestamp: 928291823,
        },
      ],
      identifier: 0,
      locationX: 230.00839233398438,
      locationY: 68.3960189819336,
      timestamp: 928291823,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 280.13116455078125,
          locationY: 171.05770874023438,
          timestamp: 928291823,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -2.351318359375,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 280.0873107910156,
          locationY: 170.9047088623047,
          timestamp: 928291840,
        },
      ],
      identifier: 0,
      locationX: 229.96453857421875,
      locationY: 68.03482818603516,
      timestamp: 928291840,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 280.0873107910156,
          locationY: 170.9047088623047,
          timestamp: 928291840,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -2.465972900390625,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 279.96356201171875,
          locationY: 170.53683471679688,
          timestamp: 928291856,
        },
      ],
      identifier: 0,
      locationX: 229.84078979492188,
      locationY: 67.89625549316406,
      timestamp: 928291856,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 279.96356201171875,
          locationY: 170.53683471679688,
          timestamp: 928291856,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -2.5272979736328125,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 280.0297546386719,
          locationY: 170.48831176757812,
          timestamp: 928291873,
        },
      ],
      identifier: 0,
      locationX: 229.90699768066406,
      locationY: 67.97039794921875,
      timestamp: 928291873,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 280.0297546386719,
          locationY: 170.48831176757812,
          timestamp: 928291873,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -2.837005615234375,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 279.917724609375,
          locationY: 170.51158142089844,
          timestamp: 928291939,
        },
      ],
      identifier: 0,
      locationX: 229.79495239257812,
      locationY: 67.37425231933594,
      timestamp: 928291939,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 279.917724609375,
          locationY: 170.51158142089844,
          timestamp: 928291939,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0.785919189453125,
      dy: -1.863006591796875,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 281.6864013671875,
          locationY: 173.4528045654297,
          timestamp: 928291973,
        },
      ],
      identifier: 0,
      locationX: 229.9918212890625,
      locationY: 67.12862396240234,
      timestamp: 928291973,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 281.6864013671875,
          locationY: 173.4528045654297,
          timestamp: 928291973,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 1.933074951171875,
      dy: -0.2760009765625,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 283.980712890625,
          locationY: 176.62681579589844,
          timestamp: 928291990,
        },
      ],
      identifier: 0,
      locationX: 229.9918212890625,
      locationY: 67.12862396240234,
      timestamp: 928291990,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 283.980712890625,
          locationY: 176.62681579589844,
          timestamp: 928291990,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 2.8371734619140625,
      dy: 1.0317840576171875,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 287.0016784667969,
          locationY: 180.6282958984375,
          timestamp: 928292006,
        },
      ],
      identifier: 0,
      locationX: 231.20455932617188,
      locationY: 68.51455688476562,
      timestamp: 928292006,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 287.0016784667969,
          locationY: 180.6282958984375,
          timestamp: 928292006,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 2.7622756958007812,
      dy: 1.1356201171875,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 288.47784423828125,
          locationY: 182.25,
          timestamp: 928292013,
        },
      ],
      identifier: 0,
      locationX: 232.22784423828125,
      locationY: 69.92857360839844,
      timestamp: 928292013,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 288.47784423828125,
          locationY: 182.25,
          timestamp: 928292013,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 2.9631729125976562,
      dy: 2.5809326171875,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 1,
      locationX: 272.3207092285156,
      locationY: 150.7286376953125,
      timestamp: 928292020,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderRelease',
    gestureState: {
      dx: 2.9631729125976562,
      dy: 2.5809326171875,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 1,
      locationX: 272.3207092285156,
      locationY: 150.7286376953125,
      timestamp: 928292020,
      touches: [null],
    },
  },
].map(replaceFirstTouchToThis);

const closeGesture: GestureHandlerInput[] = [
  {
    name: 'onPanResponderGrant',
    gestureState: {
      dx: 0,
      dy: 0,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 46.0484619140625,
      locationY: 81.7563705444336,
      timestamp: 928379178,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -0.3013420104980469,
      dy: -0.6594314575195312,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 234.66171264648438,
          locationY: 170.046875,
          timestamp: 928379223,
        },
      ],
      identifier: 0,
      locationX: 46.12376022338867,
      locationY: 81.7563705444336,
      timestamp: 928379223,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 234.66171264648438,
          locationY: 170.046875,
          timestamp: 928379223,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -0.01177978515625,
      dy: -0.72265625,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 234.51669311523438,
          locationY: 169.92044067382812,
          timestamp: 928379238,
        },
      ],
      identifier: 0,
      locationX: 46.55788040161133,
      locationY: 81.7563705444336,
      timestamp: 928379238,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 234.51669311523438,
          locationY: 169.92044067382812,
          timestamp: 928379238,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -0.0231170654296875,
      dy: -0.8974456787109375,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 230.33665466308594,
          locationY: 172.95144653320312,
          timestamp: 928379255,
        },
      ],
      identifier: 0,
      locationX: 43.35962677001953,
      locationY: 85.13697814941406,
      timestamp: 928379255,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 230.33665466308594,
          locationY: 172.95144653320312,
          timestamp: 928379255,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 2.1088638305664062,
      dy: 0.33116912841796875,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 227.6106719970703,
          locationY: 170.73831176757812,
          timestamp: 928379271,
        },
      ],
      identifier: 0,
      locationX: 47.11737823486328,
      locationY: 87.78921508789062,
      timestamp: 928379271,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 227.6106719970703,
          locationY: 170.73831176757812,
          timestamp: 928379271,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 3.808307647705078,
      dy: 1.629730224609375,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 224.63555908203125,
          locationY: 168.3975067138672,
          timestamp: 928379291,
        },
      ],
      identifier: 0,
      locationX: 50.1982421875,
      locationY: 90.51726531982422,
      timestamp: 928379291,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 224.63555908203125,
          locationY: 168.3975067138672,
          timestamp: 928379291,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 5.556423187255859,
      dy: 2.3502044677734375,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 218.6522979736328,
          locationY: 165.33705139160156,
          timestamp: 928379308,
        },
      ],
      identifier: 0,
      locationX: 50.096168518066406,
      locationY: 91.40167236328125,
      timestamp: 928379308,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 218.6522979736328,
          locationY: 165.33705139160156,
          timestamp: 928379308,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 6.78582763671875,
      dy: 3.1698150634765625,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 212.7684326171875,
          locationY: 162.6766815185547,
          timestamp: 928379325,
        },
      ],
      identifier: 0,
      locationX: 49.46532440185547,
      locationY: 92.35374450683594,
      timestamp: 928379325,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 212.7684326171875,
          locationY: 162.6766815185547,
          timestamp: 928379325,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 7.189029693603516,
      dy: 3.7457351684570312,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 207.08914184570312,
          locationY: 160.51771545410156,
          timestamp: 928379342,
        },
      ],
      identifier: 0,
      locationX: 47.95161437988281,
      locationY: 92.88214111328125,
      timestamp: 928379342,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 207.08914184570312,
          locationY: 160.51771545410156,
          timestamp: 928379342,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 6.261928558349609,
      dy: 5.0926055908203125,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 197.4899139404297,
          locationY: 157.9833221435547,
          timestamp: 928379358,
        },
      ],
      identifier: 0,
      locationX: 47.92053985595703,
      locationY: 95.18587493896484,
      timestamp: 928379358,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 197.4899139404297,
          locationY: 157.9833221435547,
          timestamp: 928379358,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 2.572845458984375,
      dy: 4.8359832763671875,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 180.02561950683594,
          locationY: 151.51226806640625,
          timestamp: 928379375,
        },
      ],
      identifier: 0,
      locationX: 51.215911865234375,
      locationY: 98.73914337158203,
      timestamp: 928379375,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 180.02561950683594,
          locationY: 151.51226806640625,
          timestamp: 928379375,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -0.530853271484375,
      dy: 2.5933837890625,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 161.27706909179688,
          locationY: 141.70431518554688,
          timestamp: 928379391,
        },
      ],
      identifier: 0,
      locationX: 50.920387268066406,
      locationY: 100.79867553710938,
      timestamp: 928379391,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 161.27706909179688,
          locationY: 141.70431518554688,
          timestamp: 928379391,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -0.6026840209960938,
      dy: 2.0647354125976562,
    },
    nativeEvent: {
      changedTouches: [
        null,
        {
          identifier: 1,
          locationX: 155.8333282470703,
          locationY: 139.1201629638672,
          timestamp: 928379403,
        },
      ],
      identifier: 0,
      locationX: 48.857887268066406,
      locationY: 100.71614837646484,
      timestamp: 928379403,
      touches: [
        null,
        {
          identifier: 1,
          locationX: 155.8333282470703,
          locationY: 139.1201629638672,
          timestamp: 928379403,
        },
      ],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0.6184005737304688,
      dy: 2.9014053344726562,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 50.07897186279297,
      locationY: 101.55281829833984,
      timestamp: 928379408,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderRelease',
    gestureState: {
      dx: 0.6184005737304688,
      dy: 2.9014053344726562,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 50.07897186279297,
      locationY: 101.55281829833984,
      timestamp: 928379408,
      touches: [null],
    },
  },
].map(replaceFirstTouchToThis);

const moveGesture: GestureHandlerInput[] = [
  {
    name: 'onPanResponderGrant',
    gestureState: {
      dx: 0,
      dy: 0,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 171.4107208251953,
      locationY: 62.816593170166016,
      timestamp: 928421627,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: 0,
      dy: -0.20648193359375,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 171.4107208251953,
      locationY: 62.6101188659668,
      timestamp: 928421665,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -0.5185089111328125,
      dy: 0.32647705078125,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 170.8922119140625,
      locationY: 63.143043518066406,
      timestamp: 928421714,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -0.9196929931640625,
      dy: 0.73876953125,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 170.49102783203125,
      locationY: 63.55533981323242,
      timestamp: 928421731,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -1.797210693359375,
      dy: 2.58563232421875,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 169.61351013183594,
      locationY: 65.40220642089844,
      timestamp: 928421748,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -4.0178680419921875,
      dy: 7.43304443359375,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 167.39285278320312,
      locationY: 70.24962615966797,
      timestamp: 928421765,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -5.9802703857421875,
      dy: 9.60443115234375,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 165.43045043945312,
      locationY: 72.42103576660156,
      timestamp: 928421781,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -8.734527587890625,
      dy: 11.62261962890625,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 162.6761932373047,
      locationY: 74.43922424316406,
      timestamp: 928421798,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -12.097763061523438,
      dy: 14.1590576171875,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 159.31295776367188,
      locationY: 76.97567749023438,
      timestamp: 928421815,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -14.769683837890625,
      dy: 16.58526611328125,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 156.6410369873047,
      locationY: 79.4018325805664,
      timestamp: 928421831,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -17.09405517578125,
      dy: 18.68707275390625,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 154.31666564941406,
      locationY: 81.50367736816406,
      timestamp: 928421849,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -19.763885498046875,
      dy: 21.17730712890625,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 151.64683532714844,
      locationY: 83.99391174316406,
      timestamp: 928421865,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -21.555526733398438,
      dy: 23.2164306640625,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 149.85519409179688,
      locationY: 86.03302001953125,
      timestamp: 928421881,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -22.7149658203125,
      dy: 24.25152587890625,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 148.6957550048828,
      locationY: 87.06813049316406,
      timestamp: 928421898,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -23.474029541015625,
      dy: 24.6182861328125,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 147.9366912841797,
      locationY: 87.43485260009766,
      timestamp: 928421914,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -24.3165283203125,
      dy: 24.5703125,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 147.0941925048828,
      locationY: 87.38690185546875,
      timestamp: 928421932,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderMove',
    gestureState: {
      dx: -25.254959106445312,
      dy: 23.8526611328125,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 146.15576171875,
      locationY: 86.66927337646484,
      timestamp: 928421948,
      touches: [null],
    },
  },
  {
    name: 'onPanResponderRelease',
    gestureState: {
      dx: -25.254959106445312,
      dy: 23.8526611328125,
    },
    nativeEvent: {
      changedTouches: [null],
      identifier: 0,
      locationX: 146.15576171875,
      locationY: 86.66927337646484,
      timestamp: 928421948,
      touches: [null],
    },
  },
].map(replaceFirstTouchToThis);

export {openGesture, closeGesture, moveGesture};
