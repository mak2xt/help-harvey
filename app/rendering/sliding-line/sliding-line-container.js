import {SlidingLine} from "./sliding-line";
import {getGapInPixels} from "../lines-gap";
import {mobileAndTabletcheck} from "../../util/util";

export class SlidingLineContainer {
    /**
     *
     * @param {string} containerID
     * @param {GameContainer} gameContainer
     */
    constructor(containerID, gameContainer){
        this.container = document.getElementById(containerID)
        this.gameContainer = gameContainer
        this.lines = []
        this.drawLines()
    }
    drawLines(){
        let containerRect = this.container.getBoundingClientRect()
        let widthOfLine = containerRect.width / 2 - getGapInPixels(this.gameContainer.getDimensions()) / 2
        let heightOfLine = containerRect.height / 2
        let size = {
            width: widthOfLine,
            height: heightOfLine
        }
        this.lines.push(new SlidingLine(this.container, size, 'left'))
        this.lines.push(new SlidingLine(this.container, size, 'right'))
        this.lines.push(new SlidingLine(this.container, size, 'left'))
        this.lines.push(new SlidingLine(this.container, size, 'right'))
    }
    destroyLines(){
        for(let line of this.lines){
            line.destroy();
            line = null;
        }
        this.lines = []
    }
    getLines(){
        return {
            upper: {
                left: this.lines[0],
                right: this.lines[1]
            },
            lower: {
                left: this.lines[2],
                right: this.lines[3]
            }
        }
    }
}