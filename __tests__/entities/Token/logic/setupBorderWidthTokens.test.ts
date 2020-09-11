import { setupBorderWidthTokens } from '../../../../bin/entities/Token/logic/setupBorderWidthTokens';

import { FRAME as Frame } from '../../../../bin/contracts/Figma';

import {
  borderWidthsFrame,
  borderWidthsInvalidMissingName,
  borderWidthsInvalidMissingStrokeWeight
} from '../../../../testdata/frames/borderWidthsFrame';

describe('Failure cases', () => {
  test('It should throw an error if frame is missing "children" array', () => {
    expect(() => {
      // @ts-ignore
      setupBorderWidthTokens();
    }).toThrow();
  });

  test('It should throw an error if no argument is provided', () => {
    expect(() => {
      // @ts-ignore
      setupBorderWidthTokens({});
    }).toThrow();
  });

  test('It should throw an error if missing item name', () => {
    expect(() => setupBorderWidthTokens(borderWidthsInvalidMissingName as Frame)).toThrowError();
  });

  test('It should throw an error if missing item strokeWeight', () => {
    expect(() =>
      setupBorderWidthTokens(borderWidthsInvalidMissingStrokeWeight as Frame)
    ).toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return a complete object when passing in valid input', () => {
    expect(setupBorderWidthTokens(borderWidthsFrame as Frame)).toEqual(
      expect.objectContaining({ chunky: '8px', fat: '4px', hairline: '1px', regular: '2px' })
    );
  });
});
