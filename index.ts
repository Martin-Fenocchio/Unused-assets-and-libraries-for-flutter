import { DependenciesLogic } from "./src/dependencies/dependencies";
import { FinderLogic } from "./src/finder/finder";

require("dotenv").config();

const main = async () => {
  const finderLogic = new FinderLogic();

  const countImportDependencies = await finderLogic.findDependencies();

  new DependenciesLogic().analyzeResult(countImportDependencies);
  finderLogic.findAssets();
};

main();
