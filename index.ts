import { DependenciesLogic } from "./src/dependencies/dependencies";
import { FilesLogic } from "./src/files/files";
import { FinderLogic } from "./src/finder/finder";
const fs = require("fs");
const YAML = require("yaml");

require("dotenv").config();

const main = async () => {
  const finderLogic = new FinderLogic();

  const countImportDependencies = await finderLogic.findDependencies();

  new DependenciesLogic().analyzeResult(countImportDependencies);
};

main();
