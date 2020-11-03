import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';

import { createPage } from './interactors/common/createPage';
import { processGraphics } from './interactors/graphics/processGraphics';
import { writeImages } from './interactors/graphics/writeImages';

import { refresh } from '../frameworks/filesystem/refresh';

import { MsgSyncImages } from '../frameworks/messages/messages';
import { ErrorCreateImages } from '../frameworks/errors/errors';

/**
 * @description Use case for syncing (creating) graphics from Figma file
 */
export async function createImages(config: Config, data: FigmaData): Promise<void> {
  try {
    if (!config || !data) throw new Error(ErrorCreateImages);
    console.log(MsgSyncImages);

    await refresh(config.outputFolderImages);

    const graphicsPage = createPage(data.document.children, 'Images');
    const fileList = await processGraphics(graphicsPage, {
      ...config,
      outputFormatGraphics: 'png'
    });

    await writeImages(fileList, config);
  } catch (error) {
    throw new Error(error);
  }
}
