const { readdir } = require("node:fs/promises");
const { join } = require("path");
const _ = require("underscore");

export class FilesLogic {
  get = async (dirPath: string) => {
    const allFiles = await readdir(dirPath, { withFileTypes: true });
    const allFilesPath = await Promise.all(
      allFiles.map(async (dirent: any) => {
        const path = join(dirPath, dirent.name);

        return dirent.isDirectory() ? await this.get(path) : path;
      })
    );

    return _.flatten(allFilesPath);
  };
}
