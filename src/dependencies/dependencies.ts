const fs = require("fs");
const YAML = require("yaml");

export class DependenciesLogic {
  getYaml = () => {
    const filePath = process.env.pubspectPath;
    return YAML.parse(fs.readFileSync(filePath, "utf8"));
  };

  get = (): string[] => {
    return Object.keys(this.getYaml().dependencies);
  };

  analyzeResult = (countImportDependencies: any) => {
    const dependenciesUnused: string[] = this.get().filter((dependency) => {
      if (countImportDependencies[dependency] == 0) {
        return true;
      }
    });

    console.log(
      `The project ${this.getYaml().name} have ${
        dependenciesUnused.length
      } unused dependencies, these are:\n\n${dependenciesUnused.join(
        "\n"
      )} \n\nYou can remove all these dependencies executing this command: \n\nflutter pub remove ${dependenciesUnused.join(
        " "
      )}\n\n`
    );
  };
}
