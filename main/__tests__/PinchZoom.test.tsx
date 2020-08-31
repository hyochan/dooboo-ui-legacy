import * as React from 'react';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';
import {
  closeGesture,
  getChangedDistanceRatio,
  getTwoFingerStartEndPositions,
  moveGesture,
  openGesture,
} from './data/capturedGesture';

import { ImageList } from '../PinchZoom/PinchZoom.example';
import { PanResponderCallbacks } from 'react-native';
import renderer from 'react-test-renderer';

const TEST_CONTAINER_WIDTH = 300;
const TEST_CONTAINER_HEIGHT = 200;
const TEST_CONTAINER_CENTER = { x: 150, y: 100 };

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

describe('[PinchZoom] of ImageList render', () => {
  it(' should renders without crashing', () => {
    const rendered: renderer.ReactTestRendererJSON | null = renderer
      .create(<ImageList />)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('ImageList interaction test', () => {
    const rendered: RenderResult = render(<ImageList />);
    const pinchZoomContainer = rendered.getAllByTestId('PINCH_ZOOM_CONTAINER')[Math.floor(Math.random() * 5)];

    it(' should set the center of layout position when onLayout called', () => {
      act(() => {
        fireEvent.layout(pinchZoomContainer, {
          nativeEvent: {
            layout: {
              width: TEST_CONTAINER_WIDTH,
              height: TEST_CONTAINER_HEIGHT,
            },
          },
        });
      });
    });

    it(' should zoom in by openGesture', () => {
      act(() => {
        const callBacks = pinchZoomContainer.props.responderCallback;
        openGesture.forEach(({ name, nativeEvent, gestureState }) => {
          callBacks[name] && callBacks[name]({ nativeEvent }, gestureState);
        });
      });

      const { transform } = pinchZoomContainer.props.style;
      const scale = transform.find(({ scale }) => scale != null).scale;
      const translateX = transform.find(({ translateX }) => translateX != null).translateX;
      const translateY = transform.find(({ translateY }) => translateY != null).translateY;

      const { start, end } = getTwoFingerStartEndPositions(openGesture);
      const expectedScale = getChangedDistanceRatio({ start, end });

      expect(scale).toBeCloseTo(expectedScale, 0.05);

      const zoomInPosition = { x: (start.x1 + start.x2) / 2, y: (start.y1 + start.y2) / 2 };

      expect((zoomInPosition.x - TEST_CONTAINER_CENTER.x) * scale)
        .toBeCloseTo(zoomInPosition.x - TEST_CONTAINER_CENTER.x - translateX);

      expect((zoomInPosition.y - TEST_CONTAINER_CENTER.y) * scale)
        .toBeCloseTo(zoomInPosition.y - TEST_CONTAINER_CENTER.y - translateY);
    });

    it(' should be moved by moveGesture when it zoomed in', () => {
      const { transform } = pinchZoomContainer.props.style;

      const prevScale = transform.find(({ scale }) => scale != null).scale;
      const prevTranslateX = transform.find(({ translateX }) => translateX != null).translateX;
      const prevTranslateY = transform.find(({ translateY }) => translateY != null).translateY;

      act(() => {
        const callBacks = pinchZoomContainer.props.responderCallback;
        moveGesture.forEach(({ name, nativeEvent, gestureState }) => {
          callBacks[name] && callBacks[name]({ nativeEvent }, gestureState);
        });
      });

      const { transform: changedTransform } = pinchZoomContainer.props.style;

      const scale = changedTransform.find(({ scale }) => scale != null).scale;
      const translateX = changedTransform.find(({ translateX }) => translateX != null).translateX;
      const translateY = changedTransform.find(({ translateY }) => translateY != null).translateY;

      const moveGestureStateList = moveGesture.filter(({ name }) => name === 'onPanResponderMove')
        .map(({ gestureState }) => gestureState);
      const lastMoveGestureState = moveGestureStateList[moveGestureStateList.length - 1];

      expect(scale).toBeCloseTo(prevScale);
      expect(translateX).toBeCloseTo(prevTranslateX + lastMoveGestureState.dx);
      expect(translateY).toBeCloseTo(prevTranslateY + lastMoveGestureState.dy);
    });

    it(' should zoom out by closeGesture', () => {
      act(() => {
        const callBacks = pinchZoomContainer.props.responderCallback;
        closeGesture.forEach(({ name, nativeEvent, gestureState }) => {
          callBacks[name] && callBacks[name]({ nativeEvent }, gestureState);
        });
      });

      const { transform } = pinchZoomContainer.props.style;
      const scale = transform.find(({ scale }) => scale != null).scale;
      const translateX = transform.find(({ translateX }) => translateX != null).translateX;
      const translateY = transform.find(({ translateY }) => translateY != null).translateY;

      const openScale = getChangedDistanceRatio(getTwoFingerStartEndPositions(openGesture));
      const closeScale = getChangedDistanceRatio(getTwoFingerStartEndPositions(closeGesture));
      expect(openScale * closeScale).toBeLessThan(1);

      expect(scale).toEqual(1);
      expect(translateX).toEqual(0);
      expect(translateY).toEqual(0);
    });
  });
});
