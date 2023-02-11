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
exports.FilesLogic = void 0;
const { readdir } = require("node:fs/promises");
const { join } = require("path");
const _ = require("underscore");
class FilesLogic {
    constructor() {
        this.get = (dirPath) => __awaiter(this, void 0, void 0, function* () {
            const allFiles = yield readdir(dirPath, { withFileTypes: true });
            const allFilesPath = yield Promise.all(allFiles.map((dirent) => __awaiter(this, void 0, void 0, function* () {
                const path = join(dirPath, dirent.name);
                return dirent.isDirectory() ? yield this.get(path) : path;
            })));
            return _.flatten(allFilesPath);
        });
    }
}
exports.FilesLogic = FilesLogic;
