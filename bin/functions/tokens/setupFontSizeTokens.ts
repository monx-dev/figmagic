import { camelize } from '../helpers/camelize';

import {
  errorSetupFontSizeTokensNoFrame,
  errorSetupFontSizeTokensNoChildren,
  errorSetupFontSizeTokensNoSizing,
  errorSetupFontSizeTokensMissingProps,
  errorSetupFontSizeTokensMissingSize
} from '../../meta/errors';

import { Frame } from '../../domain/Frame/Frame';

/**
 * Places all Figma font sizes into a clean object
 *
 * @param fontSizeFrame The font size frame from Figma
 * @param fontUnit The font unit type
 * @param remSize The body rem size
 */
export function setupFontSizeTokens(
  fontSizeFrame: Frame,
  fontUnit: string,
  remSize: number
): FontSizeTokens {
  if (!fontSizeFrame) throw new Error(errorSetupFontSizeTokensNoFrame);
  if (!fontSizeFrame.children) throw new Error(errorSetupFontSizeTokensNoChildren);
  if (!fontUnit || !remSize) throw new Error(errorSetupFontSizeTokensNoSizing);

  let fontSizeObject = {};

  fontSizeFrame.children.forEach((type) => {
    if (!type.name || !type.style) throw new Error(errorSetupFontSizeTokensMissingProps);
    if (!type.style.fontSize) throw new Error(errorSetupFontSizeTokensMissingSize);

    const name = camelize(type.name);
    const FONT_SIZE = ((type.style.fontSize as unknown) as number) / remSize + fontUnit;

    fontSizeObject[name] = FONT_SIZE;
  });

  return fontSizeObject;
}