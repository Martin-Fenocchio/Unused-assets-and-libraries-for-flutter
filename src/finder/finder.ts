import { DependenciesLogic } from "../dependencies/dependencies";
import { FilesLogic } from "../files/files";
const fs = require("fs");
import { readFile } from "node:fs/promises";

export class FinderLogic {
  findDependencies = async () => {
    const librariesResult: any = {};
    const filesLogic = new FilesLogic();
    const dependenciesLogic = new DependenciesLogic();

    const filesPath: string[] = await filesLogic.get(
      process.env.projectRootPath!
    );

    await Promise.all(
      dependenciesLogic.get().map(async (dependency: string) =>
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
}
