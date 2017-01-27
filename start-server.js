import { server } from 'universal-webpack';
import settings from './webpack/universal-webpack-settings';
// `configuration.context` and `configuration.output.path` are used
import configuration from './webpack/webpack.config';

console.log('configuration');
console.log(configuration);
console.log('settings');
console.log(settings);
server(configuration, settings);
