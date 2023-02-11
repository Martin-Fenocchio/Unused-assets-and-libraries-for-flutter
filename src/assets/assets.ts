import { FilesLogic } from "../files/files";

export class AssetsLogic {
  getAssets = async () => {
    const filesLogic = new FilesLogic();
    const assetsFiles = await filesLogic.get(
      process.env.projectRootPath + "/assets"
    );

    return assetsFiles;
  };

  analizeResult = async (assetsUsed: string[]) => {
    const assetsFiles: string[] = await this.getAssets();

    let unusedAssets = assetsFiles.filter(
      (asset: string) => !assetsUsed.includes(this.cutAssetPath(asset))
    );

    unusedAssets = unusedAssets.map((asset: string) =>
      this.cutAssetPath(asset)
    );

    console.log(
      `also the project have ${
        unusedAssets.length
      } unused assets, these are:\n\n${unusedAssets.join("\n")}`
    );
  };

  cutAssetPath = (asset: string) => {
    return asset.replace(process.env.projectRootPath + "/", "");
  };
}
