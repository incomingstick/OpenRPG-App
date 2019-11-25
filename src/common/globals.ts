/**
 * Global Variable defintions for the OpenRPG App
 *
 * TODO(incomingstick): Review this file as the project grows
 *
 * Project: OpenRPG <https://openrpg.io>
 * Definitions by: incomingstick <https://github.com/incomingstick>
 */
import { website, bugs, version, repository } from '../../package.json';

export const PACKAGE_VERSION = version;
export const NODE_VERSION = process.versions.node;
export const CHROME_VERSION = process.versions.chrome;
export const ELECTRON_VERSION = process.versions.electron;

// Check if we are a release build or not
export const DEBUG = process.env.NODE_ENV !== 'production';
export const BUILD_TYPE = DEBUG ? 'development' : 'production';

export const ORPG_URL = website.url;
export const ORPG_BLOG = website.blog;
export const ORPG_BUGS = bugs.url;
export const ORPG_DOCS = website.docs;
export const ORPG_REPO = repository.url;
