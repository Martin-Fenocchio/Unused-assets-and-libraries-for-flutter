import { AssetsLogic } from "../assets/assets";
import { DependenciesLogic } from "../dependencies/dependencies";
import { FilesLogic } from "../files/files";
const fs = require("fs");

export class FinderLogic {
  findDependencies = async () => {
    const librariesResult: any = {};
    const filesLogic = new FilesLogic();
    const dependenciesLogic = new DependenciesLogic();

    const filesPath: string[] = await filesLogic.get(
      process.env.projectRootPath + "/lib"
    );

    await Promise.all(
      dependenciesLogic.getDependencies().map(async (dependency: string) =>
        filesPath.map((filePath: string) => {
          const fileContent = fs.readFileSync(filePath);

          if (fileContent.includes(dependency)) {
            librariesResult[dependency] =
              (librariesResult[dependency] || 0) + 1;
          } else {
            librariesResult[dependency] = librariesResult[dependency] || 0;
          }
        })
      )
    );

    return librariesResult;
  };

  findAssets = async () => {
    const assetsLogic = new AssetsLogic();
    const filesLogic = new FilesLogic();
    const assetsList: string[] = await assetsLogic.getAssets();

    const filesPath: string[] = await filesLogic.get(
      process.env.projectRootPath + "/lib"
    );

    const usedAssetsList: string[] = [];

    await Promise.all(
      assetsList.map(async (asset: string) =>
        filesPath.map((filePath: string) => {
          const fileContent = fs.readFileSync(filePath);
          asset = assetsLogic.cutAssetPath(asset);

          if (fileContent.includes(asset) && !usedAssetsList.includes(asset)) {
            usedAssetsList.push(asset);
          }
        })
      )
    );

    assetsLogic.analizeResult(usedAssetsList);
  };
}
