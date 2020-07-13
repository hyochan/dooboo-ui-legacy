import { findDOMNode } from 'react-dom';
import getNativeNode from './getNode.native';

function getNode(ref: any): any {
  try {
    let node = getNativeNode(ref);
    if (node) {
      /* eslint-disable react/no-find-dom-node */
      node = findDOMNode(node);
    }
    return node;
  } catch (error) {
    return null;
  }
}

export default getNode;
