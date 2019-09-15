import * as log from 'electron-log';

// TODO: make this switch to 'warn' in release mode
log.transports.file.level = 'debug';

export default log;
