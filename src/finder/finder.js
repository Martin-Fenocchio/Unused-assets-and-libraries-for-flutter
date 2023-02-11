"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinderLogic = void 0;
const assets_1 = require("../assets/assets");
const dependencies_1 = require("../dependencies/dependencies");
const files_1 = require("../files/files");
const fs = require("fs");
class FinderLogic {
    constructor() {
        this.findDependencies = () => __awaiter(this, void 0, void 0, function* () {
            const librariesResult = {};
            const filesLogic = new files_1.FilesLogic();
            const dependenciesLogic = new dependencies_1.DependenciesLogic();
            const filesPath = yield filesLogic.get(process.env.projectRootPath + "/lib");
            yield Promise.all(dependenciesLogic.getDependencies().map((dependency) => __awaiter(this, void 0, void 0, function* () {
                return filesPath.map((filePath) => {
                    const fileContent = fs.readFileSync(filePath);
                    if (fileContent.includes(dependency)) {
                        librariesResult[dependency] =
                            (librariesResult[dependency] || 0) + 1;
                    }
                    else {
                        librariesResult[dependency] = librariesResult[dependency] || 0;
                    }
                });
            })));
            return librariesResult;
        });
        this.findAssets = () => __awaiter(this, void 0, void 0, function* () {
            const assetsLogic = new assets_1.AssetsLogic();
            const filesLogic = new files_1.FilesLogic();
            const assetsList = yield assetsLogic.getAssets();
            const filesPath = yield filesLogic.get(process.env.projectRootPath + "/lib");
            const usedAssetsList = [];
            yield Promise.all(assetsList.map((asset) => __awaiter(this, void 0, void 0, function* () {
                return filesPath.map((filePath) => {
                    const fileContent = fs.readFileSync(filePath);
                    asset = assetsLogic.cutAssetPath(asset);
                    if (fileContent.includes(asset) && !usedAssetsList.includes(asset)) {
                        usedAssetsList.push(asset);
                    }
                });
            })));
            assetsLogic.analizeResult(usedAssetsList);
        });
    }
}
exports.FinderLogic = FinderLogic;
