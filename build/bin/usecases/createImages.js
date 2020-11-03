"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImages = void 0;
const tslib_1 = require("tslib");
const createPage_1 = require("./interactors/common/createPage");
const processGraphics_1 = require("./interactors/graphics/processGraphics");
const writeImages_1 = require("./interactors/graphics/writeImages");
const refresh_1 = require("../frameworks/filesystem/refresh");
const messages_1 = require("../frameworks/messages/messages");
const errors_1 = require("../frameworks/errors/errors");
function createImages(config, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (!config || !data)
                throw new Error(errors_1.ErrorCreateImages);
            console.log(messages_1.MsgSyncImages);
            yield refresh_1.refresh(config.outputFolderImages);
            const graphicsPage = createPage_1.createPage(data.document.children, 'Images');
            const fileList = yield processGraphics_1.processGraphics(graphicsPage, Object.assign(Object.assign({}, config), { outputFormatGraphics: 'png' }));
            yield writeImages_1.writeImages(fileList, config);
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
exports.createImages = createImages;
//# sourceMappingURL=createImages.js.map