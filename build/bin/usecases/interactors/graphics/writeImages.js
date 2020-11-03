"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeImages = void 0;
const tslib_1 = require("tslib");
const createFolder_1 = require("../../../frameworks/filesystem/createFolder");
const downloadFile_1 = require("../../../frameworks/network/downloadFile");
const errors_1 = require("../../../frameworks/errors/errors");
function writeImages(fileList, config) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!fileList || !config)
                throw new Error(errors_1.ErrorWriteGraphics);
            const { outputFolderImages } = config;
            createFolder_1.createFolder(outputFolderImages);
            yield Promise.all(fileList.map((file) => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield downloadFile_1.downloadFile(file.url, `${outputFolderImages}/${file.file}`); })));
        }
        catch (error) {
            throw new Error(errors_1.ErrorWriteGraphics);
        }
    });
}
exports.writeImages = writeImages;
//# sourceMappingURL=writeImages.js.map