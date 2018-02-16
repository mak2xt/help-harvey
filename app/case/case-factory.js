import {Case} from "./case";
import {normalizeTime} from "../util/time-normaliztion";

/**
 *
 * @returns {*[]} - tuple [horizontalPosition, verticalPosition]
 */
function getCasePosition(){
    let horizontalPosNum = Math.round(Math.random())
    let verticalPosNum = Math.round(Math.random())
    let verticalPos = (verticalPosNum === 0) ? 'lower' : 'upper';
    let horizontalPos = (horizontalPosNum === 0) ? 'left' : 'right';
    return [horizontalPos, verticalPos]
}

/**
 * @description creates instances of cases depending on parameters
 * @param baseSpeed - the amount of time needed for case to be ready for a catch
 * @param numOfCases
 * @returns {Case[]}
 */
export function CaseFactory(baseSpeed, numOfCases){
    let ret = []
    for(let i = 0; i < numOfCases; i++){
        let casePosition = getCasePosition()
        let normalizedTime = normalizeTime((baseSpeed * 1000), casePosition[1])
        ret.push(new Case(normalizedTime, casePosition))
    }
    return ret
}