import * as React from 'react';
import { PanResponderCallbacks, PanResponderInstance } from 'react-native';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';
import { closeGesture, openGesture } from './capturedGesture';

import { ImageList } from '../PinchZoom/example';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

const testResponders: PanResponderCallbacks[] = [];
const clearTestResponders = (): void => {
  testResponders.splice(0, testResponders.length);
};

jest.mock('react-native/Libraries/Interaction/PanResponder', () => {
  return {
    create: (responder: PanResponderCallbacks): PanResponderInstance => {
      testResponders.push(responder);
      return {
        panHandlers: {
        },
      };
    },
  };
});

describe('[PinchZoom] of ImageList render', () => {
  afterAll(() => {
    clearTestResponders();
  });
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
                width: 300,
                height: 200,
              },
            },
          });
        });
      });
    });

    it(' should zoom in by touch events', () => {
      act(() => {
        testResponders.forEach((handler) => {
          openGesture.forEach(({ name, nativeEvent }) => {
            handler[name]({ nativeEvent });
          });
        });
      });
      pinchZoomContainerList.forEach((container) => {
        expect(container.props.style).toMatchSnapshot();
      });
    });

    it(' should be returned to its original size and location after close fingers', () => {
      act(() => {
        testResponders.forEach((handler) => {
          closeGesture.forEach(({ name, nativeEvent }) => {
            handler[name]({ nativeEvent });
          });
        });
      });
      jest.runAllTimers();
      pinchZoomContainerList.forEach((container) => {
        expect(container.props.style).toMatchSnapshot();
      });
    });
  });
});
