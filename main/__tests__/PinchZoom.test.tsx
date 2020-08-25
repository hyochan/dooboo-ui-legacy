import * as React from 'react';
import { PanResponderCallbacks, PanResponderInstance } from 'react-native';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';
import { closeGesture, getChangedDistanceRatio, getTwoFingerStartEndPositions, openGesture } from './capturedGesture';

import { ImageList } from '../PinchZoom/PinchZoom.example';
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
      .create(<ImageList/>)
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  describe('ImageList interaction test', () => {
    const rendered: RenderResult = render(<ImageList/>);
    const pinchZoomContainerList = rendered.getAllByTestId('PINCH_ZOOM_CONTAINER');

    it(' should set the center of layout position when onLayout called', () => {
      pinchZoomContainerList.forEach((container) => {
        act(() => {
          fireEvent.layout(container, {
            nativeEvent: {
              layout: {
                width: TEST_CONTAINER_WIDTH,
                height: TEST_CONTAINER_HEIGHT,
              },
            },
          });
        });
      });
    });

    it(' should zoom in by openGesture', () => {
      act(() => {
        pinchZoomContainerList.forEach((container) => {
          const callBacks = container.props.responderCallback;
          openGesture.forEach(({ name, nativeEvent, gestureState }) => {
            callBacks[name] && callBacks[name]({ nativeEvent }, gestureState);
          });
        });
      });
      pinchZoomContainerList.forEach((container) => {
        const { transform } = container.props.style;
        const scale = transform.find(({ scale }) => scale != null).scale;
        const translateX = transform.find(({ translateX }) => translateX != null).translateX;
        const translateY = transform.find(({ translateY }) => translateY != null).translateY;

        const { start, end } = getTwoFingerStartEndPositions(openGesture);
        const expectedScale = getChangedDistanceRatio({ start, end });

        expect(scale).toBeCloseTo(expectedScale);

        const zoomInPosition = { x: (start.x1 + start.x2) / 2, y: (start.y1 + start.y2) / 2 };

        expect((zoomInPosition.x - TEST_CONTAINER_CENTER.x) * scale)
          .toBeCloseTo(zoomInPosition.x - TEST_CONTAINER_CENTER.x - translateX);

        expect((zoomInPosition.y - TEST_CONTAINER_CENTER.y) * scale)
          .toBeCloseTo(zoomInPosition.y - TEST_CONTAINER_CENTER.y - translateY);
      });
    });

    it(' should zoom out by closeGesture', () => {
      act(() => {
        pinchZoomContainerList.forEach((container) => {
          const callBacks = container.props.responderCallback;
          closeGesture.forEach(({ name, nativeEvent, gestureState }) => {
            callBacks[name] && callBacks[name]({ nativeEvent }, gestureState);
          });
        });
      });

      pinchZoomContainerList.forEach((container) => {
        const { transform } = container.props.style;
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
});
