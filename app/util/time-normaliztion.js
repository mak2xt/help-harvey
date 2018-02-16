/**
 * @module TimeNormalization
 * Normalizing time differences for 'upper' and 'lower' cases
 */

export const upperFallTime = 500;
export const lowerFallTime = 150;

/**
 *
 * @param {number} time - ms
 * @param {string} pos - 'upper' or 'lower'
 * @returns number
 */
export function normalizeTime(time, pos) {
    switch (pos){
        case 'upper':
            return time + upperFallTime;
        case 'lower':
            return time + lowerFallTime;
        default:
            throw new Error('Inappropriate position')
    }
}