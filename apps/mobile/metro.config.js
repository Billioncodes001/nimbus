const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");
const catalogRoot = path.resolve(monorepoRoot, "packages/catalog");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [...(config.watchFolders || []), catalogRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules || {}),
  "@nimbus/catalog": catalogRoot,
};

module.exports = config;
