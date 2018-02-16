export const percentageGap = 0.3
/**
 *
 * @param {{width: number, height: number}} gameContainerSize
 */
export const getGapInPixels = (gameContainerSize) => {
    return gameContainerSize.width * percentageGap
}