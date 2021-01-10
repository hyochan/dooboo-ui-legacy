import * as React from 'react';

import { ImageSlider } from '../PinchZoom/PinchZoom.example';
import { PanResponderCallbacks } from 'react-native';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

jest.mock('react-native/Libraries/Interaction/PanResponder', () => {
  return {
    create: (responderCallback: PanResponderCallbacks)
    : { panHandlers : { responderCallback:PanResponderCallbacks } } => {
      return {
        panHandlers: {
          responderCallback,
        },
      };
    },
  };
});

describe('PinchZoom of ImageSlider', () => {
  it('should renders without crashing', () => {
    const renderedJSON = renderer
      .create(<ImageSlider />)
      .toJSON();

    expect(renderedJSON).toMatchSnapshot();
    expect(renderedJSON).toBeTruthy();
  });

  // describe('Interactions', () => {
  //   const rendered: RenderAPI = render(<ImageSlider />);
  //   const pinchZoomContainer = rendered.getAllByTestId('PINCH_ZOOM_CONTAINER')[0];

  //   it('should zoom in by openGesture', () => {
  //     act(() => {
  //       const callBacks = pinchZoomContainer.props.responderCallback;

  //       openGesture.forEach(({ name, nativeEvent, gestureState }) => {
  //         callBacks[name] && callBacks[name]({ nativeEvent }, gestureState);
  //       });
  //     });

  //     const { transform } = pinchZoomContainer.props.style;
  //     const scale = transform.find(({ scale }) => scale != null).scale;
  //     const translateX = transform.find(({ translateX }) => translateX != null).translateX;
  //     const translateY = transform.find(({ translateY }) => translateY != null).translateY;

  //     const { start, end } = getTwoFingerStartEndPositions(openGesture);
  //     const expectedScale = getChangedDistanceRatio({ start, end });

  //     expect(scale).toBeCloseTo(expectedScale, 0.05);

  //     const zoomInPosition = { x: (start.x1 + start.x2) / 2, y: (start.y1 + start.y2) / 2 };

  //     expect((zoomInPosition.x - TEST_CONTAINER_CENTER.x) * scale)
  //       .toBeCloseTo(zoomInPosition.x - TEST_CONTAINER_CENTER.x - translateX);

  //     expect((zoomInPosition.y - TEST_CONTAINER_CENTER.y) * scale)
  //       .toBeCloseTo(zoomInPosition.y - TEST_CONTAINER_CENTER.y - translateY);
  //   });

  //   it('should be moved by moveGesture when it zoomed in', () => {
  //     const { transform } = pinchZoomContainer.props.style;

  //     const prevScale = transform.find(({ scale }) => scale != null).scale;
  //     const prevTranslateX = transform.find(({ translateX }) => translateX != null).translateX;
  //     const prevTranslateY = transform.find(({ translateY }) => translateY != null).translateY;

  //     act(() => {
  //       const callBacks = pinchZoomContainer.props.responderCallback;

  //       moveGesture.forEach(({ name, nativeEvent, gestureState }) => {
  //         callBacks[name] && callBacks[name]({ nativeEvent }, gestureState);
  //       });
  //     });

  //     const { transform: changedTransform } = pinchZoomContainer.props.style;

  //     const scale = changedTransform.find(({ scale }) => scale != null).scale;
  //     const translateX = changedTransform.find(({ translateX }) => translateX != null).translateX;
  //     const translateY = changedTransform.find(({ translateY }) => translateY != null).translateY;

  //     const moveGestureStateList = moveGesture.filter(({ name }) => name === 'onPanResponderMove')
  //       .map(({ gestureState }) => gestureState);

  //     const lastMoveGestureState = moveGestureStateList[moveGestureStateList.length - 1];

  //     expect(scale).toBeCloseTo(prevScale);
  //     expect(translateX).toBeCloseTo(prevTranslateX + lastMoveGestureState.dx);
  //     expect(translateY).toBeCloseTo(prevTranslateY + lastMoveGestureState.dy);
  //   });

  //   it('should zoom out by closeGesture', () => {
  //     act(() => {
  //       const callBacks = pinchZoomContainer.props.responderCallback;

  //       closeGesture.forEach(({ name, nativeEvent, gestureState }) => {
  //         callBacks[name] && callBacks[name]({ nativeEvent }, gestureState);
  //       });
  //     });

  //     const { transform } = pinchZoomContainer.props.style;
  //     const scale = transform.find(({ scale }) => scale != null).scale;
  //     const translateX = transform.find(({ translateX }) => translateX != null).translateX;
  //     const translateY = transform.find(({ translateY }) => translateY != null).translateY;

  //     const openScale = getChangedDistanceRatio(getTwoFingerStartEndPositions(openGesture));
  //     const closeScale = getChangedDistanceRatio(getTwoFingerStartEndPositions(closeGesture));

  //     expect(openScale * closeScale).toBeLessThan(1);

  //     expect(scale).toEqual(1);
  //     expect(translateX).toEqual(0);
  //     expect(translateY).toEqual(0);
  //   });

  //   it('should release onTranslateChanged function if the property changed.', () => {
  //     const callBacks = pinchZoomContainer.props.responderCallback;

  //     act(() => {
  //       callBacks.onPanResponderGrant();

  //       callBacks.onPanResponderMove({
  //         nativeEvent: {
  //           identifier: 0,
  //           locationX: 247,
  //           locationY: 95,
  //           touches: [
  //             'Self',
  //           ],
  //         },
  //       }, { dx: 0, dy: 0 });

  //       callBacks.onPanResponderMove({
  //         nativeEvent: {
  //           identifier: 0,
  //           locationX: 47,
  //           locationY: 95,
  //           touches: [
  //             'Self',
  //           ],
  //         },
  //       }, { dx: -200, dy: 0 });
  //     });

  //     const { transform } = pinchZoomContainer.props.style;
  //     const scale = transform.find(({ scale }) => scale != null).scale;
  //     const translateX = transform.find(({ translateX }) => translateX != null).translateX;
  //     const translateY = transform.find(({ translateY }) => translateY != null).translateY;

  //     expect(scale).toEqual(1);
  //     expect(translateX).toEqual(-200);
  //     expect(translateY).toEqual(0);

  //     act(() => {
  //       // Call onRelease and the pinchzoom move to -300
  //       callBacks.onPanResponderRelease();
  //     });

  //     jest.runAllTimers();
  //     expect(pinchZoomContainer.props.style.left).toEqual(-300);
  //   });
  // });
});
