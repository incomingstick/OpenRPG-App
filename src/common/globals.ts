/**
 * Global Variable defintions for the OpenRPG App
 *
 * TODO(incomingstick): Review this file as the project grows
 *
 * Project: OpenRPG <https://openrpg.io>
 * Definitions by: incomingstick <https://github.com/incomingstick>
 */

export const PACKAGE_VERSION = process.env.npm_package_version;
export const NODE_VERSION = process.versions.node;
export const CHROME_VERSION = process.versions.chrome;
export const ELECTRON_VERSION = process.versions.electron;

export const ORPG_URL = process.env.npm_package_website_url as string;
export const ORPG_BLOG = process.env.npm_package_website_blog as string;
export const ORPG_BUGS = process.env.npm_package_bugs_url as string;
export const ORPG_DOCS = process.env.npm_package_website_docs as string;
export const ORPG_REPO = process.env.npm_package_repository_url?.substring(4) as string;
