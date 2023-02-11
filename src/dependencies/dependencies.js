"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependenciesLogic = void 0;
const fs = require("fs");
const YAML = require("yaml");
class DependenciesLogic {
    constructor() {
        this.getYaml = () => {
            const filePath = process.env.projectRootPath + "/pubspec.yaml";
            return YAML.parse(fs.readFileSync(filePath, "utf8"));
        };
        this.getDependencies = () => {
            return Object.keys(this.getYaml().dependencies);
        };
        this.analyzeResult = (countImportDependencies) => {
            const dependenciesUnused = this.getDependencies().filter((dependency) => {
                if (countImportDependencies[dependency] == 0) {
                    return true;
                }
            });
            console.log(`The project ${this.getYaml().name} have ${dependenciesUnused.length} unused dependencies, these are:\n\n${dependenciesUnused.join("\n")} \n\nYou can remove all these dependencies executing this command: \n\nflutter pub remove ${dependenciesUnused.join(" ")}\n\n`);
        };
    }
}
exports.DependenciesLogic = DependenciesLogic;
