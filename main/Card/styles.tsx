import { css } from 'styled-components/native';

const shadow = css`
    shadow-color: #000;
    shadow-offset: { width: 0, height: 2 };
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    elevation: 5;
`;

const raisedShadow = css`
  shadow-color: #000;
  shadow-offset: { width: 0, height: 5 };
  shadow-opacity: 0.34;
  shadow-radius: 6.27px;
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
