import {CaseDrawer} from "../rendering/case/case-drawer"
import {delay, isMobileSafari} from "../util/util";
import {lowerFallTime, upperFallTime} from "../util/time-normaliztion";
import {ScoreBoard} from "../rendering/score-board/score-board";

export class CaseManager {
    /**
     *
     * @param lines
     * @param {{top: number, left: number, right: number}} catchCoordinates
     */
    constructor(lines, catchCoordinates){
        this.lines = lines;
        this.catchCoordinates = catchCoordinates;
        this.cases = []
        this.caseDrawers = []
    }
    /** PRIVATE METHODS */

    /**
     * @param {Case} Case
     */
    getCaseDrawer(Case){
        let casePosition = [Case.getHorizontalPosition(), Case.getVerticalPosition()]
        let lineRect = this.lines[casePosition[1]][casePosition[0]].getLineRect()

        let heightCorrection = 17;
        let rightPositionCorrection = 20;

        let slidingPoints = {
            start: {
                y: (casePosition[0] === 'left') ? lineRect.top - heightCorrection : lineRect.top - heightCorrection,
                x: (casePosition[0] === 'left') ? lineRect.left : lineRect.right - rightPositionCorrection
            },
            end: {
                y: (casePosition[0] === 'left') ? lineRect.bottom - heightCorrection : lineRect.bottom - heightCorrection,
                x: (casePosition[0] === 'left') ? lineRect.right : lineRect.left - rightPositionCorrection
            }
        }
        let catchCoordinates = {
            top: this.catchCoordinates.top,
            left: (casePosition[0] === 'left') ? this.catchCoordinates.left : this.catchCoordinates.right - rightPositionCorrection
        }
        let fallTime = (casePosition[1] === 'upper') ? upperFallTime : lowerFallTime
        let slideTime = Case.getExpirationTime() - fallTime
        let timings = {
            slide: slideTime,
            fall: fallTime
        }
        return new CaseDrawer(slidingPoints, catchCoordinates, timings)
    }
    /** PUBLIC METHODS */
    /**
     * @param {Case} Case
     */
    push(Case){
        this.cases.push(Case)
    }
    /**
     *
     * @returns {PromiseLike<string> | Promise<string>} - returns Promise which resolves to 'left' or 'right'
     */
    pop(){
        let specCase = this.cases.pop()
        if(!specCase){
            throw new Error('There are no cases left')
        }
        let caseDrawer = this.getCaseDrawer(specCase)
        caseDrawer.init()

        this.caseDrawers.push(caseDrawer)

        return delay(50).then(() => {
            caseDrawer.move()
            return delay(specCase.getExpirationTime())
        }).then(() => {
            caseDrawer.destroy()
            return specCase.getHorizontalPosition()
        })
    }
    clear(){
        this.caseDrawers.forEach(el => {
            el.destroy()
            el = null;
        })
    }
}