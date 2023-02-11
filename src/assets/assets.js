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
exports.AssetsLogic = void 0;
const files_1 = require("../files/files");
class AssetsLogic {
    constructor() {
        this.getAssets = () => __awaiter(this, void 0, void 0, function* () {
            const filesLogic = new files_1.FilesLogic();
            const assetsFiles = yield filesLogic.get(process.env.projectRootPath + "/assets");
            return assetsFiles;
        });
        this.analizeResult = (assetsUsed) => __awaiter(this, void 0, void 0, function* () {
            const assetsFiles = yield this.getAssets();
            let unusedAssets = assetsFiles.filter((asset) => !assetsUsed.includes(this.cutAssetPath(asset)));
            unusedAssets = unusedAssets.map((asset) => this.cutAssetPath(asset));
            console.log(`also the project have ${unusedAssets.length} unused assets, these are:\n\n${unusedAssets.join("\n")}`);
        });
        this.cutAssetPath = (asset) => {
            return asset.replace(process.env.projectRootPath + "/", "");
        };
    }
}
exports.AssetsLogic = AssetsLogic;
