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
const dependencies_1 = require("./src/dependencies/dependencies");
const finder_1 = require("./src/finder/finder");
const fs = require("fs");
const YAML = require("yaml");
require("dotenv").config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const finderLogic = new finder_1.FinderLogic();
    const countImportDependencies = yield finderLogic.findDependencies();
    new dependencies_1.DependenciesLogic().analyzeResult(countImportDependencies);
});
main();
