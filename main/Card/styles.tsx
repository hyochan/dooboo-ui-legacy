import { css } from 'styled-components/native';

const shadow = css`
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 5;
`;

const raisedShadow = css`
  shadow-color: #000;
  shadow-offset: 0 6px;
  shadow-opacity: 0.35;
  shadow-radius: 6.25px;
  elevation: 10;
`;

const border = css`
  border-width: 1px;
  border-color: #ccc;
`;

export default {
  shadow,
  raisedShadow,
  border,
};
