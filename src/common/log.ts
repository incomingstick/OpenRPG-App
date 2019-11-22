import * as log from 'electron-log';
import { DEBUG } from './globals';

log.transports.file.level = DEBUG ? 'debug' : 'warn';

export default log;
