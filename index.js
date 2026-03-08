/**
 * @format
 */

import { initStorage, MMKVStorage } from '@services';
import { AppRegistry } from 'react-native';

initStorage(MMKVStorage);

import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
