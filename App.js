// import { AppRegistry, YellowBox } from 'react-native';

// import App from './src/App';
// import StorybookStart from './storybook';

// // export default App;
// export default StorybookStart;

const STORYBOOK_START = false;
export default STORYBOOK_START
  ? require('./storybook').default
  : require('./src/App').default;
