import * as React from 'react';
import { Article, ImageList } from '../PinchZoom/example';
import { PanResponderCallbacks, PanResponderInstance } from 'react-native';
import { RenderResult, act, fireEvent, render } from '@testing-library/react-native';

import capturedGesture from './capturedGesture';
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

    it(' should zoom-in and out by touch events', () => {
      act(() => {
        testResponders.forEach((handler) => {
          capturedGesture.filter(({ name }) => (name !== 'onPanResponderRelease'))
            .forEach(({ name, nativeEvent }) => {
              handler[name]({ nativeEvent });
            });
        });
      });
      pinchZoomContainerList.forEach((container) => {
        expect(container.props.style).toMatchSnapshot();
      });
    });

    it(' should be returned to its original size and location after all touch released.', () => {
      act(() => {
        testResponders.forEach((handler) => {
          capturedGesture.filter(({ name }) => (name === 'onPanResponderRelease'))
            .forEach(({ name, nativeEvent }) => {
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
